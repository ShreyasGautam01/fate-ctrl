# Design Review — FATE/CTRL

**Status:** Open review. No item is resolved until supported by reasoned analysis or playtest evidence.

## Review standard
For every mechanic, evaluate player fantasy, decision quality, counterplay/fairness, interaction with objectives and pacing, readability, edge cases, narrative causality, implementation/testing cost, replayability, and evidence that could disprove the design claim. Remove mechanics whose strategic value does not justify cognitive and engineering cost.

## Critical design questions

### D1 — Unit of play
Compare simultaneous hidden commitments, alternating influence/response, and a justified hybrid. This choice affects pacing, fairness, information timing, UI, server authority, and conflict resolution. **Current stance: unresolved.** Build worked rounds and a three-round paper simulation before choosing.

### D2 — Meaning of protagonist control
Does a player issue an intention, spend influence, select from legal options, or directly control the protagonist? Too much direct control makes the protagonist a puppet; too little makes player turns feel irrelevant. Test an action where character knowledge/resources constrain plausibility.

### D3 — Resource economy
Compare fixed actions per round, influence tokens, per-action costs, cooldowns, or a minimal combination. Prevent spam without hiding decisions behind accounting. Test whether losing players retain meaningful options without rubber-banding.

### D4 — Fate without arbitrariness
Compare milestone progression, limited intervention budget, threat signals, and reactive rules. Visible plans can become mechanically solvable; hidden unrestricted powers feel unfair; fixed plot makes player choices cosmetic. Require three routes to Fate's goal, two credible disruptions, and a non-Fate ending.

### D5 — Information model
Define public/private facts, protagonist knowledge, player knowledge, and suspicion separately. For every hidden fact, specify who knows it, how it can be discovered, and whether its absence makes an objective infeasible.

### D6 — Conflict resolution
Write at least eight collision examples: protect/erase, reveal/suppress, delay/deadline, incompatible influences, stale targets, failed dependencies, and simultaneous objective completion. State the ordering and result explicitly.

### D7 — Earned escalation
Connect the umbrella, people, places, and institutions through established causes. Test three different opening strategies and ask players to reconstruct causality without coaching. Escalation must be surprising without becoming random noise.

### D8 — Defeating Fate
Define satisfying alternate terminal states. Players must not be forced to cooperate forever or stall to avoid an ending.

### D9 — Session length
A 15–25 minute target and a 10–15 minute explosive finale may conflict. Measure decision time, round count, repeated beats, perceived agency, and whether escalation arrives too early or late.

### D10 — Scenario generality
Compare hard-coded scenarios, JSON with a limited vocabulary of conditions/effects, and a custom narrative scripting language. Model a second tiny scenario before building a general-purpose system.

## Other open questions
- Online multiplayer versus local/pass-and-play for first tests.
- Whether players see Fate's goal, next milestone, threat signals, or a combination.
- Zero-sum, partially compatible, or independently scored objectives.
- Whether the game is tactical puzzle, social deduction, negotiation, or a deliberate blend.
- Authored templates, deterministic text assembly, or optional LLM narration.
- Whether randomness creates useful uncertainty or undermines learning.
- Whether the protagonist has explicit preferences/autonomy.
- Fixed round limit versus state-driven termination.

## Evidence from the first analysis pass

PAPER_SIMULATION_01.md is an authored analytical trace, not a human playtest. It exposed risks around one-action-per-round conflict, knowledge transfer, and deadline ordering. INFORMATION_MODEL.md proposes a vocabulary and ownership map; it is not an approved runtime schema. SCENARIO_CAUSALITY_REVIEW.md and CANDIDATE_CAUSAL_ROUTES.md outline three possible escalation architectures, none selected. The next pass must add exact provisional resolution rules and test the weakest causal links rather than treating these documents as proof of fun or balance.

## Evidence from the second analysis pass

PAPER_SIMULATION_02.md stress-tests one provisional influence model. It does not yet provide a matched comparison against direct protagonist intentions and is not a human playtest. Its provisional ordering exposes decisions that must be global: effect validation, conflict handling, protagonist response, information acquisition, deadline expiry, and Fate/objective evaluation. CAUSAL_ROUTE_WORKSHOP.md identifies that the current target conflates causing an emergency with being blamed during one; none of the candidate chains yet justifies a literal citywide catastrophe. OBJECTIVE_AND_FAIRNESS_WORKSHEET.md defines what an objective needs beyond an evocative sentence.

## Next design exercise

Write a matched three-round trace for direct protagonist intentions using the same fixture, objective drafts, deadlines, and edge cases as PAPER_SIMULATION_02.md. Then compare it against the influence model using criteria stated before judging the outcomes. In parallel, trace one causal route event by event and reject it if any link relies on a new fact, implausible public inference, or uncounterable Fate intervention. A neutral reviewer should be able to reconstruct the outcome from the event log alone.

## First design exercise
Construct one complete sample round for both simultaneous and alternating models using the same starting state and objectives. Include legal choices, resolution order, Fate's legal response, resulting state/event log, player-facing explanation, and why each player might choose differently. Compare strategic depth, counterplay, fairness, clarity, pacing, and implementation complexity. Then simulate at least three rounds and record the recommendation and rationale in DECISIONS.md.
