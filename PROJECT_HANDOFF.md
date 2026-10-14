# Project Handoff

**Last updated:** 2026-10-15  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Working branch:** docs/round-resolution-simulation-02  
**Current phase:** concept validation and specification  
**Implementation:** not started

## Product summary
FATE/CTRL is a proposed two-player narrative strategy game. Both players influence one protagonist while pursuing distinct objectives; a constrained Fate system attempts to reach a scenario-defined dramatic ending. The story begins with an ordinary problem and escalates through causally connected consequences. Deterministic rules are authoritative; narration is presentation.

## Baseline
PR #1 established the first design documents; PR #2 added a first paper simulation, information model, and causal-route comparisons. This iteration adds a provisional resolution stress test, a direct-intention candidate trace, a model-comparison scorecard, a skeptical causal-route workshop, and an objective/fairness worksheet. PR #2 is merged; this iteration is separate from main until reviewed.

## Findings from this iteration
- PAPER_SIMULATION_02.md stress-tests one provisional influence model. It is not a matched comparison with direct intentions and is not a human playtest.
- DIRECT_INTENTION_TRACE.md provides the alternative model trace; MATCHED_MODEL_COMPARISON_01.md aligns the starting fixture and strategy profiles. PROTAGONIST_RESPONSE_RULES.md now compares candidate deterministic response policies. The matched trace still lacks a fully specified priority table and a B-favoring round, so this is a comparison framework, not a completed comparative result.
- MODEL_COMPARISON_SCORECARD.md defines criteria without invented weights. The models are not selected.
- A deterministic no-op on equal conflicting actions is predictable but may feel like wasted turns and encourage blocking. It is only a test rule.
- Stale targets, cost refunds, deadline boundaries, knowledge acquisition, and Fate eligibility require global, explicit contracts.
- Objective progress and objective completion are distinct. Objectives need measurable terminal predicates, feasibility paths, partial outcomes, and exploit checks.
- The umbrella scenario still lacks a credible causal route to a literal citywide catastrophe. A smaller but dramatic target—Jules wrongly blamed for a consequential local failure during a real public emergency—may be stronger. CAUSAL_ROUTE_TRACE_01.md traces this route and identifies the break: it does not currently justify blame for causing a citywide emergency.
- No interaction model, objective model, causal route, runtime schema, or implementation stack has been approved.

## Documents to read next
1. PAPER_SIMULATION_02.md — provisional influence-model resolution stress test and limitations.
2. DIRECT_INTENTION_TRACE.md, MATCHED_MODEL_COMPARISON_01.md, MODEL_COMPARISON_SCORECARD.md, and PROTAGONIST_RESPONSE_RULES.md — candidate traces, comparison criteria, and response-policy alternatives.
3. CAUSAL_ROUTE_WORKSHOP.md and CAUSAL_ROUTE_TRACE_01.md — causal alternatives and an event-by-event trace.
4. OBJECTIVE_AND_FAIRNESS_WORKSHEET.md — goal, progress, terminal predicate, and fairness model.
5. PAPER_SIMULATION_01.md and PROTAGONIST_CONTROL.md — prior control-model questions.
6. INFORMATION_MODEL.md, MODULE_CONTRACTS.md, and ARCHITECTURE.md — data ownership and technical boundaries.
7. TASKS.md and DECISIONS.md — open gates and proposed decisions.

## Next action
Complete the matched comparison by specifying a small scenario-authored priority table with both A-favoring and B-favoring states, then replay both models against that same table. Then ask a reviewer to reconstruct outcomes. Do not score or select a model yet. Compare both models against the predeclared criteria without inventing numeric weights. Separately, review CAUSAL_ROUTE_TRACE_01.md: Target 1 (blame for a local operational failure) is currently the only target worth further tracing; Target 3 (blame for causing a citywide emergency) is unsupported. Decide whether the smaller target preserves the desired finale, or replace the scenario premise. Have a reviewer reconstruct the trace without coaching. If the causal route cannot earn the ending, revise the ending or replace the scenario rather than forcing it.

## Constraints
- Quality and cross-system trade-off analysis outrank rapid implementation.
- Keep project state in repository docs so work can resume without chat history.
- Explain decisions and effects on related systems.
- Avoid paid LLM dependencies for core play.
- Generated narration cannot decide outcomes.
- Do not start production code until design gates are satisfied.
- Make incremental, verified changes through PRs; project owner approves merges.
- Distinguish analytical simulations from actual playtest evidence.

## Session update protocol
Update task statuses based on evidence; record decisions and rationale; update specs/contracts when behavior changes; record tests/playtest observations and limitations; update this handoff with the exact next action.
