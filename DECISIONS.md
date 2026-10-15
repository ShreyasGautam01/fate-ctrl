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

## D-010 — Treat resolution order as a global contract
- **Status:** Proposed for testing, not accepted.
- **Context:** Compatible effects, conflicts, stale targets, deadlines, protagonist response, information acquisition, and Fate eligibility can interact in the same round.
- **Candidate:** Define a single documented phase order and test boundary collisions. PAPER_SIMULATION_02.md uses one provisional ordering to make edge cases concrete.
- **Alternatives:** Resolve effects ad hoc by scene or let narration decide what happens next.
- **Rationale:** A stable order supports deterministic outcomes, replay, fair expectations, and testable event logs.
- **Trade-offs:** Any chosen order privileges some timing strategies and may require clear UI cues.
- **Cross-system effects:** Round coordinator, action validator, resolution engine, deadlines, objective evaluator, Fate planner, knowledge updates, event log, narration.
- **Revisit trigger:** Independent reviewers identify a fairness problem or a different ordering produces a clearly better play experience.

## D-011 — Separate objective progress from objective success
- **Status:** Proposed.
- **Context:** Creating an opportunity or discovering evidence does not necessarily accomplish a player's stated goal.
- **Candidate:** Define each objective through a human goal, progress events, terminal predicate, partial outcome, counterplay, feasibility paths, and exploit checks.
- **Alternatives:** Award success for any progress signal or use one aggregate score without explicit semantics.
- **Rationale:** Prevents misleading feedback and supports compatible goals, partial outcomes, and post-game explanations.
- **Trade-offs:** More explicit scenario authoring and validation.
- **Cross-system effects:** Objective evaluator, scenario schema, UI, event log, end states, playtest metrics.
- **Revisit trigger:** A simpler objective representation proves equally clear in a complete scenario.

## D-012 — Reconsider the literal citywide-emergency target
- **Status:** Open.
- **Context:** Current causal candidates do not credibly establish that the umbrella dispute causes a citywide catastrophe.
- **Candidate:** Investigate a pre-existing public emergency with Jules becoming the wrongly blamed face of a consequential local failure.
- **Alternatives:** Preserve the literal citywide catastrophe and find a stronger mechanism; choose a smaller public incident; replace the scenario entirely.
- **Rationale:** Protects causality and makes Fate's goal about controllable public attribution rather than magical catastrophe generation.
- **Trade-offs:** A smaller target may reduce spectacle; a larger target may require more worldbuilding and longer play.
- **Cross-system effects:** Scenario premise, Fate milestones, public claims, evidence provenance, player counterplay, finale pacing.
- **Revisit trigger:** A complete route trace demonstrates a believable causal bridge and several meaningful interventions.

## D-013 — Compare pure control models before proposing a hybrid
- **Status:** Proposed.
- **Context:** Direct intentions are immediately legible but may create a single-action bottleneck; environmental influence can let both players contribute but may feel indirect. The Sonnet audit found that earlier traces did not prove either input changed Jules's outcome.
- **Candidate:** Use CONTROL_MODEL.md as the single active comparison contract. Compare direct support marks and typed environmental effects on a shared fixture with one protagonist policy. MODEL_COMPARISON_SCORECARD.md remains a supporting criteria history, not the authority for current submission semantics.
- **Alternatives:** Select the intuitively clearer model immediately or combine the models to inherit their apparent strengths.
- **Rationale:** A hybrid adds action types, cognitive load, and resolution rules; it should solve a demonstrated problem, not merely look comprehensive. A model whose inputs have no effect is not a viable control unit.
- **Trade-offs:** More explicit test semantics are needed before prototyping; current fixture/policy values remain provisional.
- **Cross-system effects:** Player action vocabulary, protagonist agency, objective feasibility, information visibility, UI, action economy, scenario authoring, resolution engine, and test suite.
- **Revisit trigger:** Deterministic enumeration and independent review establish each model's input sensitivity, reachable objectives, and non-dominated choices; human testing then assesses agency, legibility, cognitive load, and fun.

## D-014 — Use a deterministic enumerator before a playable prototype
- **Status:** Proposed.
- **Context:** The current model traces were author-generated and contained null-control, policy-ordering, objective-feasibility, and fixture inconsistencies. Building a UI now would hide rather than solve these rule defects.
- **Candidate:** Build a small offline enumerator that runs all valid submission pairs over reachable fixture states for both control models, using the same scenario and protagonist-selection policy. It reports legal actions, ranks, selected actions, state/event diffs, objective reachability, input sensitivity, and deterministic replay.
- **Alternatives:** Continue only prose simulation; build a browser prototype before semantics are specified; or implement one chosen model immediately.
- **Rationale:** Exhaustive small-state analysis can expose irrelevant or dominant inputs and impossible objectives before human playtest time is spent. It is a test harness, not the game.
- **Trade-offs:** The harness will validate only the coded fixture and rules; it cannot establish fun, perceived fairness, or narrative quality.
- **Cross-system effects:** CONTROL_MODEL.md, scenario validation, protagonist selection, action contracts, objective evaluator, event log/replay, later prototype tests.
- **Revisit trigger:** An independent reviewer can reconstruct its results from the specification and all test gates in ARCHITECTURE.md pass. Human teach-back is still required before selecting a model for the actual game.

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
