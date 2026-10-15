# Project Plan and Task Ledger

**Current phase:** 0 — concept validation and specification.  
**Completion rule:** A document existing does not mean a task is complete; exit criteria must be met.

## Phase 0 — Define the game worth building

### P0-01 — Resolve unit of play
**Status:** In progress; no control model selected. Three-round desk traces exist, but they do not yet prove that the two candidates have operationally distinct and fairly compared effects.  
**Canonical working reference:** CONTROL_MODEL.md.  
**Supporting evidence:** CORE_LOOP_COMPARISON.md, PROTAGONIST_CONTROL.md, PAPER_SIMULATION_01.md, PAPER_SIMULATION_02.md, DIRECT_INTENTION_TRACE.md, MATCHED_MODEL_COMPARISON_01.md, MODEL_COMPARISON_SCORECARD.md, PROTAGONIST_RESPONSE_RULES.md, and PRIORITY_TABLE_REPLAY_01.md. These are historical analyses when assumptions conflict with CONTROL_MODEL.md; they are not playtest evidence.

**Next:** Request a deep independent audit of CONTROL_MODEL.md. The audit must prioritize the semantics of direct-intention proposals, operational meaning of environmental influences, shared protagonist policy, objective feasibility, fixture consistency, and whether the proposed trace can actually distinguish the candidates. Triage the report, correct critical issues, and only then design a small comparative local prototype. Do not select a model based on author-generated traces alone.

**Exit:** The candidates have precise submission contracts; matched fixtures share facts, knowledge, timing, action budget, and objectives; representative conflicts have deterministic outcomes; an independent reviewer can reconstruct each trace; the decision is supported by explicit criteria and later player evidence.

### P0-02 — Define protagonist influence
**Status:** Coupled to P0-01; no model accepted. Define what submitted intentions/influences can change, how Jules selects an action, and why an attempt succeeds, fails, or remains unused.
**Canonical working reference:** CONTROL_MODEL.md.  
**Exit:** Each candidate has bounded, legible semantics and meaningful costs; player-only knowledge cannot bypass character knowledge.

### P0-03 — Define objectives and scoring
**Status:** Worksheet drafted in OBJECTIVE_AND_FAIRNESS_WORKSHEET.md; no scoring model or terminal predicates accepted. Define primary/secondary success, overlapping goals, partial outcomes, and termination.
**Exit:** Both players have measurable goals and multiple viable strategies.

### P0-04 — Define actions and economy
**Status:** Not started. Compare the minimum action set and resource model; specify targets, costs, duration, counterplay, expiry, and failure.
**Exit:** Every prototype action is fully specified and common exploits are addressed.

### P0-05 — Define Fate
**Status:** Causal-route work in progress; no route or intervention model accepted. The literal citywide-emergency target remains unsupported by the umbrella premise.
**Supporting references:** CAUSAL_ROUTE_TRACE_01.md, CAUSAL_ROUTE_WORKSHOP.md, CANDIDATE_CAUSAL_ROUTES.md, and SCENARIO_CAUSALITY_REVIEW.md.
**Exit:** A credible route, bounded Fate interventions, counterplay, and a satisfying non-Fate ending can be simulated without arbitrary events.

### P0-06 — Validate the umbrella scenario
**Status:** Design probe only. Damage history, deadline, knowledge sources, objectives, and Fate's causal target remain incomplete or inconsistent across documents.
**Next:** After control-model semantics are audited, canonicalize the fixture. Then either demonstrate a causal route to a revised local public-blame target or replace the premise; do not force the citywide ending.
**Exit:** Three strategy profiles yield coherent distinct trajectories with traceable facts, knowledge, deadlines, causal links, and endings.

### P0-07 — Validate information and fairness
**Status:** Conceptual information model in INFORMATION_MODEL.md; no runtime schema accepted.
**Exit:** Each hidden fact has an owner, discovery path, visibility rule, and evidence/counterplay route.

### P0-08 — Approve contracts and architecture
**Status:** Not started. Confirm source of truth, resolution boundary, visibility filtering, and deterministic tests.
**Exit:** No duplicated authority; action/event contracts are testable.

### P0-09 — Prepare first playtest
**Status:** Protocol drafted in PLAYTEST_PLAN.md; no human playtests conducted.
**Exit:** The protocol distinguishes confusion, weak mechanics, unfair objectives, and unearned escalation.

## Phase 1 — Minimal deterministic engine (only after Phase 0 approval)

Validate the scenario representation; model canonical state and typed commands; implement legality and deterministic resolution; implement objectives and Fate as legal rules; add replay fixtures and automated tests; build a minimal local simulation interface.

**Exit:** Tests pass, identical inputs replay identically, invalid actions cannot mutate state, and both candidate models can be compared without production infrastructure.

## Phase 2 — Playable prototype

Implement only the selected interaction model after comparative testing; provide player-specific views, action feedback, event history, endings, and deterministic narration; conduct structured playtests.

**Exit:** Players understand rules, report meaningful decisions, and can explain outcomes. Otherwise revise before expanding.

## Phase 3 — Product direction

Decide whether online multiplayer is essential; test session length, replay, scenario variation, accessibility, and mobile usability; evaluate optional LLM narration only if justified.

## Phase 4 — Production hardening (if justified)

Add server-authoritative online matches, persistence, reconnect, anti-cheat, privacy, monitoring, deployment, schema migrations, and operational documentation. Test concurrency, duplicates, hidden information, recovery, and deployment.

## Current blockers

- Direct-intention submission semantics and environmental-effect semantics.
- A protagonist policy that is deterministic but not secretly biased or overly scripted.
- Consistent canonical facts, knowledge, deadline, and action budget.
- Feasible and measurable objectives for both players.
- Fate's legal power, visibility, causal target, counterplay, and alternate ending.
- One accepted resolution and information-update contract.
- First-playtest mode and scenario representation.

## Change discipline

Every task needs a narrow objective, explicit inputs/outputs, dependencies, acceptance criteria, test/review method, out-of-scope list, and rollback path. Record accepted design changes in DECISIONS.md and update affected contracts. Keep authored analysis, independent review, automated tests, and human playtest results distinct.
