# FATE/CTRL

FATE/CTRL is a proposed two-player narrative strategy game about competing intentions, shared influence over one ordinary person's life, and a Fate system pursuing a dramatic outcome.

**Current phase:** concept validation and specification. No gameplay implementation is approved yet.

## Design goals under evaluation
- Two players have distinct, partially conflicting objectives.
- Both influence one protagonist and a persistent shared world.
- Fate pursues a scenario-defined goal through legible, limited interventions.
- Choices create strategic trade-offs, not merely different prose.
- Rules and outcomes are deterministic; presentation is separate.
- Core play does not require a paid LLM API.
- Escalation grows from established causes rather than arbitrary coincidence.

These are goals to test, not claims that the current design already achieves them.

## Working method
Validate the experience with paper simulations and small prototypes before investing in a larger architecture. Significant changes should include rationale, acceptance criteria, and test evidence, and should be reviewed through pull requests.

## Project documents
- [SPEC.md](SPEC.md) — intended experience, candidate rules, open questions, acceptance criteria.
- [DESIGN_REVIEW.md](DESIGN_REVIEW.md) — design risks and unresolved questions.
- [CORE_LOOP_COMPARISON.md](CORE_LOOP_COMPARISON.md) — comparison of candidate interaction models.
- [PROTAGONIST_CONTROL.md](PROTAGONIST_CONTROL.md) — analysis of how players influence one protagonist.
- [PAPER_SIMULATION_01.md](PAPER_SIMULATION_01.md) — exploratory comparison of control models through three rounds.
- [PAPER_SIMULATION_02.md](PAPER_SIMULATION_02.md) — provisional resolution stress test for conflicts, stale targets, deadlines, knowledge, and Fate prerequisites.
- [DIRECT_INTENTION_TRACE.md](DIRECT_INTENTION_TRACE.md) — candidate trace for direct protagonist intentions.
- [MODEL_COMPARISON_SCORECARD.md](MODEL_COMPARISON_SCORECARD.md) — unweighted criteria for comparing control models.
- [DIRECT_INTENTION_TRACE.md](DIRECT_INTENTION_TRACE.md) — matched candidate trace for direct protagonist intentions.
- [MODEL_COMPARISON_SCORECARD.md](MODEL_COMPARISON_SCORECARD.md) — criteria for comparing direct intentions and environmental influence without false precision.
- [CAUSAL_ROUTE_WORKSHOP.md](CAUSAL_ROUTE_WORKSHOP.md) — skeptical review of the intended escalation and a possible revised Fate goal.
- [CAUSAL_ROUTE_TRACE_01.md](CAUSAL_ROUTE_TRACE_01.md) — event-by-event route trace, causal breakpoints, and three candidate terminal targets.
- [OBJECTIVE_AND_FAIRNESS_WORKSHEET.md](OBJECTIVE_AND_FAIRNESS_WORKSHEET.md) — objective predicates, overlap, partial outcomes, and fairness checks.
- [SCENARIO_CAUSALITY_REVIEW.md](SCENARIO_CAUSALITY_REVIEW.md) — tests for a credible escalation from the umbrella opening.
- [CANDIDATE_CAUSAL_ROUTES.md](CANDIDATE_CAUSAL_ROUTES.md) — three alternative escalation architectures; none is canon.
- [INFORMATION_MODEL.md](INFORMATION_MODEL.md) — definitions and ownership for facts, evidence, knowledge, visibility, and events.
- [MODULE_CONTRACTS.md](MODULE_CONTRACTS.md) — module responsibilities and information exchange.
- [ARCHITECTURE.md](ARCHITECTURE.md) — technical options and provisional direction.
- [DECISIONS.md](DECISIONS.md) — decisions, status, rationale, and revisit triggers.
- [DESIGN_DECISION_RECORD.md](DESIGN_DECISION_RECORD.md) — gate index showing evidence needed before each major choice is accepted.
- [DECISION_TEMPLATE.md](DECISION_TEMPLATE.md) — template for recording design decisions.
- [TASKS.md](TASKS.md) — staged plan and exit criteria.
- [PLAYTEST_PLAN.md](PLAYTEST_PLAN.md) — playtest questions and revision triggers.
- [AGENTS.md](AGENTS.md) — AI coding-agent instructions.
- [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md) — current state and continuation protocol.
- [scenarios/umbrella.json](scenarios/umbrella.json) — initial scenario design probe.

## First milestone
Agree on the smallest playable loop that tests the central promise: two players strategically contest one protagonist's direction while Fate creates pressure without making player choices feel irrelevant. Do not start production implementation until critical design questions and module contracts are reviewed.
