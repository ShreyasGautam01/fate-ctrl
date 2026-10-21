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
- **Status:** Proposed; initial Python enumerator and 11 unit tests now execute locally.
- **Context:** Earlier model traces were author-generated and contained null-control, policy-ordering, objective-feasibility, and fixture inconsistencies. Building a UI first would hide rather than solve those rule defects.
- **Candidate:** Use scenarios/control_model_test_fixture.json plus one standard-library Python enumerator to run all valid paired submissions over reachable states for both models. The output records rank tuples, selected actions, state/events, objective reachability, conditional input sensitivity, and replay.
- **Alternatives:** Continue only prose simulation; build a browser prototype before semantics are specified; or implement one chosen model immediately.
- **Rationale:** Exhaustive small-state analysis can expose irrelevant/dominant inputs and impossible or narrow objective routes before human playtest time is spent. It is a test harness, not the game.
- **Trade-offs:** The harness validates only its encoded fixture and rule contract; it cannot establish fun, perceived fairness, visibility security, or narrative quality.
- **Cross-system effects:** CONTROL_MODEL.md, the machine fixture, protagonist selection, action contracts, objective evaluator, event log/replay, and later prototype tests.
- **Revisit trigger:** An independent reviewer reconstructs its results and the open fairness signals are explained. Human teach-back is still required before selecting a model.

## D-015 — Build a bounded comparison prototype before model selection
- **Status:** Accepted for the comparison experiment at the time; D-017 later selects direct-action as the game direction. The fixture's detailed resolver remains unapproved.
- **Context:** The owner asked to move toward a playable game after the documentation review. The remaining control-model audit and independent reconstruction gates are still open, and the owner needs a concrete way to experience the candidate mechanics.
- **Decision:** Build a small local browser prototype driven by the existing machine-readable test fixture. Keep both direct-intention and environmental-influence modes available behind the same deterministic resolution contract. Exclude Fate, online multiplayer, persistence, and the unresolved citywide-emergency story.
- **Alternatives:** Continue paper analysis only; choose a control model prematurely and build that one; or build a full online game before validating the loop.
- **Rationale:** A bounded prototype makes the consequences and interaction differences inspectable without canonizing the test scenario or investing in production infrastructure.
- **Risks and limits:** The fixture's trust response, seeded evidence, objectives, and selection policy are provisional. Pass-and-play UI is not secure against a technically curious opponent. Human feedback is qualitative and cannot replace independent rule audit.
- **Revisit trigger:** Independent audit/reconstruction results and observed player confusion or meaningful-choice evidence.

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


## D-016 — Make story and public consequences primary in the next prototype iteration
- **Status:** Accepted for the next experiment only; not a production-game decision.
- **Context:** The owner's evaluation of the first prototype found that options were hard to understand, the UI was too mechanical and information-heavy, and outcomes were reported as objective/state results rather than an unfolding story. The owner could not provide broader comparative feedback because the first version revealed too little of the intended experience.
- **Decision:** Present deterministic authored story beats derived from resolved events and state as the primary feedback. Keep raw player submissions and input-derived ranking/selector diagnostics out of the player-facing UI entirely; collapsing them is not sufficient when they can reveal how private inputs affected selection. Keep non-sensitive experiment settings, history, and terminal recap secondary/collapsed. Show a small number of tracked state-condition meters and action-to-action changes, labelled as state rather than odds.
- **Alternatives:** Only restyle the dashboard; add more logs and metrics; use a generative model to decide outcomes; select a control model before its experience can be evaluated.
- **Rationale:** Players should understand what happened through the scene. Story communicates resolved mechanics without replacing them; observable events leave room to infer the opponent's likely intentions.
- **Cross-system effects:** Story presentation consumes resolved records; meters consume canonical state; the UI omits private submissions; tests must check these boundaries. Narration never mutates authoritative state.
- **Trade-offs and risks:** Authored prose can repeat or flatten branches. The fixture does not yet support the intended Fate escalation. Binary progress bars can overstate precision, so labels and supporting text must explain what is actually tracked.
- **Revisit trigger:** Uncoached sessions show whether choices are understandable, prose matches rules, meters improve comprehension, inference is possible, and pacing creates meaningful tension.

## D-017 — Select direct action as the player-facing control mode
- **Status:** Accepted — interaction direction selected; the resolution contract remains provisional.
- **Context:** The owner tried both interaction modes and explicitly chose the mode in which players select concrete actions they want Jules to take. The value is consequence prediction and inference from observed events, rather than asking players to manipulate objective-related environmental signals.
- **Decision:** Direct-action mode is the selected control direction for FATE/CTRL. New gameplay design and implementation should use direct-action inputs rather than environmental-influence signals. Each player privately proposes a concrete action for Jules. The player-facing experience should center on those actions, the resulting story, and a small set of causally grounded state indicators. Environmental influence remains available only as a historical comparison in the existing experiment; it is not a co-equal mode for new gameplay unless the owner explicitly reopens it.
- **Boundaries:** This decides what players choose, not whether a proposal is a command, how simultaneous submissions arbitrate, which actions are legal, how initiative/economy works, or how invalid/conflicting proposals resolve. Those rules must still be tested and documented. It does not authorize a hybrid control model.
- **Alternatives considered:** Keep both modes equally prominent; choose environmental influence; combine the two before a need is demonstrated.
- **Rationale:** Direct action best supports the desired story-first loop and requires players to predict concrete consequences. This is an explicit product decision by the owner, not a claim that broader playtesting has validated it.
- **Cross-system effects:** Action vocabulary, private-intention handling, protagonist agency, resolution fairness, story presentation, state meters, and future playtest/UI design.
- **Revisit trigger:** The owner changes the direction, or actual playtests demonstrate a material failure of the direct-action experience that cannot be corrected through resolution design.

## D-018 — Require counterfactual validation before implementing contested-action resolution
- **Status:** Accepted process gate; no resolver algorithm is yet accepted.
- **Context:** The worked O2 paper trace in `SCENARIO_CAUSALITY_REVIEW.md` demonstrates that a trace can be narratively reconstructable yet still leave meaningful influence under-tested. Direct-action mode is selected, but the way conflicting private proposals produce one observable protagonist action is not yet validated.
- **Decision:** Before coding a new resolver, use a fixed-state counterfactual table to vary proposed action pairs, test consensus and disagreement, and separately test player-role swaps. A proposed resolver must be deterministic, grounded in Jules's acquired knowledge, fair under role swaps unless an explicit visible rule says otherwise, and responsive to action-pair changes in meaningful states. It must not reveal raw submissions, execute a silent third action when two legal proposals conflict, or depend on an opaque ranking tuple.
- **Alternatives considered:** Copy the comparison fixture's ranking policy into the new scenario; use an unreviewed initiative winner; let narration select a result.
- **Rationale:** Passing a prose walkthrough is not sufficient if the chosen actions do not have meaningful effects or if outcomes cannot be independently reconstructed.
- **Cross-system effects:** Action validation, event resolution, protagonist agency, UI privacy, state meters, and scenario balancing.
- **Revisit trigger:** A complete same-state test matrix and independent reconstruction demonstrate that a simpler alternative meets the same fairness and agency constraints.


## D-019 — Do not rescue weak objective coupling with an ungrounded deadline

- **Status:** Proposed — paper-test direction only; not a story-canon decision.
- **Context:** The worked transit slice establishes that 18:24 is only Player A's umbrella promise deadline. The commuter group remains phone-accessible, B has no correction cutoff, the log's delivery channel is not defined, and the public audience's actions are unobserved. Inventing a public correction cutoff at the same time would manufacture objective conflict rather than derive it from the scene.
- **Decision proposal:** Keep the Red Umbrella / transit slice as a documented probe, not the production opening. Before investing in the current premise, paper-test P2 in SCENARIO_CAUSALITY_REVIEW.md §§14–15: a borrowed, unreliable venue radio whose prior fault warning, route communication, handover and incident attribution share one causal structure. The existing umbrella premise is not deleted; P2 is not accepted canon.
- **Alternatives considered:** (a) add an arbitrary correction/report deadline to P0; (b) keep a mostly parallel personal deadline and public-accountability subplot; (c) test a more causally integrated object/communication premise before selecting a scenario.
- **Rationale:** A time limit is fair only when it follows from a seeded operational constraint, and a player's objective should interact with actual events rather than rely on a symbolic object or a cutoff invented to force conflict.
- **Cross-system effects:** scenario choice, evidence provenance, knowledge ownership, action legality by location, protagonist action arbitration, objective evaluation, Fate eligibility, and terminal conditions.
- **Guardrails:** The radio fault must have deterministic behavior and an established source; Ren's prior knowledge must be evidenced by a message seeded before choices; Jules's actions and recipients' observed responses must be separate events; a transmission fault cannot alone prove who caused the crowd outcome. Direct-action mode remains selected.
- **Revisit trigger:** The P2 paper trace fails an independent reconstruction, cannot provide three distinct viable causal routes/counterplay and a non-Fate ending, or needs unseeded audience belief or arbitrary deadlines to work. In that case, compare another premise rather than patch P0.