# Playtest Plan

**Status:** Draft protocol; no playtests have been conducted.

## Purpose
Determine whether the core loop produces understandable, consequential choices and whether Fate creates pressure without invalidating player agency.

## Questions
1. Can each player explain their objective and the opponent's likely objective?
2. Can players predict some consequences before acting?
3. Are multiple actions plausible, rather than one obviously correct choice?
4. Do counteractions feel earned and legible?
5. Does Fate feel like a strategic opponent rather than a cheating narrator?
6. Does escalation follow understandable causal links?
7. Can players explain why the ending occurred?
8. Is temporary cooperation against Fate interesting rather than compulsory?
9. Does the round structure maintain tension without excessive waiting or cognitive load?
10. Would players play again with different choices?

## Stage 0 — Paper simulation
Simulate at least three rounds with strategy profiles: objective-focused/conservative, aggressive interference, and opportunistic temporary cooperation against Fate. Record starting state, legal choices, selected actions, resolution order, Fate action, resulting state, and event log. Ambiguous outcomes are specification defects, not player errors.

## Stage 1 — Think-aloud play
Give two players only the rules and information they would see. Avoid coaching unless blocked. Observe misunderstandings, arbitrary-feeling outcomes, meaningful uncertainty, unused actions, perceived fairness/agency, time to decide/resolve, causal explanations, and missing information.

## Stage 2 — Replay and variation
Replay with different openings and strategies. Test whether the scenario has meaningful branches and whether familiarity still leaves nontrivial decisions.

## Measures
- Rule comprehension.
- Perceived agency and ability to name a consequential decision.
- Ability to reconstruct the causal chain.
- Presence of two or more viable options at key choices.
- Fate fairness and available counterplay.
- Pacing problems and repeated beats.
- Desire to replay and intended strategy changes.

Small samples provide qualitative signals, not statistical proof. Record sample size, scenario version, and limitations.

## Revision triggers
Pause feature expansion if players cannot explain a resolution, one action dominates, Fate nullifies successful decisions without counterplay, the intended ending needs arbitrary coincidence, a player has no meaningful action for multiple rounds, success depends on undiscoverable hidden information, or narration contradicts state.

## Stage -1 — Independent specification reconstruction (before human playtesting)

**Purpose:** Detect ambiguities in the rules before asking players to experience them. This is a document review, not a playtest and not independent evidence if the author performs it.

For the current priority-table replay, give the reviewer only:
- PRIORITY_TABLE_REPLAY_01.md;
- no verbal explanation or coaching;
- a blank response sheet asking for each round: legal actions, selected action, decisive priority, knowledge gained, objective progress versus completion, and unresolved facts.

Ask the reviewer to reconstruct the two counterfactual states as well. The reviewer must quote the rule or precondition supporting each answer. Record each mismatch as one of:
1. **Rule gap:** no rule decides the outcome.
2. **Contradiction:** two rules imply different outcomes.
3. **Knowledge leak:** an action uses information not yet available to Jules.
4. **Objective ambiguity:** progress is mistaken for completion or a predicate is undefined.
5. **Presentation gap:** the outcome is mechanically determined but the player-facing explanation would be unclear.

Do not silently coach the reviewer to the intended answer. If a reasonable reader reaches a different result, revise the specification and repeat the reconstruction with a fresh reviewer if available. An author rereading their own document is a useful desk audit, but must not be labelled independent review.

**Pass condition:** All rounds and counterfactuals can be reconstructed from the document alone, with no missing preconditions, undocumented tie-breaks, or assumptions about facts that were not seeded.

**Fail condition:** Any outcome requires the author to explain what they meant. Fix that ambiguity before human playtesting.

## Current test gate

The priority-table replay is an authored desk simulation. No independent reconstruction and no human playtest are recorded yet. The next action is to obtain a reviewer reconstruction; after ambiguity defects are fixed, run a small, counterbalanced comparison of direct intentions and environmental influence. Do not report qualitative observations as statistical proof.
