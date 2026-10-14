# Project Handoff

**Last updated:** 2026-10-15  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Current phase:** concept validation and specification  
**Implementation:** not started

## Product summary
FATE/CTRL is a proposed two-player narrative strategy game. Both players influence one protagonist while pursuing distinct objectives; a constrained Fate system attempts to reach a scenario-defined dramatic ending. The story starts with a relatable problem and escalates through causally connected consequences. Deterministic rules are authoritative; narration is presentation.

## Current concept probe
The Red Umbrella: Jules borrowed and damaged a red umbrella, must return it before a flatmate leaves, and the players have conflicting goals about trust and responsibility. Fate seeks an ending where Jules is blamed for a citywide emergency during a live broadcast while holding the umbrella. This premise is provisional.

## Constraints
- Quality and cross-system trade-off analysis outrank rapid implementation.
- Keep project state in repository docs so work can resume without chat history.
- Explain decisions and effects on related systems.
- Avoid paid LLM dependencies for core play.
- Generated narration cannot decide outcomes.
- Do not start production code until the core loop and module contracts are reviewed.
- Make incremental, verified changes through PRs; project owner approves merges.

## Unresolved
- Simultaneous vs alternating/hybrid action model.
- Meaning of player control over protagonist.
- Action set and resource economy.
- Fate intervention budget and visibility.
- Objective scoring and compatible/partial outcomes.
- First-playtest format and online multiplayer need.
- Scenario schema and implementation stack.

## Next action
Create worked-round examples for simultaneous and alternating models using the same initial state and competing objectives. Compare decision depth, counterplay, fairness, resolution clarity, pacing, and implementation complexity. Simulate at least three rounds under different strategies and record the recommendation in DECISIONS.md.

## Session update protocol
Update task statuses based on evidence; record decisions and rationale; update specs/contracts when behavior changes; record tests/playtest observations and risks; update this handoff with the exact next action.
