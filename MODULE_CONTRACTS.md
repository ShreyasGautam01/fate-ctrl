# Module Contracts — Proposed Boundaries

**Status:** Logical boundaries, not a commitment to particular classes, files, or framework.

## Principles
- One authoritative owner for each mutable piece of state.
- Explicit, validated inputs and versioned persisted contracts.
- Outputs distinguish success, rejection, and system failure.
- Modules do not bypass the rules engine to mutate shared state.
- Derived data is recomputed or has a documented consistency rule.
- Any randomness is seeded and recorded for replay.
- Presentation text is never parsed as authoritative game data.

## Proposed modules

| Module | Responsibility | Inputs | Outputs | Must not do |
|---|---|---|---|---|
| Scenario loader/validator | Decide whether scenario data is valid and supported | Scenario document and schema/rules version | Validated scenario or path-specific errors | Silently repair data or run turns |
| Match state | Represent what is true now | Initial scenario and accepted events | Canonical state and version | Decide what actions mean |
| Action validator | Check action legality in current state | State, actor, action | Valid/invalid plus reason code | Apply side effects or leak hidden data |
| Round coordinator | Decide which inputs are due and when resolution occurs | Phase, submissions, deadlines | Ready batch or phase transition | Invent gameplay outcomes |
| Resolution engine | Resolve accepted actions deterministically | State, ordered/committed actions, rules version | New state and ordered events | Call UI/network/narration |
| Fate planner | Propose a legal Fate intervention | State, scenario rules, Fate resources | Candidate action and rationale code | Bypass validation or rewrite history |
| Objective evaluator | Calculate progress and terminal conditions | State and objective definitions | Progress and terminal outcome | Mutate state or judge narrative tone |
| Event log/replay | Record what happened and why | Accepted commands, domain events, versions | Ordered history and replay data | Trust client-generated events |
| Narration/presentation | Explain resolved events to an audience | Authorized events and style rules | Player-specific text | Change state or reveal hidden information |
| Interface | Show the player's view and collect commands | Filtered view model and legal actions | Player command submissions | Be authoritative for legality/outcomes |
| Persistence/transport | Store and synchronize matches if needed | Versioned commands/events/snapshots | Durable records and acknowledgements | Define gameplay rules |

## Conceptual action command
A submitted command should identify match, actor, idempotency key, expected phase/state version, action type, typed target/payload, and optionally a client timestamp for diagnostics. The trusted host validates identity, phase, payload, target, and version. A stale command is rejected or explicitly revalidated; it is never silently applied to an unrelated state.

## Conceptual resolution result
Return accepted/rejected command outcomes, new canonical state version, ordered domain events, costs and expiry changes, objective progress, terminal status, player-specific filtered projections, and stable reason codes.

## Conceptual domain event
Each event needs a stable type, schema version, causal source, relevant entity IDs, effect data, and visibility policy. Ordering must be deterministic for the same accepted input and rules version.

## Player view
A player view is a filtered projection, not the full canonical state. Include visible facts, allowed private information, current phase, legal action descriptions, threat signals, and explanatory recent events. Do not send hidden facts to the client and rely on UI hiding them.

## Questions before implementation
- Is Fate evaluated before, between, or after player actions?
- Are objectives evaluated per event, per resolution, or both?
- In-memory state, snapshots plus events, or event-sourced state?
- What operations require an atomic server transaction if online play is selected?
- How are private objectives protected from logs, errors, and timing leaks?
- At which exact boundary do delayed effects expire?
- Which reason codes make failed actions understandable?

## Minimum contract tests
1. Invalid scenario data is rejected with path-specific errors.
2. Illegal actions do not mutate state.
3. Identical state and accepted input produce identical resolution.
4. Duplicate command IDs cannot apply an action twice.
5. Stale versions are handled explicitly.
6. Unauthorized player views omit hidden facts.
7. Every state change has a causal event or documented deterministic derivation.
8. Delayed effects expire at the specified boundary exactly once.
9. Terminal conditions behave consistently when multiple goals complete together.
10. Narration failure does not alter resolved state.
