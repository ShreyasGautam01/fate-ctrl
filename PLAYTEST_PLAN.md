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

## Stage -1C — Uncoached reconstruction of the current P2 trace

**Purpose:** test whether an unfamiliar reviewer can derive action legality, selected actions, evidence/knowledge changes, objectives, and intervention outcomes from the current paper contract without author explanation. This is not human playtesting and does not validate fun.

**Material:** give the reviewer **only** `P2_RECONSTRUCTION_PACKET.md` for the first pass. Do not initially provide the complete `SCENARIO_CAUSALITY_REVIEW.md`, which contains the author's worked choices and route classifications. Do not coach or clarify during the first pass; record any clarification request as a potential specification gap.

**Required output:** a completed transition table for packet Cases A–G; an evidence-provenance table for Case H; independent route classifications and counterfactuals for Case I; and a list of rule gaps, contradictions, illegal/invalid actions, objective ambiguities, unsupported public claims, and unresolved terminal/phase conditions. Ask the reviewer to cite the exact rule supporting each selected action and distinguish objective progress from completion.

**After the first pass:** preserve the reviewer's original response, then compare it with §§15.1–15.8 in the full scenario review. Categorize differences as rule gap, contradiction, precondition mismatch, unintended knowledge/visibility leak, unsupported inference, priority concern, or an authored assumption challenged by the reviewer. Do not silently edit the reviewer's conclusions to match the author's.

**Pass condition:** each claimed transition is reconstructable from explicit preconditions and policy; role-swapped pairs preserve the result; evidence proves only what the source can establish; Jules acts only on acquired knowledge; the proposed Fate delay has a real expiry/counterplay window; and a non-Fate path is credible. The broader scenario gate additionally requires three materially distinct viable routes to an explicitly chosen target. A successful desk reconstruction alone does not approve canon or establish player enjoyment.

### Stage -1C execution record — 2026-10-23

**Reviewer:** Claude (AI reviewer; not a human playtester). The reviewer reports that they did not read the full author trace, and used an external throwaway model for selected checks. They also disclosed possible priming after reading the `PLAYTEST_PLAN.md` diff, which mentioned rejecting F2 if Beat 4 was not a real phase. Preserve this limitation when interpreting Case G.

**Result:** **FAIL / PARTIAL RECONSTRUCTION.** See `P2_RECONSTRUCTION_REVIEW_01.md` for Cases A–I, the F-01–F-25 register, tested invariants, and the proposed triage. Role-swap invariance held on the tested rows, and the route cue model was deterministic; completeness of the action selector, objective feasibility, terminal timing, target attribution, and Fate visibility/counterplay did not pass.

**Follow-on target screen:** `P2_TARGET_VIABILITY_SCREEN_01.md` compares T0 (unsupported operator attribution), T1 (weak standalone omission predicate), T2-F2 (timing/visibility failure), T3 (possible local operational-delay micro-target), and T4 (new premise). It is a comparison, not a target selection.

**Evidence boundary:** This completes one AI desk first pass only. It does not complete a human independent reconstruction, a human playtest, the three-route gate, or a production design gate. Do not mark Stage -1C as passed.

## Current test gate

The P2 reconstruction packet has received one AI first-pass response, recorded in `P2_RECONSTRUCTION_REVIEW_01.md`. The result is fail/partial, with possible priming disclosed. The first blocker is not merely missing action rows: the current Fate target is unsupported by the available evidence, A's two aims cannot both be completed in three beats if they are conjunctive, and Beat 4 occurs after the target's stated evaluation boundary. The action selector, terminal horizon, information projection, and Fate's activation/resource/progress rules are also incomplete.

Do not add isolated patches or modify scenario fixtures yet. First reconsider the target, objective relationship and evaluation/terminal horizon. If P2 remains viable after those choices, specify a complete proposer-blind resolver and information projection, then create a revised packet for another reconstruction. Direct-action mode remains the owner's selected direction. `scenarios/umbrella.json` and `scenarios/control_model_test_fixture.json` remain unchanged. No production gameplay is authorized.
