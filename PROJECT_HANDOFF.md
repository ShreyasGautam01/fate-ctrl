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
PR #1 established the first design documents; PR #2 added a first paper simulation, information model, and causal-route comparisons. This iteration adds a provisional resolution stress test, a skeptical causal-route workshop, and an objective/fairness worksheet. PR #2 is merged; this iteration is separate from main until reviewed.

## Findings from this iteration
- PAPER_SIMULATION_02.md makes one influence-model resolution order explicit enough to expose edge cases. It is not a matched comparison with direct protagonist intentions and is not a human playtest.
- A deterministic no-op on equal conflicting actions is predictable but may feel like wasted turns and encourage blocking. It is only a test rule.
- Stale targets, cost refunds, deadline boundaries, knowledge acquisition, and Fate eligibility require global, explicit contracts.
- Objective progress and objective completion are distinct. Objectives need measurable terminal predicates, feasibility paths, partial outcomes, and exploit checks.
- The umbrella scenario still lacks a credible causal route to a literal citywide catastrophe. A smaller but still dramatic target—Jules wrongly blamed for a consequential local failure during a real public emergency—may be stronger, but remains unaccepted.
- No interaction model, objective model, causal route, runtime schema, or implementation stack has been approved.

## Documents to read next
1. PAPER_SIMULATION_02.md — provisional resolution stress test and its limitations.
2. CAUSAL_ROUTE_WORKSHOP.md — distinction between actual responsibility and public blame.
3. OBJECTIVE_AND_FAIRNESS_WORKSHEET.md — goal/progress/terminal predicate and fairness model.
4. PAPER_SIMULATION_01.md and PROTAGONIST_CONTROL.md — prior control-model questions.
5. INFORMATION_MODEL.md, MODULE_CONTRACTS.md, and ARCHITECTURE.md — data ownership and technical boundaries.
6. TASKS.md and DECISIONS.md — open gates and proposed decisions.

## Next action
Produce a matched three-round trace for the direct-intention model using the same fixture and edge cases as the influence-model stress test. Compare both models against predeclared criteria. Separately write a complete causal route with actor, knowledge, evidence, timing, Fate intervention, counterplay, and alternate ending at each edge. Have a reviewer reconstruct the trace without coaching. If the causal route cannot earn the ending, revise the ending or replace the scenario rather than forcing it.

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
