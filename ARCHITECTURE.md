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

**Recommendation:** use a small TypeScript/Node test harness if its domain types can be reused in a later browser prototype. Keep dependencies minimal and avoid choosing a UI framework now. A short Python probe would also be acceptable for a disposable enumeration, but do not maintain both implementations of the same rules.

The deciding criterion is not language preference. It is whether the harness is easy to audit, can enumerate all valid input pairs, and reproduces the same structured results from the same state and rules version. The selection of TypeScript here is a provisional implementation recommendation, not a decision to build the full product stack.

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

## 6. What the enumerator must measure

For every reachable state, and for every valid submission pair in each candidate mode, record:

- null-input diagnostic baseline (clearly marked non-playable);
- selected action with full rank tuple and decisive field;
- legal actions before and after environmental effects;
- effect application, cancellation, persistence, and expiry;
- whether changing Player A's input alone changes state, action, or a policy-read variable;
- whether changing Player B's input alone changes state, action, or a policy-read variable;
- reachable trajectories, repeated states, action denial, and no-op inputs;
- each player's progress and whether their terminal predicate is reachable;
- sequences that preserve or damage trust under the test hypothesis;
- facts known to each actor at every event;
- deterministic state/event equality on replay;
- dominance: an input that never helps, an input that always dominates, or a rule that collapses the two models to the same behavior.

The report should separate model behavior from tie-break bias, fixture assumptions, protagonist traits, and action cost. Identical action sequences do not prove equivalence if legal options, state transitions, information, or future reachability differ.

## 7. Validation gate before any playable prototype

Do not proceed to a UI or full game prototype until:

1. CONTROL_MODEL.md contains internally consistent submission semantics and a total selection procedure.
2. The fixture defines an evidence source that makes Player B's objective genuinely feasible.
3. Both objectives have explicit predicates and multiple reachable trajectories; objective progress is distinct from completion.
4. Every environmental effect has a precise target, precondition, result, duration/expiry, composition rule, and visible or safely hidden reason.
5. The direct and influence inputs both have non-zero sensitivity in reachable states and neither candidate is structurally null under the enumerator.
6. The independent reviewer can reproduce the enumerator's results from the specification.
7. Dominance, input sensitivity, trust ordering, objective reachability, and hidden-information behavior have been inspected.
8. Remaining owner choices—especially Jules's tie-break/personality, the trust response, and Player B's evidence objective—are explicitly accepted or changed.

Then conduct a small counterbalanced human teach-back test. A deterministic enumerator can prove properties of the coded rules, not that players will find the game fun or fair.

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

- CONTROL_MODEL.md owns the current test fixture, candidate semantics, protagonist rank policy, and comparison gates.
- MODULE_CONTRACTS.md defines logical responsibilities and input/output boundaries.
- INFORMATION_MODEL.md owns the vocabulary for facts, evidence, access, knowledge, belief, disclosure, and visibility.
- DECISIONS.md records accepted/proposed project decisions.
- scenarios/umbrella.json is still a draft design probe; it is not yet the canonical source of the repaired test fixture.
- CAUSAL_ROUTE_TRACE_01.md and related files concern the separate, unresolved escalation/Fate premise.

Do not copy the control-model rules into this document. Link to their canonical source and keep this file focused on execution boundaries and validation strategy.
