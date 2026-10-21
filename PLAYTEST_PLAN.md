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

## Stage -1B — Independent causal-route and objective reconstruction

**Purpose:** Test whether the proposed transit-interchange scenario can be reconstructed without author coaching before executable scenario rules are written. This is an independent desk review, not a human playtest and not evidence of fun.

**Documents to provide, without verbal explanation:**
- `CAUSAL_ROUTE_TRACE_01.md` — one detailed Target 1 trace and its candidate direct-action vocabulary;
- `CANDIDATE_CAUSAL_ROUTES.md` — original large-scale causal architectures plus the three narrower local-blame mechanisms;
- `SCENARIO_CAUSALITY_REVIEW.md` — the premise, target-scale and objective-coupling comparison.

The reviewer should be asked to reconstruct, not improve or rescue, the design. They should be explicitly allowed to reject a route.

### Reconstruction questions

For each route retained as a candidate, have the reviewer record:

1. **Pre-existing facts:** What must already be true before the relevant player choice? Which fact, device, witness, institution, message channel, log or audience would be an unfair late introduction if not established?
2. **Knowledge and legality:** What does Jules know, what does each player know, and what does each witness know at every choice? Which direct actions are legal from that knowledge?
3. **Cause vs. contribution vs. attribution:** What actually causes the operational failure? How, if at all, can Jules's action contribute? What evidence supports the public claim, and what does that evidence fail to prove?
4. **Public reach and provenance:** Who saw the clip/message, why would they see it, how is the source traced, and how could a correction reach the same audience? Reject unbounded claims such as “it goes viral” unless distribution is specified.
5. **Fate legality:** Which already-eligible opportunity does Fate exploit? State its cost, duration, visible event, counterplay and expiry. Identify any step that requires Fate to invent evidence, force belief, or suppress all correction.
6. **Counterfactuals:** Describe one legal action that advances the blame route and one that breaks it. State what remains true if Jules leaves before the public incident.
7. **Objective coupling:** Compare O1 and O2 in the matched first three moments. Do personal trust, the deadline, public evidence and Fate's target produce real disagreements, or do they remain parallel subplots?
8. **Terminal outcomes:** Write the conditions for Fate success and a satisfying non-Fate ending. Distinguish the actual cause, Jules's contribution, the public's belief, and personal-objective results.

### Classification and pass/fail

The reviewer must label each proposed route **viable**, **conditional**, or **reject**, with the missing evidence or rule cited. Do not require all three to pass simply because the design asks for three. Route variants that use the same causal hinge do not count as materially distinct.

**Pass:** A reviewer independently reconstructs at least three materially different viable routes, including the evidence chain and a counterfactual that can defeat each route; the objective coupling is clear; a non-Fate ending is credible; and the intended scale is explicitly chosen rather than implied.

**Fail:** Any outcome depends on author explanation, an unknown source, a forced rendezvous, an invented public audience, a character's unacquired knowledge, or Fate deciding the story by fiat. If fewer than three routes pass, reject weak candidates and reconsider the premise or target before scenario code is written.

Record the reviewer, date, document versions, their independent classifications and any disagreements. Keep the author's desk assessment separate. Do not label this stage complete merely because the author performs a self-review.

## Current test gate

The priority-table replay and §§10–11 of SCENARIO_CAUSALITY_REVIEW.md are authored desk work. No independent reconstruction of the new direct-action scenario and no uncoached human playtest are recorded yet. The owner has selected direct-action mode; a repeated A/B comparison against environmental influence is not the next gate. First obtain an uncoached reconstruction of the same-state action-arbitration table, objective-sequence matrix and causal-route packet. Then human sessions should evaluate the selected direct-action experience for comprehension, agency, inference, fairness and pacing. Do not report qualitative observations as statistical proof.
