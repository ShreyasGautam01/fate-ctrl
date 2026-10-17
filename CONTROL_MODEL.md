# Control Model — Revised Test Contract 0.4

**Status:** Provisional comparison contract after deep audit; not accepted production rules.  
**Decision owner:** Project owner.  
**Evidence class:** Sonnet 5.5 audit plus an executed deterministic enumerator and automated tests. No independent human playtest is claimed.  
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

The executable values for this comparison live in [scenarios/control_model_test_fixture.json](scenarios/control_model_test_fixture.json). **That JSON is the machine-readable source of truth** for the fixture ID/version, world facts and evidence text, player-knowledge notes, initial state, round count, action definitions and proposal eligibility, influence targets/signals/preconditions, effect composition, ranking order/tie-break values, objective predicates, and the test-only trust-response hypothesis.

The enumerator loads this file directly. It validates basic consistency (round count versus initial countdown, initial trust versus relationship-response configuration, ranking fields, action/tie-break coverage, influence targets/signals, and recognized preconditions) before enumeration. Do not create a second executable copy of those values. If the Markdown explanation and JSON disagree, stop and reconcile them rather than guessing which value to trust.

The fixture is **not accepted story canon**. It models two distinct condition events: a loose rib predates the loan, and Jules later worsens a tear. The seeded thread contains a dated photo and an explicit message about prior knowledge/nondisclosure. Player B knows the relevant message is in the thread, but neither player's knowledge transfers to Jules. The flatmate is reachable until after Jules's action on the final boundary. The test excludes Fate and any public emergency.

The test objectives are deliberately concrete: A needs an honest return and trust at baseline; B needs inspection, evidence presentation, and acknowledgement of the flatmate's prior knowledge. The seeded message makes B's route possible without allowing an influence to invent evidence. Inspection, disclosure, and objective completion remain separate events.

The trust response is intentionally strong and artificial: premature non-private evidence presentation lowers trust; presentation after acknowledgement or through a private window preserves it. The exact values and predicates are defined in the JSON and need owner approval before they can be promoted to scenario canon.

**Scope limitation:** the enumerator uses player-knowledge metadata to document the intended information split, but it does not yet implement a player-view UI or prove the absence of every visibility leak. That requires a separate view/projection test before multiplayer implementation.

## 4. Legal protagonist-action vocabulary

The JSON fixture defines the executable action identifiers, proposal eligibility, action tiers, preconditions, effects, and actions' non-effects. The current finite vocabulary is:

- **INSPECT_SHARED_THREAD:** inspect the accessible thread; Jules learns the photo's visible condition and the seeded message content. It does not disclose evidence.
- **PRESENT_EVIDENCE:** present an already-inspected message to the reachable flatmate; the fixture records acknowledgement of the prior-knowledge claim and applies its trust-response rule. It does not return the umbrella.
- **RETURN_HONESTLY:** return the umbrella and acknowledge Jules's later damage. It does not repair trust already lost.
- **WAIT:** a legal protagonist fallback that changes no protagonist state; the boundary still advances.

Each selected action consumes Jules's one major action for the round. Legal actions are generated from canonical state and knowledge after environmental effects resolve. No action may create unseeded evidence or invent facts. The code implements these named transitions; changing an action's semantics requires updating the implementation and tests as well as the fixture/document.

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

The JSON fixture contains the allowed W input IDs and their mechanical definitions. The current set is deliberately small:

- **PASS:** consume the submission slot without applying a specific influence.
- **THREAD_UP / THREAD_DOWN:** set a temporary positive/negative selector signal for inspecting the uninspected thread.
- **EVIDENCE_UP / EVIDENCE_DOWN:** set a temporary positive/negative selector signal for presenting inspected evidence.
- **OPEN_PRIVATE_WINDOW:** open the seeded private-conversation opportunity for the current action/response step and add its configured presentation signal.

The influence resolver validates each submission against the same round-start snapshot, groups effects by target, cancels opposed signals, caps repeated same-direction signal values, and applies the private-window bonus with the JSON-configured clamp. Temporary signals and the private window expire after the current action/response step; none transfers evidence to Jules. A stale/ineligible effect fails without changing state/context and consumes its submission slot for this test.

These definitions test whether indirect context changes can steer the common action selector. They do not claim that this is the best final environmental-control vocabulary. A new influence type or precondition must be supported explicitly by the fixture, resolver, and tests; a prose-only effect is not a mechanic.

## 7. Shared deterministic protagonist-selection policy

The policy runs the same way in both candidates. The active input channel differs: direct support for I, context signal for W. Player objectives never appear directly as Jules's motivation.

### Legal-action generation

Generate the full set from §4 using post-influence state and Jules's current knowledge. WAIT is always available. A proposal or influence does not make an otherwise illegal action legal, except that an explicit seeded access/knowledge effect would have to be separately defined; none exists in this fixture.

### Rank procedure

The exact rank-field order, action tiers, deadline tier, and stable tie-break order are configuration in the JSON fixture, not duplicated constants in this Markdown. The current selector compares, lexicographically, the configured values for context signal, direct-intention support, action tier, deadline tier, and tie-break rank.

Direct-intention mode supplies support counts; environmental-influence mode supplies context signals and any private-window state. The same configured ranking policy then selects from the complete legal-action set in both models. No player objective is an input to Jules's preference ranking.

The enumerator records the full rank tuple for every legal candidate, selected action, runner-up, and first rank field separating the winner from the runner-up. The tie-break is an explicit authored preference, not a neutral truth: it must be sensitivity-tested and is not accepted characterization. The JSON is authoritative for numeric values and tie order.

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

The enumerator tests valid paired submissions over every reachable nonterminal fixture state for both models. It reports:

- The legal PASS/PASS baseline and comparisons that change one player's input while holding the opponent's input fixed.
- The full legal-action list, every candidate's rank tuple, selected action, runner-up, and first rank field that separates them.
- The validated input pair, resolved influence effects/conflicts, context signals, private-window status, and state/event diff.
- Explicit protagonist knowledge-acquisition events and the resulting state.
- Terminal A/B predicates and sample A-only, B-only, and joint-success paths.
- Whether changing either player's input can change the selected action or persistent state; conditional input-sensitivity counts by submission type.
- Whether each objective and both objectives together are reachable in the fixture.
- Deterministic replay and selected invalid-input cases.

**Not yet implemented:** player-specific view generation, visibility-leak testing, public/private reason-code projection, stale entity-ID handling, network retries, Fate interactions, and a general explanation system. These are not claimed as validated by this enumerator and remain blockers before any multiplayer implementation.

Trajectory counts are counts of legal input sequences under state-dependent option sets—not probabilities, win rates, or balance scores. The enumerator cannot establish enjoyment or perceived fairness.

## 9. Test route expectations, not claimed results

The enumerator's unit tests now verify the following fixture mechanics. These are executed rule checks, not playtest findings.

- **A-only route:** return before evidence presentation, then inspect the thread, but do not push presentation when WAIT has the better unmodified rank. A succeeds; B does not.
- **B-only route:** inspect first, then push a non-private evidence presentation before Jules acknowledges their own damage; trust falls to 0. Return at the final boundary. B succeeds; A does not.
- **Both route in I:** inspect, return honestly, then present evidence after acknowledgement; both succeed. **Both route in W:** use THREAD_UP to inspect, OPEN_PRIVATE_WINDOW to present privately, then return honestly; both succeed.
- **Counterplay:** when return and presentation are both legal, a direct proposal for return or an EVIDENCE_DOWN influence must be able to defeat an unsupported presentation.
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

The deterministic enumerator and its current unit tests have been executed. Next, have an independent reviewer reconstruct the selected actions and objective paths from the JSON fixture, policy contract, and report. Correct any discrepancies before considering a local comparative prototype. Human teach-back is still required before declaring either model fun, fair, or selected for the game.

The offline deterministic enumerator exists at `tools/control_model_enumerator.py` and reads `scenarios/control_model_test_fixture.json`. Twelve standard-library unit tests pass on the current working copy. Aggregate results are recorded in `reports/control_model_enumerator_summary.json`. The counts are not probabilities or balance scores. The code is a test harness, not a UI, online backend, or production engine; an independent code/fixture audit and reconstruction are still required.

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
