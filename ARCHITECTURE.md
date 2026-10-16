# FATE/CTRL — Architecture Proposal

**Status:** Revised after the control-model audit. This defines the next experimental architecture, not the final production stack.  
**Primary control contract:** CONTROL_MODEL.md.  
**Detailed logical responsibilities:** MODULE_CONTRACTS.md.  
**Implementation status:** no gameplay code or comparative enumerator exists yet.

## 1. Architectural decision: test the rule system before building the game

The Sonnet audit identified that the previous paper comparison could not establish that either player input caused the outcome. The next technical artifact should therefore be a **local deterministic enumerator**, not a UI or online game.

The enumerator is a small model-testing tool. It should enumerate states and input pairs, produce structured outcomes, and expose where one control model is irrelevant, dominant, impossible to use, or objective-breaking. It is not the playable game and should not include networking, persistence, or narration.

### Candidate comparison pipeline

1. Load one versioned test fixture and validate required world facts, knowledge, action definitions, objectives, and deadlines.
2. Build canonical initial state and per-player filtered views.
3. Enumerate legal input pairs for the chosen model: direct action proposals or environmental influences.
4. Validate both inputs against one declared round-start snapshot.
5. Resolve direct support marks or typed environmental effects. Resolve conflicts by the declared target-level rule, not iteration order or player identity.
6. Generate Jules's legal actions from the resulting state.
7. Apply the same protagonist-selection policy and retain every action's complete rank tuple.
8. Execute one action, apply knowledge acquisition and fixture character responses, evaluate objectives, and advance the deadline using the declared fixture order.
9. Save the state diff, events, objective status, input sensitivity, and visibility-filtered result.
10. Repeat across reachable states and compare trajectories across models.

This pipeline deliberately separates input interpretation from protagonist choice. Direct intentions and environmental influences have different semantics, but neither gets to bypass the same legal-action generator or authoritative state-transition boundary.

## 2. Minimal software boundary

Use pure or near-pure functions for the core. A conceptual interface is:

- `validateFixture(fixture) -> validationResult`
- `validateSubmission(stateSnapshot, playerId, submission, model) -> acceptedOrRejected`
- `resolveModelInputs(stateSnapshot, validSubmissions, model) -> selectionContextAndEvents`
- `getLegalActions(stateAfterEffects, protagonistKnowledge) -> legalActions`
- `selectProtagonistAction(state, legalActions, selectionContext, policyVersion) -> actionAndRankDiagnostics`
- `applyProtagonistAction(state, action) -> nextStateAndEvents`
- `applyKnowledgeAndCharacterResponses(state, events) -> nextStateAndEvents`
- `evaluateObjectives(state, events, objectiveDefinitions) -> objectiveResults`
- `advanceFixtureBoundary(state) -> nextStateAndEvents`
- `resolveFixtureRound(state, submissions, model, fixture, rulesVersion) -> structuredRoundResult`

These are conceptual boundaries, not an instruction to create a large class hierarchy. The outer round function orchestrates them in one deterministic order. Every function that can alter state must return a new state or an explicit state transition; it must not silently mutate unrelated fields.

## 3. Language and testing approach

**Current test-harness choice:** Python 3 with the standard library, implemented in `tools/control_model_enumerator.py`. The reason is scope: the game runtime language has not been selected, but the current need is a finite-state design experiment with no UI and no third-party dependency. The enumerator reads its values from `scenarios/control_model_test_fixture.json` rather than maintaining a second hard-coded copy of the fixture.

Do not build a parallel TypeScript version of this enumerator. After the control-model gate passes, either discard/archive the tool or port the accepted rule contract into the selected runtime with behavioral tests. A future browser game may still use TypeScript; that is a separate decision from the language used for this temporary research harness.

## 4. Canonical data boundaries

The harness must distinguish:

- objective world facts and mutable conditions;
- evidence items and their content;
- access to an evidence item;
- character knowledge;
- each player's information;
- character belief/suspicion;
- persistent world effects;
- temporary decision-context signals;
- current legal actions;
- submitted intentions or influences;
- protagonist decision diagnostics;
- resolved events and objective results;
- player-visible explanations.

Do not combine these into a `photoFound` flag or a generated prose string. The authoritative record consists of state, structured events, rule/version identifiers, and explicit knowledge transitions. Player screens, diagnostic output, and narration are projections of that record.

## 5. Resolution boundaries for the test fixture

CONTROL_MODEL.md defines the current fixture order. For clarity, the enumerator should implement these as explicit phases:

1. start-of-round snapshot;
2. input validation;
3. model-adapter resolution;
4. environmental effect composition/revalidation, where applicable;
5. legal-action generation;
6. protagonist selection;
7. selected-action execution;
8. knowledge updates and deterministic character response;
9. objective evaluation while the flatmate is still present;
10. temporary signal expiry;
11. boundary decrement and departure;
12. terminal status and filtered result projections.

This order is only for the comparative fixture. Fate is absent. It does not settle the production-wide rule order for Fate, effect expiry collisions, or multiple terminal predicates; those remain a separate contract gate.

## 6. What the enumerator measures now—and what remains

The implemented harness exhaustively enumerates legal paired submissions over reachable nonterminal states for both candidates and records:

- the legal PASS/PASS baseline and conditional input-sensitivity tests that hold the opponent's input fixed;
- legal actions, every rank tuple, selected action, runner-up, and the first rank field separating them;
- direct support or resolved influence effects/signals, private-window status, action events, and the before/after canonical state;
- objective completion at the departure boundary, terminal outcome sequence counts, and sample A-only, B-only, and joint-success paths;
- deterministic replay and explicit tests for invalid inputs, influence cancellation, and objective routes.

Counts are enumerated input sequences and transition evaluations, not probabilities or balance scores. Legal option sets vary by state, so raw terminal sequence counts cannot be interpreted as win odds.

**Not yet covered:** a real per-player view projection, visibility-leak testing, public/private reason-code filtering, network retries/stale entity IDs, Fate, and any claim about fun or perceived fairness. Those remain separate validation work. Identical selected-action sequences do not prove equivalence if legal options, state transitions, information, future reachability, or counterplay differ.

## 7. Validation gate before any playable prototype

The current execution passes only a **structural-enumeration checkpoint**, not the prototype gate. Before any playable prototype:

1. Have an independent reviewer reconstruct the enumerator's selected actions and outcome paths from CONTROL_MODEL.md plus the JSON fixture.
2. Review owner-sensitive assumptions: direct-intention support semantics, whether the seeded message is too conclusive, Jules's tie-break preference, and the trust/private-window response.
3. Inspect the conditional-sensitivity tables, effect cancellation behavior, objective reachability, and whether either input type is dominant or irrelevant in particular states.
4. Decide if the narrow W influence set is meaningfully distinct from I, rather than merely a different interface for steering the same action.
5. Add the missing player-view/visibility tests before any UI or network work.
6. Only after the independent reconstruction agrees with the implementation, consider a tiny local comparative prototype.

Then conduct counterbalanced human teach-back sessions. The enumerator can establish properties of its coded rules; it cannot show that players will find the game fun, fair, understandable, or worth replaying.

## 8. Later architecture options

Only after the loop survives the prior gates should the project decide whether to add:

- a minimal browser UI;
- local/pass-and-play or online multiplayer;
- persistence and reconnect support;
- server-authoritative command processing;
- a richer scenario validator;
- deterministic narration templates;
- optional, non-authoritative LLM presentation.

A browser/TypeScript path remains plausible for a short text-forward game. Supabase, authentication, realtime updates, an LLM API, and a generalized narrative scripting language are not needed to test the current control-model question.

## 9. Security and observability constraints for later work

Treat client input and scenario uploads as untrusted. Keep canonical state server-side if online play is ever added. Filter private information before transmission rather than in the UI. Use stable entity/action IDs, explicit phase/state versions, idempotency keys for network commands, and deterministic replay records. Store enough diagnostics to explain a result but never leak private objectives or hidden facts.

## 10. Ownership and related references

- CONTROL_MODEL.md owns the decision rationale, control-model semantics, and validation gates.
- `scenarios/control_model_test_fixture.json` is the machine-readable source of truth for this experiment's exact world facts, initial state, objective predicates, trust hypothesis, influence configuration, and rank/tie-break values.
- `tools/control_model_enumerator.py` executes the small finite-state model; `tests/test_control_model_enumerator.py` tests its structural properties.
- MODULE_CONTRACTS.md defines logical responsibility and input/output boundaries.
- INFORMATION_MODEL.md owns the vocabulary for facts, evidence, access, knowledge, belief, disclosure, and visibility.
- DECISIONS.md records accepted/proposed project decisions.
- scenarios/umbrella.json remains a separate draft story probe; it is not the machine source for this control-model experiment.
- CAUSAL_ROUTE_TRACE_01.md and related files concern the separate, unresolved escalation/Fate premise.

Do not copy numeric fixture/policy values into this document. Link to the JSON source of truth and keep this file focused on semantics, trade-offs, and validation.
