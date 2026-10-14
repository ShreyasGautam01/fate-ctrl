# Project Handoff

**Last updated:** 2026-10-15  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Working branch:** docs/paper-simulation-01  
**Current phase:** concept validation and specification  
**Implementation:** not started

## Product summary
FATE/CTRL is a proposed two-player narrative strategy game. Both players influence one protagonist while pursuing distinct objectives; a constrained Fate system attempts to reach a scenario-defined dramatic ending. The story begins with an ordinary problem and escalates through causally connected consequences. Deterministic rules are authoritative; narration is presentation.

## Baseline
The initial design baseline is merged in PR #1. This iteration adds a first paper simulation, an information model, and a comparison of possible causal routes. All are analysis artifacts; none constitutes human playtest evidence or locks gameplay.

## Findings from this iteration
- The opening has a responsibility contradiction: Jules damaged the umbrella, while Player B's draft objective assumes it was already damaged when lent.
- The first three-round paper trace is exploratory. It suggests a one-action-per-round limit may manufacture conflict between goals that could coexist.
- Evidence existence, accessibility, player knowledge, protagonist knowledge, discovery, belief, disclosure, and public claims must remain distinct.
- Three escalation architectures have been outlined. None yet establishes a convincing path from the umbrella dispute to a citywide emergency.
- Route C (compounding human misinterpretations) best fits the interpersonal themes on paper, but its path to a genuinely citywide emergency is weak. This is a research lead, not a selection.
- The exact control unit, timing model, conflict policy, protagonist-response rule, objective scoring, and Fate intervention model remain open.

## Documents to read next
1. PAPER_SIMULATION_01.md — first exploratory control-model trace.
2. SCENARIO_CAUSALITY_REVIEW.md — tests for earned escalation.
3. CANDIDATE_CAUSAL_ROUTES.md — three alternative causal architectures.
4. INFORMATION_MODEL.md — truth/evidence/knowledge/visibility concepts and ownership.
5. TASKS.md and DECISIONS.md — next work and current status.

## Next action
Create a second, stricter simulation with explicit provisional rules for compatible actions, conflicting actions, stale targets, deadline/effect collisions, and Fate prerequisites. Separately produce a one-page causal chain for each escalation route with actors, knowledge, evidence, timing, Fate's legal contribution, player counterplay, and a non-Fate branch. If no route earns the ending, revise the ending or replace the scenario rather than force it.

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
