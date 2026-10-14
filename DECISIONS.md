# Decision Log

Statuses: **Proposed** = candidate, not binding; **Accepted** = approved for current phase; **Superseded** = replaced; **Rejected** = considered and declined.

## D-001 — Deterministic authoritative rules
- **Status:** Proposed.
- **Context:** Strategic trust depends on fair, explainable outcomes.
- **Candidate:** Only explicit rules and validated actions change authoritative state; narration cannot alter outcomes.
- **Alternatives:** Let a generative model determine outcomes or mix model judgment with rules.
- **Rationale:** Improves fairness, replayability, tests, debugging, and cost control.
- **Trade-offs:** Scenario rules need structure; early prose may be less varied.
- **Revisit trigger:** A tested prototype demonstrates a specific safe need that current presentation cannot satisfy.

## D-002 — Delay paid LLM dependency
- **Status:** Proposed.
- **Candidate:** Use structured events and deterministic presentation first.
- **Alternatives:** Generate the story or legal actions on every turn.
- **Rationale:** Reduces cost, latency, inconsistency, privacy exposure, and test complexity.
- **Trade-offs:** Requires authored content and event-to-text templates.
- **Revisit trigger:** Playtests demonstrate a specific narration limitation generation could solve safely.

## D-003 — Validate gameplay before selecting full stack
- **Status:** Proposed.
- **Candidate:** Simulate rules first; tentatively use TypeScript for a small browser prototype if suitable.
- **Alternatives:** Build an online full-stack implementation immediately or commit to a game engine now.
- **Rationale:** Turn structure determines actual infrastructure needs.
- **Trade-offs:** Early prototype may be throwaway/minimal.
- **Revisit trigger:** Interaction model and playtest goals are settled.

## D-004 — Data-driven but deliberately limited scenarios
- **Status:** Proposed.
- **Candidate:** Versioned JSON with a small explicit vocabulary of conditions/effects.
- **Alternatives:** Hard-code scenarios or build a general-purpose narrative DSL.
- **Rationale:** Balances inspectability, validation, reuse, and scope.
- **Trade-offs:** Rule vocabulary must be explicit and carefully extended.
- **Revisit trigger:** A second scenario cannot be expressed clearly or the schema becomes awkward.

## D-005 — Online play not yet approved
- **Status:** Proposed.
- **Candidate:** Test core mechanics locally/simulated, then decide whether network play is essential.
- **Alternatives:** Build accounts, database, realtime synchronization, and reconnect now.
- **Rationale:** Avoid infrastructure before the loop is proven.
- **Trade-offs:** Local tests may miss social deception dynamics.
- **Revisit trigger:** A core playtest question cannot be answered locally.

## D-006 — Umbrella scenario is a design probe
- **Status:** Proposed.
- **Candidate:** Use the premise to test causal escalation and objective conflict, but allow revision/replacement.
- **Alternative:** Lock story and build engine around it.
- **Rationale:** Mechanics should not be constrained by an untested premise.
- **Trade-offs:** Scenario names and details may change.
- **Revisit trigger:** Paper play reveals contrivance, shallow strategy, or poor generality.

## D-007 — Do not lock the umbrella escalation yet
- **Status:** Proposed.
- **Context:** The citywide-emergency ending has no established causal bridge from the interpersonal opening.
- **Candidate:** Keep the premise as a probe; compare three causal architectures before selecting a route, and revise the ending if none survives scrutiny.
- **Alternatives:** Invent a direct causal power for the umbrella or force a fixed sequence of escalating coincidences.
- **Rationale:** Protects causal coherence and player counterplay; keeps Fate from creating unsupported facts.
- **Cross-system effects:** Scenario schema, Fate milestone prerequisites, evidence/knowledge model, objective fairness, and authored narration all depend on the route.
- **Revisit trigger:** A route has explicit actors, facts, evidence, timing, interventions, and a credible non-Fate branch.

## D-008 — Keep truth, evidence, knowledge, belief, and disclosure separate
- **Status:** Proposed.
- **Context:** Hidden-information play becomes inconsistent if one flag represents whether a fact is known or revealed.
- **Candidate:** Use distinct canonical concepts and trusted player-specific projections as outlined in INFORMATION_MODEL.md.
- **Alternatives:** Track only whether a fact is revealed; let narration imply what characters know.
- **Rationale:** Supports fair information play, deterministic objectives, visibility security, and causal replay.
- **Trade-offs:** More state transitions and explicit evidence/knowledge rules.
- **Revisit trigger:** A complete scenario chain shows that a simpler representation preserves all required distinctions.

## D-009 — Do not treat the first paper simulation as playtest evidence
- **Status:** Proposed.
- **Context:** PAPER_SIMULATION_01.md was authored analytically, not played by independent humans.
- **Candidate:** Use it to discover contradictions and design questions, then validate candidates through adversarial scenario tests and later human playtests.
- **Alternatives:** Select a model from the authored trace alone.
- **Rationale:** Prevents false confidence from self-generated examples.
- **Trade-offs:** Slower progression to implementation.
- **Revisit trigger:** Not applicable; human playtest results should supplement, not erase, the limitation.

## Decision template
### D-XXX — Title
- Status:
- Context:
- Decision:
- Alternatives considered:
- Evidence and rationale:
- Cross-system effects:
- Trade-offs and risks:
- Dependencies:
- Revisit trigger:
