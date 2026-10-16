#!/usr/bin/env python3
"""Finite-state enumerator for the provisional FATE/CTRL control-model test."""
from __future__ import annotations
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from itertools import product
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
FIXTURE_PATH = ROOT / "scenarios" / "control_model_test_fixture.json"
FIXTURE = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))
I, W, PASS = "I", "W", "PASS"
INSPECT, PRESENT, RETURN, WAIT = "INSPECT_SHARED_THREAD", "PRESENT_EVIDENCE", "RETURN_HONESTLY", "WAIT"
ACTIONS = tuple(FIXTURE["actions"])
DIRECT = tuple(a for a, d in FIXTURE["actions"].items() if d["directProposalAllowed"])
INFLUENCES = FIXTURE["influences"]
POLICY = FIXTURE["selectionPolicy"]
RANK_ORDER = tuple(POLICY["rankOrder"])
TIE = {a: len(POLICY["tieBreakOrderHighestFirst"]) - i for i, a in enumerate(POLICY["tieBreakOrderHighestFirst"])}


def validate_fixture():
    if FIXTURE["initialState"]["remaining"] != FIXTURE["rounds"]:
        raise ValueError("initial remaining count must equal fixture round count")
    if FIXTURE["initialState"]["trust"] != FIXTURE["relationshipResponse"]["initialTrust"]:
        raise ValueError("initial trust values disagree")
    if len(RANK_ORDER) != 5 or set(RANK_ORDER) != {"contextSignal", "directSupport", "actionTier", "deadlineTier", "tieBreakRank"}:
        raise ValueError("rank order must contain each supported field exactly once")
    if set(POLICY["tieBreakOrderHighestFirst"]) != set(ACTIONS):
        raise ValueError("tie-break order must contain every action exactly once")
    if not {INSPECT, PRESENT, RETURN, WAIT}.issubset(ACTIONS):
        raise ValueError("required action missing from fixture")
    allowed = {"thread_uninspected", "evidence_ready_for_presentation"}
    for name, effect in INFLUENCES.items():
        if effect["targetAction"] not in ACTIONS or not -1 <= effect["signal"] <= 1 or effect["precondition"] not in allowed:
            raise ValueError(f"invalid influence definition: {name}")

validate_fixture()

@dataclass(frozen=True)
class State:
    round_no: int = FIXTURE["initialState"]["round_no"]
    remaining: int = FIXTURE["initialState"]["remaining"]
    returned: bool = FIXTURE["initialState"]["returned"]
    acknowledged_damage: bool = FIXTURE["initialState"]["acknowledged_damage"]
    inspected: bool = FIXTURE["initialState"]["inspected"]
    presented: bool = FIXTURE["initialState"]["presented"]
    prior_knowledge_acknowledged: bool = FIXTURE["initialState"]["prior_knowledge_acknowledged"]
    trust: int = FIXTURE["initialState"]["trust"]

    def key(self):
        return tuple(asdict(self).values())


def legal_actions(s):
    f = FIXTURE["worldFacts"]
    out = [WAIT]
    if f["threadExists"] and f["threadAccessibleFromPhone"] and f["julesKnowsThreadExists"] and not s.inspected:
        out.append(INSPECT)
    if s.inspected and not s.presented and s.remaining > 0 and f["flatmate"]["reachableBeforeAction"]:
        out.append(PRESENT)
    if not s.returned and s.remaining > 0 and f["flatmate"]["reachableBeforeAction"]:
        out.append(RETURN)
    return tuple(out)


def _influence_legal(s, name):
    p = INFLUENCES[name]["precondition"]
    f = FIXTURE["worldFacts"]
    if p == "thread_uninspected":
        return f["threadExists"] and f["threadAccessibleFromPhone"] and f["julesKnowsThreadExists"] and not s.inspected
    if p == "evidence_ready_for_presentation":
        return s.inspected and not s.presented and s.remaining > 0
    raise ValueError(f"unsupported precondition: {p}")


def options(s, model):
    if model == I:
        legal = set(legal_actions(s))
        return (PASS,) + tuple(a for a in DIRECT if a in legal)
    if model == W:
        return (PASS,) + tuple(n for n in INFLUENCES if _influence_legal(s, n))
    raise ValueError(f"unknown model {model}")


def resolve_influences(s, inputs):
    allowed = set(options(s, W))
    if any(x not in allowed for x in inputs):
        raise ValueError(f"invalid W input: {inputs}; legal={sorted(allowed)}")
    grouped = defaultdict(list)
    private = False
    for name in inputs:
        if name == PASS:
            continue
        d = INFLUENCES[name]
        grouped[d["targetAction"]].append((name, int(d["signal"])))
        private = private or d.get("privateWindow", False)
    comp = FIXTURE["composition"]
    signals = {a: 0 for a in ACTIONS}
    events = []
    for target, entries in grouped.items():
        vals = [v for n, v in entries if not INFLUENCES[n].get("privateWindow", False) and v != 0]
        up, down = any(v > 0 for v in vals), any(v < 0 for v in vals)
        if up and down and comp["oppositeSignals"] == "cancel_to_zero":
            signal = 0
        elif up:
            signal = min(comp["sameDirectionCap"], max(vals))
        elif down:
            signal = max(-comp["sameDirectionCap"], min(vals))
        else:
            signal = 0
        bonus = sum(v for n, v in entries if INFLUENCES[n].get("privateWindow", False))
        signal = max(comp["selectorSignalMin"], min(comp["selectorSignalMax"], signal + bonus))
        signals[target] = signal
        events.append({"targetAction": target, "inputs": [n for n, _ in entries], "signal": signal})
    if private:
        events.append({"privateWindowOpened": True})
    return signals, private, events


def select(s, model, inputs):
    legal = legal_actions(s)
    support = {a: 0 for a in ACTIONS}
    context = {a: 0 for a in ACTIONS}
    private, effects = False, []
    if model == I:
        allowed = set(options(s, I))
        if any(x not in allowed for x in inputs):
            raise ValueError(f"invalid I input: {inputs}; legal={sorted(allowed)}")
        for x in inputs:
            if x != PASS:
                support[x] += 1
    elif model == W:
        context, private, effects = resolve_influences(s, inputs)
    else:
        raise ValueError(f"unknown model {model}")
    deadline_rule = POLICY["deadlineRule"]
    ranks, fields = {}, {}
    for a in legal:
        values = {
            "contextSignal": context[a] if model == W else 0,
            "directSupport": support[a] if model == I else 0,
            "actionTier": int(FIXTURE["actions"][a]["actionTier"]),
            "deadlineTier": int(deadline_rule["tier"]) if a == deadline_rule["action"] and s.remaining == int(deadline_rule["remainingBoundaries"]) else 0,
            "tieBreakRank": TIE[a],
        }
        ranks[a] = tuple(values[x] for x in RANK_ORDER)
        fields[a] = {**values, "tuple": list(ranks[a])}
    ordered = sorted(legal, key=lambda a: ranks[a], reverse=True)
    winner, runner = ordered[0], ordered[1] if len(ordered) > 1 else None
    decisive = None
    for i, field in enumerate(RANK_ORDER):
        if runner is not None and ranks[winner][i] != ranks[runner][i]:
            decisive = field
            break
    return winner, {
        "ranked": ordered, "rankFields": fields, "winnerTuple": fields[winner]["tuple"],
        "runnerUp": runner, "decisiveField": decisive, "support": support,
        "context": context, "private": private, "effects": effects,
    }


def complete(state, obj, departed):
    if not departed:
        return False
    values = asdict(state)
    definition = FIXTURE["objectives"][obj]
    return (all(bool(values[f]) for f in definition["requiredTrueFields"]) and
            all(values[f] >= n for f, n in definition.get("minimumValues", {}).items()))


def transition(s, model, inputs):
    if s.remaining <= 0:
        raise ValueError("cannot resolve a submission after departure")
    before = s
    legal = legal_actions(s)
    action, diag = select(s, model, inputs)
    returned, ack, inspected, presented = s.returned, s.acknowledged_damage, s.inspected, s.presented
    prior_ack, trust = s.prior_knowledge_acknowledged, s.trust
    events = []
    if action == INSPECT:
        inspected = True
        events += ["EvidenceInspected", "JulesLearnedPhotoAndSeededMessage"]
    elif action == PRESENT:
        presented, prior_ack = True, True
        events += ["EvidencePresented", "PriorKnowledgeAcknowledged"]
        response = FIXTURE["relationshipResponse"]
        if not ack and not diag["private"]:
            trust = response["trustWhenEvidencePresentedBeforeAcknowledgementWithoutPrivateWindow"]
        elif diag["private"]:
            trust = response["trustWhenEvidencePresentedBeforeAcknowledgementWithPrivateWindow"]
        else:
            trust = response["trustWhenEvidencePresentedAfterAcknowledgement"]
        events.append(f"TrustSetTo{trust}")
    elif action == RETURN:
        returned, ack = True, True
        events += ["HonestReturn", "OwnDamageAcknowledged"]
    else:
        events.append("Waited")
    remaining = s.remaining - 1
    departed = remaining == 0
    nxt = State(s.round_no + 1, remaining, returned, ack, inspected, presented, prior_ack, trust)
    a_done, b_done = complete(nxt, "A", departed), complete(nxt, "B", departed)
    if departed:
        events += ["FlatmateDeparted", f"ObjectiveA:{'complete' if a_done else 'incomplete'}", f"ObjectiveB:{'complete' if b_done else 'incomplete'}"]
    record = {
        "model": model, "round": s.round_no, "inputs": list(inputs), "legalActions": list(legal),
        "selected": action, "rankedActions": diag["ranked"], "rankFields": diag["rankFields"],
        "winnerTuple": diag["winnerTuple"], "runnerUp": diag["runnerUp"], "decisiveField": diag["decisiveField"],
        "support": diag["support"], "context": diag["context"], "effects": diag["effects"],
        "privateWindow": diag["private"], "events": events, "before": asdict(before), "after": asdict(nxt),
        "AComplete": a_done, "BComplete": b_done,
    }
    return nxt, record


def _all_paths(model):
    paths, states = [], {}
    actions, outcomes = Counter(), Counter()
    edge_count = 0
    def visit(s, path):
        nonlocal edge_count
        if s.remaining == 0:
            paths.append(path)
            r = path[-1]
            outcomes[(r["AComplete"], r["BComplete"])] += 1
            return
        states[s.key()] = s
        opts = options(s, model)
        for a, b in product(opts, repeat=2):
            nxt, rec = transition(s, model, (a, b))
            edge_count += 1
            actions[rec["selected"]] += 1
            visit(nxt, path + [rec])
    visit(State(), [])
    return paths, states, actions, outcomes, edge_count


def sensitivity(model, states):
    result = {"uniqueNonterminalStates": len(states), "p1ChangedAction": 0, "p2ChangedAction": 0,
              "perSubmission": defaultdict(lambda: {"conditionalTests": 0, "changedAction": 0, "changedPersistentState": 0, "changedSelectorContribution": 0, "changedObjectiveResult": 0})}
    for s in states.values():
        opts = options(s, model)
        for player in (0, 1):
            for other in opts:
                baseline = (PASS, other) if player == 0 else (other, PASS)
                _, base = transition(s, model, baseline)
                for choice in opts:
                    pair = (choice, other) if player == 0 else (other, choice)
                    _, rec = transition(s, model, pair)
                    m = result["perSubmission"][choice]
                    m["conditionalTests"] += 1
                    action_changed = rec["selected"] != base["selected"]
                    state_changed = rec["after"] != base["after"]
                    contribution_changed = (rec["context"] != base["context"] or rec["support"] != base["support"] or rec["privateWindow"] != base["privateWindow"])
                    objective_changed = (rec["AComplete"] != base["AComplete"] or rec["BComplete"] != base["BComplete"])
                    if action_changed:
                        m["changedAction"] += 1
                        result[f"p{player+1}ChangedAction"] += 1
                    if state_changed: m["changedPersistentState"] += 1
                    if contribution_changed: m["changedSelectorContribution"] += 1
                    if objective_changed: m["changedObjectiveResult"] += 1
    result["perSubmission"] = dict(result["perSubmission"])
    return result


def example_paths(paths):
    targets = {"AOnly": (True, False), "BOnly": (False, True), "Both": (True, True)}
    found = {k: None for k in targets}
    for path in paths:
        last = path[-1]
        key = (last["AComplete"], last["BComplete"])
        for name, target in targets.items():
            if found[name] is None and key == target:
                found[name] = [{"round": r["round"], "inputs": r["inputs"], "selected": r["selected"], "trust": r["after"]["trust"]} for r in path]
    return found


def explicit_route(model, pairs):
    s, out = State(), []
    for pair in pairs:
        s, rec = transition(s, model, pair)
        out.append(rec)
    return out


def run_assertions():
    routes = {
        I: {
            "AOnly": [(RETURN, PASS), (PASS, PASS), (PASS, PASS)],
            "BOnly": [(INSPECT, INSPECT), (PRESENT, PRESENT), (RETURN, PASS)],
            "Both": [(INSPECT, INSPECT), (RETURN, RETURN), (PRESENT, PRESENT)],
        },
        W: {
            "AOnly": [(PASS, PASS), (PASS, PASS), (PASS, PASS)],
            "BOnly": [("THREAD_UP", "THREAD_UP"), ("EVIDENCE_UP", "EVIDENCE_UP"), (PASS, PASS)],
            "Both": [("THREAD_UP", PASS), ("OPEN_PRIVATE_WINDOW", PASS), (PASS, PASS)],
        },
    }
    route_results = {}
    for model, by_goal in routes.items():
        route_results[model] = {}
        for goal, pairs in by_goal.items():
            path = explicit_route(model, pairs)
            final = path[-1]
            got = (final["AComplete"], final["BComplete"])
            expected = {"AOnly": (True, False), "BOnly": (False, True), "Both": (True, True)}[goal]
            assert got == expected, f"{model}/{goal}: expected {expected}, got {got}"
            route_results[model][goal] = [{"round": r["round"], "inputs": r["inputs"], "selected": r["selected"], "trust": r["after"]["trust"]} for r in path]
        assert json.dumps(transition(State(), model, (PASS, PASS))[1], sort_keys=True) == json.dumps(transition(State(), model, (PASS, PASS))[1], sort_keys=True)
    s = State(round_no=2, remaining=2, inspected=True)
    sig, private, _ = resolve_influences(s, ("EVIDENCE_UP", "EVIDENCE_DOWN"))
    assert sig[PRESENT] == 0 and not private
    sig, private, _ = resolve_influences(s, ("EVIDENCE_DOWN", "OPEN_PRIVATE_WINDOW"))
    assert sig[PRESENT] == 0 and private
    return {"objectiveRoutesPassed": True, "deterministicReplayPassed": True, "influenceCancellationPassed": True, "routes": route_results}


def enumerate_model(model):
    paths, states, action_counts, outcomes, edges = _all_paths(model)
    sens = sensitivity(model, states)
    return {
        "model": model, "uniqueReachableNonterminalStates": len(states), "transitionEvaluationsAcrossPrefixes": edges,
        "completeInputSequences": len(paths), "selectedActionsAcrossTransitionEvaluations": dict(action_counts),
        "terminalOutcomeSequenceCounts": {f"A={a},B={b}": n for (a, b), n in sorted(outcomes.items())},
        "objectiveAReachable": any(p[-1]["AComplete"] for p in paths),
        "objectiveBReachable": any(p[-1]["BComplete"] for p in paths),
        "bothObjectivesReachable": any(p[-1]["AComplete"] and p[-1]["BComplete"] for p in paths),
        "conditionalInputSensitivity": sens, "sampleSuccessPaths": example_paths(paths),
    }


def main():
    report = {
        "schemaVersion": "fate-ctrl-enumerator-report-v1", "fixtureId": FIXTURE["fixtureId"],
        "fixturePath": str(FIXTURE_PATH.relative_to(ROOT)),
        "evidenceClass": "Executed deterministic enumeration of provisional authored rules; not human playtest, win rate, or balance score.",
        "assertions": run_assertions(), "models": {m: enumerate_model(m) for m in (I, W)},
    }
    print(json.dumps(report, indent=2, sort_keys=True))

if __name__ == "__main__":
    main()
