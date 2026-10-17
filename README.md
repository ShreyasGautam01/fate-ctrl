# FATE/CTRL

FATE/CTRL is a proposed two-player narrative strategy game about competing intentions, shared influence over one protagonist, and a Fate system pursuing a dramatic outcome.

**Phase:** concept validation and specification. **Gameplay implementation:** not started.

## Authority map

These are the intended working sources of truth. Their proposals remain drafts until explicitly accepted.

- [SPEC.md](SPEC.md) — product thesis, scope, candidate rules, and design gates.
- [CONTROL_MODEL.md](CONTROL_MODEL.md) — active control-model comparison contract and validation gates.
- [scenarios/control_model_test_fixture.json](scenarios/control_model_test_fixture.json) — machine-readable test fixture used by the enumerator; test-only, not story canon.
- [tools/control_model_enumerator.py](tools/control_model_enumerator.py) and [tests/test_control_model_enumerator.py](tests/test_control_model_enumerator.py) — deterministic comparison harness and its unit tests.
- [reports/control_model_enumerator_summary.json](reports/control_model_enumerator_summary.json) — reproducible aggregate output, sensitivity checks, terminal-route counts, and interpretation limits.
- [scenarios/umbrella.json](scenarios/umbrella.json) — scenario design probe, not executable scenario truth; deadline, objectives, evidence history, and Fate rules remain incomplete.
- [CAUSAL_ROUTE_TRACE_01.md](CAUSAL_ROUTE_TRACE_01.md) — most concrete causal-route test; does not establish a credible route to the literal citywide-emergency ending.
- [INFORMATION_MODEL.md](INFORMATION_MODEL.md) — the canonical vocabulary for facts, evidence, access, knowledge, belief, disclosure, and visibility.
- [MODULE_CONTRACTS.md](MODULE_CONTRACTS.md) — logical ownership boundaries, including model-specific submission adapters and protagonist selection.
- [ARCHITECTURE.md](ARCHITECTURE.md) — comparison-harness boundaries, current test results, and later implementation gates; not a production-stack commitment.
- [DECISIONS.md](DECISIONS.md) — canonical decision log. Proposed decisions are not binding.
- [TASKS.md](TASKS.md) — staged tasks, current blockers, and exit criteria.
- [PLAYTEST_PLAN.md](PLAYTEST_PLAN.md) — proposed test protocol; no human playtests have been conducted.
- [AGENTS.md](AGENTS.md) — instructions for AI coding agents.
- [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md) — current working state and next action.

## Supporting analyses and history

These files preserve the reasoning behind current questions. They are supporting evidence, not independent authorities when their assumptions conflict with CONTROL_MODEL.md or the accepted decision log.

- [DESIGN_REVIEW.md](DESIGN_REVIEW.md) — unresolved design risks.
- [CORE_LOOP_COMPARISON.md](CORE_LOOP_COMPARISON.md) — early comparison of timing and interaction candidates.
- [PROTAGONIST_CONTROL.md](PROTAGONIST_CONTROL.md) — earlier control-model exploration.
- [PAPER_SIMULATION_01.md](PAPER_SIMULATION_01.md) and [PAPER_SIMULATION_02.md](PAPER_SIMULATION_02.md) — exploratory round trace and influence-model stress test.
- [DIRECT_INTENTION_TRACE.md](DIRECT_INTENTION_TRACE.md), [MATCHED_MODEL_COMPARISON_01.md](MATCHED_MODEL_COMPARISON_01.md), and [PRIORITY_TABLE_REPLAY_01.md](PRIORITY_TABLE_REPLAY_01.md) — authored model traces; no independent reviewer or human evidence yet.
- [PROTAGONIST_RESPONSE_RULES.md](PROTAGONIST_RESPONSE_RULES.md) — alternative protagonist-selection policies.
- [MODEL_COMPARISON_SCORECARD.md](MODEL_COMPARISON_SCORECARD.md) — unweighted comparison criteria.
- [OBJECTIVE_AND_FAIRNESS_WORKSHEET.md](OBJECTIVE_AND_FAIRNESS_WORKSHEET.md) — objective semantics and fairness checks.
- [CAUSAL_ROUTE_WORKSHOP.md](CAUSAL_ROUTE_WORKSHOP.md), [CANDIDATE_CAUSAL_ROUTES.md](CANDIDATE_CAUSAL_ROUTES.md), and [SCENARIO_CAUSALITY_REVIEW.md](SCENARIO_CAUSALITY_REVIEW.md) — overlapping historical explorations of possible escalation routes.
- [DESIGN_DECISION_RECORD.md](DESIGN_DECISION_RECORD.md) and [DECISION_TEMPLATE.md](DECISION_TEMPLATE.md) — older decision-gate index and template; consolidation is pending.

## Working principles

- Rules determine authoritative outcomes; narration communicates them.
- Core play must not depend on a paid LLM API.
- Escalation must grow from established causes and remain counterable.
- A complete document is not evidence of fun, balance, or usability.
- Make incremental, reviewable changes; preserve rejected hypotheses as history instead of maintaining them as competing rules.

## First milestone

Resolve and test the smallest playable loop before selecting a production architecture. A deterministic enumerator now checks the provisional control-model semantics. Next, deeply audit that implementation and its machine fixture, then independently reconstruct its results. No playable game or human playtest exists yet.
