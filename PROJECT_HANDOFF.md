# Project Handoff

**Last updated:** 2026-10-15  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Working branch:** docs/design-baseline-v0.1  
**Current phase:** concept validation and specification  
**Implementation:** not started

## Product summary
FATE/CTRL is a proposed two-player narrative strategy game. Both players influence one protagonist while pursuing distinct objectives; a constrained Fate system attempts to reach a scenario-defined dramatic ending. The story starts with a relatable problem and escalates through causally connected consequences. Deterministic rules are authoritative; narration is presentation.

## Current concept probe
The Red Umbrella: Jules borrowed and damaged a red umbrella, must return it before a flatmate leaves, and the players have conflicting goals about trust and responsibility. Fate seeks an ending where Jules is blamed for a citywide emergency during a live broadcast while holding the umbrella. This premise is provisional.

## Important consistency issue
The initial premise says Jules damaged the umbrella, while Player B's draft objective assumes the flatmate knowingly lent an already-damaged umbrella. The two claims need reconciliation. CORE_LOOP_COMPARISON.md uses a temporary hypothesis with two separate damage events for analysis only; it is not accepted scenario canon.

## Constraints
- Quality and cross-system trade-off analysis outrank rapid implementation.
- Keep project state in repository docs so work can resume without chat history.
- Explain decisions and effects on related systems.
- Avoid paid LLM dependencies for core play.
- Generated narration cannot decide outcomes.
- Do not start production code until the core loop and module contracts are reviewed.
- Make incremental, verified changes through PRs; project owner approves merges.

## Unresolved
- PROTAGONIST_CONTROL.md compares five control models; no model selected.
- Candidate turn models documented in CORE_LOOP_COMPARISON.md but not selected.
- Simultaneous vs alternating/hybrid action model.
- Meaning of player control over protagonist.
- Action set and resource economy.
- Fate intervention budget and visibility.
- Objective scoring and compatible/partial outcomes.
- First-playtest format and online multiplayer need.
- Scenario schema and implementation stack.

## Next action
First shortlist complete combinations of protagonist-control and timing models, using CORE_LOOP_COMPARISON.md and PROTAGONIST_CONTROL.md. Then simulate at least three rounds for the strongest two candidates using matched starting state and strategies. Track decision quality, fairness, cancellation, causal clarity, pacing, and state/UI complexity. Record a provisional recommendation in DECISIONS.md with uncertainty and revisit triggers.

## Session update protocol
Update task statuses based on evidence; record decisions and rationale; update specs/contracts when behavior changes; record tests/playtest observations and risks; update this handoff with the exact next action.
