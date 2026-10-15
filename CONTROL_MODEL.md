# Control Model — Revised Test Contract 0.3

**Status:** Provisional comparison contract after deep audit; not accepted production rules.  
**Decision owner:** Project owner.  
**Evidence class:** Desk analysis plus a Sonnet 5.5 critique. A deterministic enumerator is being implemented; no human playtest is claimed.  
**Scope:** Compare direct intention with environmental influence using one small, self-contained fixture. Do not treat this file's mechanics or rankings as story canon.

## 1. Decision and architecture boundary

FATE/CTRL is a proposed two-player narrative strategy game. Both players influence one protagonist, Jules, while pursuing partly conflicting goals. A bounded Fate system may later add pressure through supported causal events. The test here excludes Fate because the citywide-emergency finale is not causally established.

The unit-of-control decision is what each player submits:

- **Direct intention (I):** nominate a legal action that the player wants Jules to take. A proposal adds support to that action but does not execute it.
- **Environmental influence (W):** change a bounded world opportunity or temporary decision-context signal that the shared protagonist selector reads. It does not directly select Jules's action.

Do not conflate this with simultaneous versus alternating timing, resource economy, the protagonist policy, or resolution order. For the initial comparison, both players submit privately and simultaneously once per round, and Jules takes at most one protagonist action. That is an experimental control, not a final product decision.

The proposed logical pipeline is:

1. Load and validate the fixture.
2. Build one canonical state and player-specific authorized views.
3. Validate both mode-specific submissions against the same round-start snapshot.
4. Convert direct intentions to action-support counts, or resolve environmental influences into a temporary context and any declared opportunity change.
5. Derive the protagonist's legal actions.
6. Apply one shared deterministic action-ranking policy.
7. Execute the selected action and emit structured events.
8. Apply explicit knowledge acquisition and the fixture's character-response rule.
9. Evaluate objective progress and terminal predicates.
10. Advance the boundary and build visibility-filtered explanations.

The enumerator is a local rules test, not a playable game or production architecture.

## 2. Hard constraints for both models

- A player submission is not an unconditional command.
- Jules cannot use information Jules has not acquired.
- Player-only information does not automatically become Jules's knowledge.
- No action or influence creates an unsupported fact, witness, message, recording, or evidence item.
- The same state, rules version, and accepted inputs produce the same authoritative state and event sequence.
- Objective progress is derived from state/events, never from a submission alone.
- Explanations must identify why an action was selected or not selected without leaking an opponent's private information.
- Narration describes resolved events; it is never the authority for legality, facts, or outcomes.
- This fixture does not implement Fate, online play, persistence, LLM action selection, random outcomes, or a general narrative scripting language.

## 3. Shared test fixture

These are test assumptions, not accepted scenario canon.

### World facts and timing

- Jules borrowed a red umbrella from a flatmate. A loose rib existed before the loan; Jules later worsened a tear. These are two distinct condition events.
- A message thread exists and is accessible from Jules's phone. Jules knows the thread exists but has not inspected the relevant older messages.
- The thread contains a dated photo of the earlier loose rib and a message sent by the flatmate before the loan: “The rib is still loose—I noticed it yesterday. Jules is borrowing the umbrella, and I haven't told them about it.” The message is a seeded fixture fact, not something an influence may invent.
- The photo alone proves only the earlier visible condition. The seeded message provides the stronger evidence of prior knowledge and nondisclosure.
- Player B's private briefing identifies the relevant message. Player A is not given its content. Neither player's knowledge automatically transfers to Jules.
- A private conversation option exists, but it is not active at the start of any round unless an influence opens it.
- The flatmate is reachable during rounds 1–3 and departs immediately after Jules's action at the end of round 3. The countdown starts at 3, then 2, then 1 boundary remaining.
- There is one major protagonist action each round. Each player submits one item each round. No separate token economy is assumed.
- There is no public emergency or public evidence chain in this fixture. Fate's public-blame milestone is ineligible.

### Initial state

| Field | Initial value |
|---|---|
| round / boundaries remaining | 1 / 3 |
| umbrella returned | false |
| Jules acknowledged their later tear | false |
| message thread exists and is accessible | true |
| Jules knows the thread exists | true |
| thread inspected by Jules | false |
| evidence presented to flatmate | false |
| flatmate prior knowledge established to Jules | false |
| trust | 1 (baseline) |
| private conversation option exists | true |
| private window active | false |
| flatmate departed | false |
| temporary action-context signals | 0 |

### Test objectives

These predicates make the fixture computable; they are not final scoring rules.

- **Player A — honest return with trust preserved:** complete at departure if the umbrella was returned, Jules acknowledged the later tear, and trust is at least its baseline value of 1.
- **Player B — establish accountability with evidence:** complete at departure if Jules inspected the seeded message, presented it to the flatmate before departure, and the flatmate's prior knowledge was acknowledged from that evidence.

Inspection is progress, not disclosure. Disclosure is progress, not by itself proof that every audience has learned the fact. The fixture's presentation action explicitly supplies the flatmate acknowledgement.

### Deterministic relationship-response hypothesis

Trust begins at 1.

- If Jules presents the message before acknowledging Jules's later damage and no private window is active, trust falls to 0.
- If Jules has already acknowledged the later damage, trust remains at 1 when the message is presented.
- If a private window is active during presentation, the disclosure is private rather than humiliating; trust remains at 1 even if Jules has not yet acknowledged their own damage.
- A later honest return does not restore trust that fell to 0.

This deliberately strong ordering rule creates a testable sequencing choice; it is not a general claim about human relationships. The project owner must review it before canonizing the scenario.

## 4. Legal protagonist-action vocabulary

All actions consume Jules's one major action for the round. The legal-action generator evaluates these preconditions against canonical state and Jules's knowledge after influence effects are resolved.

| Action | Preconditions | Authoritative effect | What it does not do |
|---|---|---|---|
| INSPECT_SHARED_THREAD | Thread exists, is accessible, Jules knows it exists, and it has not been inspected | Mark the thread inspected; Jules learns the photo's visible condition and the seeded message's content; emit EvidenceInspected and a knowledge-acquisition event | Does not disclose evidence or complete B's objective |
| PRESENT_EVIDENCE | Thread has been inspected; flatmate is reachable; evidence has not already been presented | Mark evidence presented; record the flatmate acknowledgement; emit EvidencePresented and PriorKnowledgeAcknowledged; apply the trust rule in §3 | Does not return the umbrella or erase Jules's responsibility for the later tear |
| RETURN_HONESTLY | Umbrella has not been returned and the flatmate is reachable | Mark umbrella returned and Jules's later damage acknowledged; emit HonestReturn and OwnDamageAcknowledged | Does not restore trust already lost |
| WAIT | Always | No protagonist state change; the boundary still advances | Does not preserve the current round or stop departure |

WAIT is a protagonist fallback action, not a direct-intention proposal in this experiment. It remains in the legal action set so the shared selector can decline a lower-priority confrontation. The choice to exclude WAIT from direct proposals is a test-level anti-stall control, not accepted product canon.

No generic “do what feels right” action, arbitrary state patch, or unseeded evidence discovery is allowed.

## 5. Candidate I — Direct-intention semantics

Each player submits either a legal protagonist-action proposal from the vocabulary above, or PASS. WAIT cannot be proposed in this test. A proposal must be legal in the round-start state; invalid proposals contribute no support and receive an internal reason code.

**Chosen test semantics:** all scenario-legal actions remain candidates. Each legal proposal adds one support mark to its action; support is 0, 1, or 2. It neither executes the action nor removes other legal actions.

- Duplicate proposals support one action with strength 2; they do not execute it twice.
- Different proposals each support their own action.
- PASS contributes no support.
- An invalid/stale proposal contributes no support.
- An unselected proposal has no mechanical effect beyond its internal event record.
- If no action receives support, Jules still chooses by the shared protagonist policy.

This makes direct intention a competing nomination model, not a guaranteed command. Unanimous proposals may strongly sway Jules, so the enumerator must measure whether shared proposals dominate character priorities. A proposal-only candidate set is a different model and is not silently substituted here.

## 6. Candidate W — Environmental-influence semantics

Each player submits one bounded influence or PASS. The comparison uses three effect families. They change a temporary action-context signal or enable a private conversation; they do not create or transfer evidence.

### Effect vocabulary

| Influence | Preconditions | Effect read by the selector | Duration / failure behavior |
|---|---|---|---|
| PASS | Always | None | Consumes the submission slot without changing state/context |
| SET_THREAD_PROMINENCE(direction=up/down) | Thread exists, is accessible, Jules knows it exists, and it is not inspected | Up gives INSPECT_SHARED_THREAD a +1 context signal; down gives it -1 | This action selection only; does not reveal message content or change access/truth |
| SET_EVIDENCE_PROMINENCE(direction=up/down) | Thread is inspected, evidence is not presented, and flatmate is reachable | Up gives PRESENT_EVIDENCE a +1 context signal; down gives it -1 | This action selection only; does not present evidence or open a private window |
| OPEN_PRIVATE_WINDOW | Private conversation option exists, flatmate is reachable, evidence is inspected, and evidence is not presented | Opens a private window for this action/response step and contributes +1 to the PRESENT_EVIDENCE context signal | Does not disclose evidence; window and its signal expire after the action/response step if unused |

### Composition and conflicts

- Opposite SET_THREAD_PROMINENCE directions cancel to 0. Repeating the same direction is capped at +1 or -1; it does not stack.
- Opposite SET_EVIDENCE_PROMINENCE directions cancel to 0. Repeating the same direction is capped at +1 or -1; it does not stack.
- OPEN_PRIVATE_WINDOW is compatible with either evidence-prominence direction. Its +1 is added to the resolved evidence-prominence signal and the result is clamped to [-1,+1]. The private protection remains active even when the resulting signal is 0.
- Validate both influences against the same round-start snapshot, then group effects by target before applying them. Do not make player-ID or iteration order decide conflicts.
- A stale or ineligible influence fails with a stable internal reason, changes no state/context, and still consumes that player's submission slot for this test.
- Player-facing error reasons must not reveal the opponent's hidden objective or source content.
- No influence chooses Jules's action directly. If an influence changes no selector-read variable and no response consequence in a reachable state, it is not a useful effect and should be removed.

The current influence set is intentionally limited to context and privacy effects. It does not represent every possible environmental-control game; it is the smallest test candidate for deciding whether indirect steering is legible and strategic enough to pursue.

## 7. Shared deterministic protagonist-selection policy

The policy runs the same way in both candidates. The active input channel differs: direct support for I, context signal for W. Player objectives never appear directly as Jules's motivation.

### Legal-action generation

Generate the full set from §4 using post-influence state and Jules's current knowledge. WAIT is always available. A proposal or influence does not make an otherwise illegal action legal, except that an explicit seeded access/knowledge effect would have to be separately defined; none exists in this fixture.

### Rank procedure

Compare every legal action lexicographically, highest tuple first:

**(contextSignal, directSupport, actionTier, deadlineTier, tieBreakRank)**

- **contextSignal:** for W, the resolved signal on that action, normally -1, 0, or +1. For I, 0 for all actions.
- **directSupport:** for I, the number of valid players proposing that action (0–2). For W, 0 for all actions.
- **actionTier:** RETURN_HONESTLY = 2 if legal; INSPECT_SHARED_THREAD = 2 if legal; PRESENT_EVIDENCE = 0 if legal; WAIT = 0. This makes direct confrontation a lower baseline preference unless a player input elevates it.
- **deadlineTier:** RETURN_HONESTLY gets 3 when exactly one boundary remains and it is legal; all other actions get 0. This is after mode-specific input fields, so the deadline strongly favors return without making player inputs universally inert.
- **tieBreakRank:** use the fixed test order below; it is an explicit character assumption, not a neutral truth.

**Fixed tie-break order, highest first:** RETURN_HONESTLY, INSPECT_SHARED_THREAD, WAIT, PRESENT_EVIDENCE.

This order means Jules defaults toward returning the umbrella before confronting the flatmate, and defaults to WAIT rather than presenting evidence if neither player meaningfully pushes disclosure. A direct proposal or an environmental signal may change that result. The ordering is intentionally provisional and requires sensitivity analysis.

### Resolution and state-update order for this fixture

1. Validate both submissions against the round-start snapshot.
2. For I, count valid proposal support. For W, resolve target-level influence composition and calculate temporary context signals/private-window state.
3. Generate the protagonist's legal actions from resulting state and current knowledge.
4. Rank all legal actions and execute exactly one.
5. Apply the selected action's state/event changes and explicit knowledge acquisition.
6. Apply the trust/flatmate response from §3.
7. Record objective progress while the flatmate is still present.
8. Expire temporary context signals and the private window.
9. Decrement the remaining-boundary count.
10. If the counter reaches zero, mark the flatmate departed and evaluate terminal predicates.
11. Produce player-specific views and safe explanations from resolved state/events.

This is a fixture contract only. It does not settle the production-wide resolution order for Fate, delayed effects, or multiple simultaneous terminal predicates.

## 8. Required deterministic comparison

The enumerator must test all valid paired submissions over every reachable fixture state for both models. It should report:

- Null-input diagnostic baseline, kept separate from legal live submissions.
- Full legal-action list, the rank tuple of each action, selected action, and decisive tuple field.
- Accepted/failed submissions, effect conflicts, context signals, private-window status, and state/event diff.
- Knowledge held by Jules and each player before and after each event.
- Per-round progress and terminal A/B predicates at departure.
- Whether changing either player's submission alone changes the selected action, legal action set, context, or resulting state.
- Whether A-only, B-only, and both-objective trajectories are reachable; whether any objective is impossible.
- Whether input pairs are irrelevant, always dominant, or expose an action that is effectively forced.
- Deterministic replay equality and visibility-safe explanations.

Trajectory counts are enumeration counts, not probabilities or balance scores. The enumerator cannot establish enjoyment or perceived fairness.

## 9. Test route expectations, not claimed results

These are expected mechanics to verify against the actual enumerator, not test results.

- **A-only route:** return before evidence presentation, then inspect the thread, but do not push presentation when WAIT has the better unmodified rank. A succeeds; B does not.
- **B-only route:** inspect first, then push a non-private evidence presentation before Jules acknowledges their own damage; trust falls to 0. Return at the final boundary. B succeeds; A does not.
- **Both route:** inspect first, present evidence through an active private window, then return honestly. Trust remains at baseline; both succeed.
- **Counterplay:** when return and presentation are both legal, a direct proposal for return or an environmental prominence-down signal must be able to defeat an unsupported presentation.
- **Boundary pressure:** at the final boundary, return is strongly preferred among otherwise equivalent actions, but a higher mode-specific signal/support may change the choice.
- **Conflict:** opposite prominence signals cancel. A cancel must not reveal private evidence or its content.

If any of these fail, fix the test contract or deliberately revise the intended behavior before using the comparison to select a model.

## 10. Open owner decisions and next gate

The following are not silently accepted game canon:

1. Whether direct proposals should add additive support, whether unanimous proposals should strongly override Jules's preferences, and whether PASS is the right alternative to proposing an action.
2. Whether Jules's default preference to return before presenting evidence is plausible.
3. Whether the seeded message is too conclusive for the intended mystery.
4. Whether a private window should preserve trust when disclosure precedes acknowledgement.
5. Whether three boundaries give enough space for meaningful strategic counterplay.
6. Whether environmental influence should later include persistent world-state effects beyond the current context/privacy test.

Before a playable prototype, run the deterministic enumerator and have an independent reviewer reconstruct the output from this file. Only then decide whether to build a small local comparative prototype. Human teach-back is still required before declaring either model fun, fair, or selected for the game.

The next software artifact should be an offline deterministic enumerator, not a UI, online backend, or production engine.

## 11. Authority and historical documents

This is the active working reference for the control-model experiment while the consolidation PR is in review.

- SPEC.md is the product-level draft; it does not settle this control-model decision.
- scenarios/umbrella.json remains an unresolved scenario probe, not the source of truth for this test fixture.
- INFORMATION_MODEL.md owns the vocabulary for fact, evidence, access, knowledge, belief, disclosure, visibility, and events.
- MODULE_CONTRACTS.md and ARCHITECTURE.md define logical engineering responsibilities and the comparison-harness plan.
- DECISIONS.md is the canonical decision log.
- MATCHED_MODEL_COMPARISON_01.md and PRIORITY_TABLE_REPLAY_01.md are prior authored analyses, not independent evidence.
- DIRECT_INTENTION_TRACE.md, PAPER_SIMULATION_01.md, PAPER_SIMULATION_02.md, CORE_LOOP_COMPARISON.md, and PROTAGONIST_CONTROL.md are historical explorations with older assumptions. Do not treat them as current rules when they differ from this file.

Preserve the historical reasoning, but do not maintain multiple active definitions of the fixture, action vocabulary, or selection policy.
