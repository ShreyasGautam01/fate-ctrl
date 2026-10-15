# Project Plan and Task Ledger

**Current phase:** 0 — concept validation and specification.  
**Completion rule:** A document existing does not mean a task is complete; exit criteria must be met.

## Phase 0 — Define the game worth building

### P0-01 — Resolve unit of play
**Status:** In progress; the deep Sonnet audit found blocking semantic defects in the earlier model comparison. The specification has been revised, but the new trace has not yet been run by an enumerator or independently reconstructed.  
**Canonical working reference:** CONTROL_MODEL.md.  
**Current architecture reference:** ARCHITECTURE.md and MODULE_CONTRACTS.md.  
**Historical support:** CORE_LOOP_COMPARISON.md, PROTAGONIST_CONTROL.md, PAPER_SIMULATION_01.md, PAPER_SIMULATION_02.md, DIRECT_INTENTION_TRACE.md, MATCHED_MODEL_COMPARISON_01.md, MODEL_COMPARISON_SCORECARD.md, PROTAGONIST_RESPONSE_RULES.md, and PRIORITY_TABLE_REPLAY_01.md. These preserve reasoning, not current authority where assumptions differ from CONTROL_MODEL.md.

**Audit findings addressed in the current draft:** direct-intention candidate-set ambiguity; non-operational environmental effects; incomplete protagonist ranking; absent seed evidence for B's objective; missing trust predicate/response; unclear knowledge access; unowned protagonist-selection responsibility; effect-composition ordering; boundary/evaluation order; and explanation visibility.

**Next:** Review this revised contract for product-owner assumptions. Then implement a small offline deterministic enumerator, not a playable game, that exhaustively tests both models against the fixture, prints full rank tuples and state/event/objective diffs, and runs sensitivity/dominance/reachability checks. Have an independent reviewer reconstruct its results before choosing a model.

**Exit:** Both candidate submissions have precise contracts; the fixture and objectives are self-contained; representative conflict and deadline cases are deterministic; all valid input pairs can be enumerated; each model has meaningful input sensitivity and reachable objective outcomes; an independent reviewer can reproduce results; later human testing evaluates agency and fairness.

### P0-02 — Define protagonist influence
**Status:** The first operational test policy is now explicit in CONTROL_MODEL.md, but it is deliberately provisional.  
**Exit:** The selector never chooses an illegal/uninformed action, applies the same policy version to both candidates, records every candidate rank and decisive field, and does not optimize either player objective directly.

### P0-03 — Define objectives and scoring
**Status:** CONTROL_MODEL.md now supplies test-only predicates for honest return/trust preservation and evidence-backed disclosure. These are not accepted product scoring rules. OBJECTIVE_AND_FAIRNESS_WORKSHEET.md remains historical supporting analysis.
**Exit:** The enumerator establishes objective reachability, distinct progress/completion, and meaningful counterplay; the project owner approves the eventual narrative meanings of trust and accountability.

### P0-04 — Define actions and economy
**Status:** A finite test vocabulary and a three-effect influence set are documented in CONTROL_MODEL.md. Production action costs, persistent resources, and a general action schema are not selected.
**Exit:** Every prototype action/effect has preconditions, state changes, event record, duration/expiry, conflict behavior, and stale-target behavior.

### P0-05 — Define Fate
**Status:** Separate blocker. The control comparison excludes Fate because the public-emergency causal chain is not established.
**Supporting references:** CAUSAL_ROUTE_TRACE_01.md, CAUSAL_ROUTE_WORKSHOP.md, CANDIDATE_CAUSAL_ROUTES.md, and SCENARIO_CAUSALITY_REVIEW.md.
**Exit:** A credible route, bounded Fate interventions, counterplay, and a satisfying non-Fate ending can be simulated without arbitrary events.

### P0-06 — Validate the umbrella scenario
**Status:** CONTROL_MODEL.md now uses a self-contained three-round test fixture; scenarios/umbrella.json remains an unresolved draft and has not been silently changed to match it.
**Next:** After reviewing the model contract and enumerator results, either promote a cleaned fixture into the scenario JSON or revise the test assumptions. Separately decide whether to replace the citywide target with a local public-blame route or replace the premise.
**Exit:** Three strategy profiles yield coherent distinct trajectories with traceable facts, knowledge, deadlines, causal links, and endings.

### P0-07 — Validate information and fairness
**Status:** INFORMATION_MODEL.md remains conceptual; MODULE_CONTRACTS.md now names the required ownership boundary for protagonist selection and model-specific submissions.
**Exit:** Each hidden fact has an owner, discovery path, visibility rule, and evidence/counterplay route.

### P0-08 — Approve contracts and architecture
**Status:** The comparison-harness architecture is specified in ARCHITECTURE.md and MODULE_CONTRACTS.md; no code has been implemented.
**Exit:** Harness output is deterministic/replayable, module ownership is explicit, and tests cover legality, hidden information, effect conflicts, deadlines, and objective predicates.

### P0-09 — Prepare first playtest
**Status:** Protocol drafted in PLAYTEST_PLAN.md; no human playtests have been conducted.
**Exit:** The protocol distinguishes confusion, weak mechanics, unfair objectives, and unearned escalation.

## Phase 1 — Deterministic comparison harness (not yet the game)

Validate the test fixture; enumerate all valid direct-intention and environmental-influence submissions over reachable states; log full selection ranks, events, objective results, and input sensitivity; test deterministic replay.

**Exit:** Independent reconstruction agrees with the enumerator and neither model is structurally null or trivially dominant under the chosen test fixture.

## Phase 2 — Minimal local playable prototype

Only after the comparison gate, implement the selected model with a small local UI, filtered views, action feedback, event history, objective result, and deterministic presentation.

**Exit:** Players understand rules, report meaningful decisions, and can explain outcomes. Otherwise revise before expanding.

## Phase 3 — Product direction

Decide whether online multiplayer is essential; test session length, replay, scenario variation, accessibility, and mobile usability; evaluate optional LLM narration only if justified.

## Phase 4 — Production hardening (if justified)

Add server-authoritative online matches, persistence, reconnect, anti-cheat, privacy, monitoring, deployment, schema migrations, and operational documentation. Test concurrency, duplicates, hidden information, recovery, and deployment.

## Current blockers

- Project-owner acceptance/revision of the test-only intention semantics and seeded evidence fixture.
- Whether the protagonist's tie-break order and trust response are acceptable.
- Enumerator verification of sensitivity, objective reachability, input dominance, and replay.
- Canonicalizing the umbrella scenario facts/deadline/objectives.
- Fate's legal power, visibility, credible causal target, counterplay, and alternate ending.
- Global resolution and visibility contract outside the limited comparison fixture.

## Change discipline

Record accepted design choices in DECISIONS.md. Keep test-fixture assumptions separate from scenario canon. Treat authored reasoning, independent review, automated enumeration, and human playtest results as different evidence classes. Do not add more analysis files unless they provide reproducible evidence.
