# Project Plan and Task Ledger

**Current phase:** 0 — concept validation and specification.  
**Completion rule:** A document existing does not mean a task is complete; exit criteria must be met.

## Phase 0 — Define the game worth building

### P0-01 — Resolve unit of play
**Status:** The deep Sonnet audit found blocking semantic defects in the earlier model comparison. CONTROL_MODEL.md and its machine fixture have since been revised, and a deterministic enumerator plus unit tests has been executed. No model is selected.
**Canonical design reference:** CONTROL_MODEL.md.  
**Executable test fixture:** scenarios/control_model_test_fixture.json.  
**Enumerator and tests:** tools/control_model_enumerator.py and tests/test_control_model_enumerator.py.  
**Supporting history:** CORE_LOOP_COMPARISON.md, PROTAGONIST_CONTROL.md, PAPER_SIMULATION_01.md, PAPER_SIMULATION_02.md, DIRECT_INTENTION_TRACE.md, MATCHED_MODEL_COMPARISON_01.md, MODEL_COMPARISON_SCORECARD.md, PROTAGONIST_RESPONSE_RULES.md, and PRIORITY_TABLE_REPLAY_01.md. These preserve reasoning, not current authority where assumptions differ from CONTROL_MODEL.md.

**Executed structural results (not win rates):** I: 5 unique nonterminal states, 264 transition evaluations across path prefixes, 204 complete input sequences; terminal outcomes: A-only 42 sequences, B-only 36, both 126. W: 7 unique nonterminal states, 1,257 transition evaluations, 1,146 complete input sequences; terminal outcomes: A-only 642, B-only 9, both 495. These are not probabilities or balance scores because available input sets vary by state. The narrow count of B-only W sequences is a specific objective-feasibility/counterplay signal to investigate, not proof of imbalance.

**Automated checks:** 11 standard-library unit tests pass locally, including explicit A-only/B-only/both routes in both models, conditional input sensitivity, deterministic replay, cancellation, private-window trust behavior, and invalid-input rejection.

**Next:** Have an independent reviewer audit the enumerator implementation and JSON fixture together, then reconstruct selected actions and objective paths from the published test contract. Triage any discrepancy before changing the fixture or policy. No human playtest evidence exists.

**Exit:** Both input models have precise semantics; an independent reviewer reproduces implementation results; all objective routes and sensitivities are understood; input dominance and narrow paths are assessed; only then run counterbalanced human teach-back/play sessions and decide whether to build a local prototype.

### P0-02 — Define protagonist influence
**Status:** The current test selector is deterministic and records rank tuples, but its action tiers and tie-break remain provisional product choices.
**Exit:** The selector never chooses an illegal/uninformed action, applies the same configured policy to both modes, records the decisive rank field, and does not directly optimize either player objective.

### P0-03 — Define objectives and scoring
**Status:** The machine fixture defines test-only predicates for A's honest return/trust and B's evidence-backed accountability. These are not accepted product scoring rules.
**Exit:** Reachability/counterplay are independently reviewed; the project owner approves the eventual meaning of trust, accountability, partial outcomes, and terminal results.

### P0-04 — Define actions and economy
**Status:** The current test uses a finite protagonist action vocabulary and bounded temporary context/privacy influences. Production resources, persistent effects, and a general effect schema are not selected.
**Exit:** Every prototype action/effect has explicit preconditions, state changes, event record, duration/expiry, conflict behavior, and stale-target behavior.

### P0-05 — Define Fate
**Status:** Separate blocker. The control comparison excludes Fate because the public-emergency causal chain is not established.
**Supporting references:** CAUSAL_ROUTE_TRACE_01.md, CAUSAL_ROUTE_WORKSHOP.md, CANDIDATE_CAUSAL_ROUTES.md, and SCENARIO_CAUSALITY_REVIEW.md.
**Exit:** A credible route, bounded Fate interventions, counterplay, and a satisfying non-Fate ending can be simulated without arbitrary events.

### P0-06 — Validate the umbrella scenario
**Status:** scenarios/umbrella.json remains an unresolved story probe. The smaller control-model JSON is a test fixture, not silent canonization of the story.
**Next:** After the control semantics and owner assumptions are reviewed, decide whether to promote compatible fixture elements into the story scenario. Separately decide whether to replace the citywide target with a local public-blame route or replace the premise.
**Exit:** Three strategy profiles yield coherent distinct trajectories with traceable facts, knowledge, deadlines, causal links, and endings.

### P0-07 — Validate information and fairness
**Status:** INFORMATION_MODEL.md remains conceptual. The enumerator documents protagonist knowledge acquisition but does not implement a player-view projection or visibility-leak tests.
**Exit:** Each hidden fact has an owner, discovery path, visibility rule, and evidence/counterplay route; unauthorized views do not receive hidden data.

### P0-08 — Approve contracts and architecture
**Status:** The comparison-harness responsibilities are described in ARCHITECTURE.md and MODULE_CONTRACTS.md; this is not the production engine.
**Exit:** The global resolution and visibility contracts cover Fate, boundary collisions, stale targets, duplicate submissions, terminal conditions, and filtered explanations.

### P0-09 — Prepare first playtest
**Status:** PLAYTEST_PLAN.md is a proposed protocol; no human playtests have been conducted.
**Exit:** The protocol distinguishes confusion, weak mechanics, unfair objectives, and unearned escalation.

## Phase 1 — Deterministic comparison harness (not yet the game)

Validate the JSON fixture; enumerate every valid I/W input pair over reachable states; record rank tuples, state/events, objective results, sensitivity, and reachable paths; run deterministic replay and boundary tests.

**Exit:** Independent reconstruction agrees with the implementation, and no model is structurally null or trivially dominant under the test fixture. This gate does not establish fun or fairness.

## Phase 2 — Minimal local playable prototype

Only after the comparison gate and owner review, implement a local prototype of the chosen model with a small UI, authorized views, action feedback, event history, objective results, and deterministic presentation. If the models remain materially uncertain, prototype both behind the same fixture rather than silently selecting one.

**Exit:** Players understand rules, report meaningful decisions, and can explain outcomes. Otherwise revise before expanding.

## Phase 3 — Product direction

Decide whether online multiplayer is essential; test session length, replay, scenario variation, accessibility, and mobile usability; evaluate optional LLM narration only if justified.

## Phase 4 — Production hardening (if justified)

Add server-authoritative online matches, persistence, reconnect, anti-cheat, privacy, monitoring, deployment, schema migrations, and operational documentation. Test concurrency, duplicates, hidden information, recovery, and deployment.

## Current blockers

- Independent code/fixture audit and reconstruction.
- Owner approval/revision of direct-support semantics, protagonist tie-breaks, seeded evidence wording, and trust response.
- Explanation of why B-only W trajectories are narrow under the current fixture; do not infer probabilities from sequence counts.
- Player-view projection and visibility tests.
- Canonicalizing the umbrella story facts/deadline/objectives separately from the comparison fixture.
- Fate's legal power, visibility, credible causal target, counterplay, and alternate ending.
- Global resolution and visibility contract outside the limited fixture.

## Change discipline

Record accepted design choices in DECISIONS.md. Keep test-fixture assumptions separate from scenario canon. Treat authored reasoning, independent review, automated enumeration, and human playtest results as different evidence classes. Do not add more analysis files unless they provide reproducible evidence.
