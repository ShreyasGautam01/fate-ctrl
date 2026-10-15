# Module Contracts — Proposed Logical Boundaries

**Status:** Revised architecture proposal after the control-model audit. These are logical responsibilities, not a commitment to one class per module or a production stack.  
**Primary decision reference:** CONTROL_MODEL.md. It defines the current test fixture and the two model-specific submission contracts. Those rules are still provisional.

## 1. Architecture principles

- One authoritative owner for each mutable piece of state.
- Player intentions and environmental influences are different input types; do not collapse them into a generic untyped command.
- The protagonist selector chooses an action; it does not mutate the state.
- Only the action executor and declared effect resolver may create state-changing events.
- Objective evaluation observes state/events and returns results; it does not patch world state.
- Knowledge acquisition is an explicit event, distinct from evidence existence, access, belief, and disclosure.
- Every transition is deterministic for a fixed rules version, state, and accepted input set.
- Outputs distinguish accepted, rejected, stale, and system-invalid inputs.
- Player views and reason codes are filtered by an explicit visibility policy.
- Narration and UI never act as authority for legality or outcomes.
- Keep responsibilities logically separated but combine them in code where that reduces complexity without merging ownership.

## 2. Proposed logical modules

| Module | Responsibility | Inputs | Outputs | Must not do |
|---|---|---|---|---|
| Scenario validator | Validate required facts, source IDs, action definitions, deadlines, objective predicates, and supported effect types before a run | Scenario/fixture document and rules version | Validated fixture or path-specific validation errors | Invent missing values, silently repair contradictions, or run a round |
| Canonical match state | Represent current objective world facts, knowledge, beliefs, access, relationships, resources, active effects, deadline, and terminal status | Initial fixture plus accepted transition events | Versioned canonical state | Decide action preference or infer narrative facts |
| Player-view projector | Produce each player's authorized information view | Canonical state, private objectives, visibility policy | Separate filtered views | Send hidden data to the client and rely on UI hiding it |
| Submission validator | Validate the mode-specific input shape, phase, actor, action/effect ID, target, and starting-state preconditions | State snapshot, actor, typed submission | Accepted/rejected submission with internal reason code | Apply effects or leak private state in errors |
| Control-model adapter | Translate valid inputs into the model-specific contribution: per-action support counts for direct intention, or typed environmental effects for influence | Valid submissions and shared state snapshot | Support map or validated effect set | Choose Jules's action or silently change the shared policy |
| Environmental-effect resolver | Group effects by target, resolve composition/cancellation, revalidate targets, and apply explicit state/context changes | State snapshot and validated influence set | Updated selection state, persistent state changes, ordered effect events, failures | Create unseeded facts, apply effects in arbitrary player-ID order, or grant evidence knowledge automatically |
| Legal-action generator | Derive actions Jules can perform from current state, knowledge, capability, targets, and phase | Canonical state after valid influence effects | Complete legal action set with precondition evidence | Rank actions or mutate state |
| Protagonist selector | Rank all legal actions using the same deterministic policy for both candidates; record complete ranks and decisive field | Canonical state, legal actions, mode contribution (support or context signal), policy version | Exactly one selected action plus internal decision diagnostics | Read player objectives as Jules's motives, call an LLM, or mutate state |
| Action executor | Apply the selected action's specified state changes and emit domain events | State, selected action, rule version | New state and ordered action events | Perform extra actions, infer missing evidence, or call presentation/network code |
| Knowledge and character-response processor | Apply knowledge acquisition and scenario-authored response rules from events | State and events such as evidence inspection/disclosure/return | Updated knowledge/relationship state and response events | Transfer player-only facts to Jules or let prose determine beliefs |
| Boundary processor | Expire temporary effects, advance deadline counters, process departures, and apply defined boundary order | State, resolved action events, boundary contract | Updated boundary state and events | Change ordering based on dramatic preference |
| Objective evaluator | Compute progress, completion, and terminal predicates after the declared phase | State, events, objective definitions | Per-objective progress/completion and reason codes | Award success because a submission was made or mutate game state |
| Fate planner/resolver | Later, propose and validate Fate actions through the same rules boundary | State, Fate rules/resources, eligible milestones | Candidate Fate action and supported events | Invent prerequisites or bypass the resolver |
| Event log and deterministic replay | Record commands, effect results, rank tuples, events, objective deltas, rules versions, and causal parents | Trusted resolution diagnostics/events | Replayable record and state diff | Treat narration or client-supplied events as canonical |
| Explanation/view projection | Convert internal diagnostics to audience-safe reasons and events | Internal decision record, visibility policy | Separate public/private reason projections | Reveal hidden submissions/objectives through diagnostics |
| Narration/presentation | Phrase authorized resolved events | Filtered events and style rules | Player-specific text | Change state, objective scores, knowledge, or terminal outcome |
| Transport/persistence | Optional later delivery and storage | Versioned input/results/snapshots | Durable acknowledgments | Define gameplay rules or become necessary for the first comparison |

A “module” here is a responsibility boundary. It does not imply a microservice. For a local test harness, most of these can be pure functions in one process.

## 3. Distinct submission contracts

### Direct intention

A valid direct submission is a typed protagonist-action proposal, including a stable action ID and any permitted target data. Under the current comparison contract, each legal proposal contributes one support mark to that action. The model adapter returns a support count of 0–2 for each action. It does not restrict the legal-action set and does not execute the proposal.

### Environmental influence

A valid influence is a typed effect ID plus a target ID and only the parameters allowed by the fixture. It must reference a seeded fact/entity/opportunity and declare preconditions, persistent versus temporary mutation, expiry, composition behavior, and failure behavior. The effect resolver changes state or decision context before action selection; it does not choose Jules's action.

Both types have the same number of player submissions per round in the comparison, but they do not have identical internal effects. The differences must be reported as model differences, not papered over.

## 4. Protagonist-selection contract

The protagonist selector is a missing responsibility in the earlier architecture draft and is now explicit.

- It accepts a validated state snapshot, the complete legal-action set, and a mode-specific contribution from the model adapter.
- It applies the same policy version to both candidates.
- It returns one action and a rank record for every legal action.
- The rank record contains deadline tier, scenario action tier, context signal, direct support, tie-break rank, and the first field that determined the winner.
- It does not depend on natural-language narration or directly optimize either player's objective.
- It reports when an input could not affect the outcome because a higher-ranked condition dominated it.
- A selector tie-break is explicit, stable, versioned, and included in replay diagnostics.

The provisional tuple and fixture rankings are defined in CONTROL_MODEL.md. If the project owner changes them, the change must update the fixture, enumerator expectations, and decision record together.

## 5. Resolution transaction for the comparative harness

For each round, the orchestrator calls the responsibilities in this declared order:

1. Publish round-start filtered views to the submission generator/test harness.
2. Validate each player's mode-specific submission against the start snapshot.
3. Convert valid intentions into support counts, or group/resolve valid influences against the snapshot.
4. Revalidate effect targets and apply persistent world changes in stable, documented order.
5. Generate Jules's legal actions from the resulting state and current knowledge.
6. Select one action with the shared deterministic protagonist policy.
7. Execute that action and emit its domain events.
8. Apply knowledge acquisition and deterministic character-response rules.
9. Evaluate objective progress and completion before the deadline departure boundary, as specified by the fixture.
10. Expire temporary context signals and advance the boundary.
11. Process departure and any post-boundary terminal predicates.
12. Store the state diff and internal diagnostics; derive safe player-visible explanations separately.

This is a **fixture-level test contract**, not yet the accepted global resolution order for Fate, all effects, and all game endings. Production implementation is blocked until the global contract handles Fate eligibility, expiry collisions, and simultaneous terminal outcomes.

## 6. Deterministic result envelope

The local harness should return a structured result with at least:

- rules and fixture version;
- state before and after;
- both submitted inputs and validation results;
- mode-adapter output (support map or effect outcomes);
- complete legal-action set after effect resolution;
- rank tuple for each action, winning action, and decisive rank field;
- ordered domain events and causal source IDs;
- knowledge changes and audience visibility;
- objective progress deltas and terminal predicate evaluations;
- temporary-effect expiries, deadline changes, and departures;
- diagnostic visibility classification;
- deterministic replay hash or canonical serialized state for equality checks.

Never use the player-facing prose as the test oracle. Tests compare structured state/events/reasons.

## 7. Acceptance tests before gameplay code

1. Invalid fixture data is rejected with path-specific errors.
2. Illegal, duplicate, or stale inputs follow their declared rules and cannot mutate unrelated state.
3. Both inputs are validated against the same declared snapshot.
4. Conflicting environmental signals resolve deterministically and do not delete facts/evidence.
5. Identical accepted input and rules version produce identical states, events, ranks, and objective results.
6. Every knowledge change has a documented initial grant or acquisition event.
7. The selector never chooses an illegal action.
8. A direct intention changes selection in at least one reachable state; the effect of that input is attributable to its support mark rather than a coincidental state difference.
9. Each environmental influence has at least one reachable state where it changes legal options, a policy-read variable, or the selected action.
10. The null-input baseline is diagnostic only; exhaustive enumeration includes all valid input pairs.
11. Both objective predicates are reachable in multiple trajectories under the test fixture, and the trust/order trade-off is enumerated.
12. A reviewer can reconstruct chosen actions, state changes, knowledge, and objectives from the structured record without relying on prose.
13. Player-facing explanations do not leak private objectives, source contents, or opponent input before the rules allow it.
14. Narration failure cannot change outcomes.

## 8. Out of scope for this architecture pass

No UI, browser rendering, authentication, Supabase, network/reconnect protocol, production persistence, Fate intervention implementation, generative narration, or scalable scenario scripting. First use the harness to determine whether the two control inputs have meaningful, non-dominated effects and whether objectives are reachable. Expand the architecture only when an experiment requires it.
