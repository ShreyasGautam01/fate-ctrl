# FATE/CTRL — Architecture Options

**Status:** Provisional. Architecture follows validated gameplay needs.

The data/visibility vocabulary in INFORMATION_MODEL.md is a required design input: canonical state and filtered player views must not be conflated. The proposed architecture remains provisional until gameplay and information rules are validated.

## 1. Candidate flow
Player input → command validation → round coordinator → deterministic resolution → canonical state and domain events → objective evaluation → filtered player view → narration/presentation.

Fate proposes legal interventions to the same resolution system; it has no privileged state-mutation path. Scenario data defines facts, objectives, supported conditions/effects, Fate routes, and endings. A validator checks it before a match starts.

## 2. Runtime options
- **TypeScript/browser:** shared language for engine and UI, mature test tooling, natural path to web play.
- **Python simulation:** rapid strategy/balance experiments, but likely requires a separate web client if browser play is selected.
- **Game engine:** worth considering if rich animation or real-time mechanics become central.

**Provisional direction:** simulate the rules first; tentatively use TypeScript for a thin browser prototype if the selected loop remains turn/round-based and text-forward. Do not choose a UI framework yet.

## 3. Local versus online
- Local/pass-and-play is fast to test but weak for hidden information and social dynamics.
- Online play better supports rivalry but adds identity, persistence, synchronization, reconnect, cheating, and privacy work.
- A local simulation harness can test many strategies regardless.

**Provisional direction:** first validate rules through simulation and paper play. Then decide whether online interaction is essential to test the core fun. Do not add accounts, Supabase, or realtime networking before justified by evidence.

## 4. Scenario representation
- Hard-coded scenarios start quickly but mix content and engine logic.
- Versioned JSON with a small explicit vocabulary is inspectable and testable.
- A general-purpose narrative language is expressive but expensive to implement, debug, and validate.

**Provisional direction:** versioned JSON for facts, objectives, simple conditions/effects, Fate routes, and endings. Add scripting only if a second scenario demonstrates a concrete need.

## 5. Narration
- Templates are predictable and inexpensive but may repeat.
- Deterministic text assembly adds flexibility while remaining testable.
- Optional LLM narration offers variation but adds cost, latency, privacy, contradiction, and consistency risks.

**Provisional direction:** structured events and authored/assembled text first. If an LLM is explored later, it consumes resolved events and returns untrusted presentation text only.

## 6. State and persistence
In-memory state is simplest for a prototype; snapshots plus events aid replay/debugging; full event sourcing adds complexity.

**Provisional direction:** pure or near-pure state transition/resolution functions that return events, even if the prototype stores state in memory. Add durable history when needed; do not adopt full event sourcing by default.

## 7. Engine properties
- Deterministic order and explicit tie-break rules.
- No UI/network/text-generation calls inside the resolution engine.
- Stable entity IDs and typed references.
- Scenario validation before match start.
- Versioned scenario format and rule semantics.
- Structured errors instead of silent coercion.
- Explicit visibility filtering.
- Replayable fixture for every discovered bug.

## 8. Online requirements if approved
The server is authoritative. Clients submit commands, never replacement state. Commands use idempotency keys and expected state/phase versions. Validate and resolve safely under concurrency. Filter player views server-side.

Supabase may suit authentication, storage, and realtime delivery, but is not selected. Realtime transport alone does not guarantee correct state transitions, access policies, duplicate handling, or conflict resolution.

## 9. Security and trust boundaries
Treat client commands and scenario uploads as untrusted. Do not trust client clocks for deadlines. Never expose hidden facts in shared responses. Keep service-role keys out of browser code. Bound scenario size and trigger depth. Narration cannot mutate state. Log enough for debugging without leaking private information.

## 10. Quality strategy
Unit tests for legality, transitions, objectives, Fate decisions, and expiry; invariant/property tests for impossible states and duplicate commands; scenario validation; seeded strategy simulations; integration tests for phase flow and visibility; usability tests for comprehension, agency, pacing, and causality.

## 11. Architecture decision gates
Do not commit to a UI framework or online backend until the round model and actions are specified, a minimal engine can simulate several rounds, module contracts are testable, and playtests show the loop is worth continuing. Optimize first for correctness, observability, and ease of changing rules, not hypothetical scale.
