# FATE/CTRL

FATE/CTRL is a proposed two-player narrative strategy game about competing intentions, shared influence over one protagonist, and a Fate system pursuing a dramatic outcome.

**Phase:** story-first design validation; direct-action mode is selected. **Production gameplay:** not started; the contested-action resolver and story canon remain unapproved.

## Current sources of truth

- SPEC.md — product thesis, scope, candidate rules, and design gates.
- CONTROL_MODEL.md — historical control-model comparison fixture and audit reference; not the production resolver.
- scenarios/control_model_test_fixture.json — machine-readable fixture for the current experiment; not story canon.
- tools/control_model_enumerator.py and tests/test_control_model_enumerator.py — deterministic comparison harness and tests.
- prototype/ — local browser comparison experiment. Direct intention is the default path in that experiment; new game design proceeds with direct-action mode, while raw submissions remain hidden from the normal UI.
- prototype/rules.mjs — fixture-driven browser resolution rules.
- prototype/story.mjs — deterministic narrative presentation and meter calculations; it does not select outcomes.
- reports/control_model_enumerator_summary.json — aggregate output and interpretation limits; path counts are not probabilities.
- scenarios/umbrella.json — unresolved scenario probe, not executable story truth.
- CAUSAL_ROUTE_TRACE_01.md — concrete causal-route test that does not establish a credible route to the literal citywide-emergency ending.
- CANDIDATE_CAUSAL_ROUTES.md and SCENARIO_CAUSALITY_REVIEW.md — provisional local-blame hypotheses, O1/O2 objective comparison, the failed/partial umbrella probe, and the P2 borrowed-radio paper alternative with a direct-action matrix. None is accepted story canon or production rules; the three-route gate remains open.
- INFORMATION_MODEL.md — vocabulary for facts, evidence, access, knowledge, belief, disclosure, and visibility.
- MODULE_CONTRACTS.md and ARCHITECTURE.md — logical ownership boundaries and comparison-harness architecture, not a production-stack commitment.
- DECISIONS.md — decision status and rationale.
- TASKS.md — current gates, blockers and exit criteria.
- PLAYTEST_PLAN.md — proposed playtest protocol; broader comparative human playtesting remains outstanding.
- P2_RECONSTRUCTION_PACKET.md — standalone first-pass paper-test cases for the borrowed-radio candidate; not scenario canon.
- P2_RECONSTRUCTION_REVIEW_01.md — AI first-pass finding register (FAIL / PARTIAL); records unresolved target, objective, resolver, visibility and terminal-rule blockers.
- AGENTS.md — instructions for AI coding agents.
- PROJECT_HANDOFF.md — current repository state and next action.

## Supporting analyses and history

Historical traces preserve the reasoning behind current questions. They are supporting evidence, not independent authorities where assumptions conflict with CONTROL_MODEL.md, the executable fixture, or explicit decision status. This includes CORE_LOOP_COMPARISON.md, PROTAGONIST_CONTROL.md, PAPER_SIMULATION_01.md, PAPER_SIMULATION_02.md, DIRECT_INTENTION_TRACE.md, MATCHED_MODEL_COMPARISON_01.md, PRIORITY_TABLE_REPLAY_01.md, PROTAGONIST_RESPONSE_RULES.md, MODEL_COMPARISON_SCORECARD.md, OBJECTIVE_AND_FAIRNESS_WORKSHEET.md, and the causal-route workshop/candidate/review documents.

## Working principles

- Rules determine authoritative outcomes; narration communicates them.
- Core play must not require a paid LLM API.
- Escalation must grow from established causes and remain counterable.
- Private submissions and public consequences are different information: show what happened, not the opponent's raw intent.
- State bars describe explicit tracked conditions, not invented probabilities.
- A complete document, passing code test or single owner session is not proof of fun, fairness, or usability.
- Make incremental, reviewable changes; do not silently turn test assumptions into story canon.

## Current milestone

The first experimental control-model comparison prototype has merged. The owner's feedback was that choices were hard to understand, the UI was too mechanical, resolution lacked an unfolding story, and raw inputs were exposed after resolution. The owner has now selected direct-action mode for the game's direction because it makes players predict consequences of concrete actions. The existing comparison prototype remains a historical experiment—not the production game—and its support-count resolver is not automatically accepted for the next iteration. See DECISIONS.md and PROJECT_HANDOFF.md for the active decision and next gate.
