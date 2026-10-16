# Project Handoff

**Last updated:** 2026-10-16  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Working branch:** docs/round-resolution-simulation-02  
**Current phase:** concept validation and specification  
**Implementation:** not started

## Product summary
FATE/CTRL is a proposed two-player narrative strategy game. Both players influence one protagonist while pursuing distinct objectives; a constrained Fate system attempts to reach a scenario-defined dramatic ending. The story begins with an ordinary problem and escalates through causally connected consequences. Deterministic rules are authoritative; narration is presentation.

## Baseline
PR #1 established the first design documents; PR #2 added a first paper simulation, information model, and causal-route comparisons. The current branch adds a provisional resolution stress test, direct-intention candidate trace, model-comparison scorecard, causal-route workshop and trace, objective/fairness worksheet, protagonist-response alternatives, and a shared-priority-table replay. This branch is not merged into main; project owner reviews and merges changes.

## Findings from this iteration
- PRIORITY_TABLE_REPLAY_01.md applies one explicit, provisional protagonist policy to both control models. It is desk analysis, not human playtest evidence.
- The shared policy exposes a genuine deadline asymmetry: with one boundary remaining, honest return can outrank B's attempt to establish prior knowledge. B therefore needs a viable earlier information path; fairness does not require both objectives to complete in every state.
- In the current trace, the influence model's potential for both players to shape future conditions is only valuable if duration, cost, stacking, visibility, and counterplay are explicit. Otherwise the contribution is cosmetic or opaque.
- The direct-intention model makes rejected requests legible but risks repeated frustration for the player whose request loses. Both models remain candidates; no score or selection is justified yet.
- The protagonist priority table remains a hypothesis. An independent reviewer should reconstruct the outcomes from the document without coaching before a human comparison.
- The umbrella scenario still lacks a credible causal route to a literal citywide catastrophe. A smaller target—Jules publicly blamed for a consequential local operational failure during an independently existing storm disruption—is the only current target worth further tracing, not accepted canon.
- Stale targets, cost refunds, deadline boundaries, knowledge acquisition, and Fate eligibility still need global, explicit contracts.
- Objective progress and objective completion are distinct. Repair preparation, evidence discovery, honest return, trust preservation, and proof of nondisclosure must not be collapsed into one flag.
- No interaction model, objective model, causal route, runtime schema, or implementation stack has been approved.

## Documents to read next
1. PRIORITY_TABLE_REPLAY_01.md — shared protagonist policy, three-round replay, counterfactuals, and exploit audit.
2. MATCHED_MODEL_COMPARISON_01.md, MODEL_COMPARISON_SCORECARD.md, PROTAGONIST_RESPONSE_RULES.md — model comparison and response policy.
3. PAPER_SIMULATION_02.md and DIRECT_INTENTION_TRACE.md — earlier provisional resolution stress test and direct-intention trace.
4. CAUSAL_ROUTE_WORKSHOP.md and CAUSAL_ROUTE_TRACE_01.md — causal alternatives and event-by-event trace.
5. OBJECTIVE_AND_FAIRNESS_WORKSHEET.md — objective predicates, partial outcomes, and fairness.
6. INFORMATION_MODEL.md, MODULE_CONTRACTS.md, and ARCHITECTURE.md — information ownership and technical boundaries.
7. TASKS.md and DECISIONS.md — open gates and decision status.

## Next action
1. Conduct an independent reconstruction of PRIORITY_TABLE_REPLAY_01.md. Ask the reviewer to list the selected action, decisive priority, knowledge gained, objective progress, and unresolved facts for every round and counterfactual, without coaching. Record mismatches as ambiguity defects.
2. If the trace is reproducible, design a short human test comparing direct intentions and environmental influence in counterbalanced order. Capture player predictions, perceived agency, understanding of rejection/effect duration, and whether losing a decision still leaves meaningful options. Do not invent numerical results or call desk analysis a playtest.
3. Separately test the local public-blame finale against the original desired escalation. Include a non-Fate route and at least two plausible player disruptions. If the route requires contrivance, revise the ending or replace the opening premise.
4. Only after these gates pass, finalize the smallest action set and resolution contract, then consider a minimal deterministic prototype.

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
