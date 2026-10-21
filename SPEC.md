# FATE/CTRL — Game Specification

**Status:** Draft 0.1 — working hypothesis, not a locked specification.  
**Control direction:** Direct-action mode is selected for FATE/CTRL. Timing, contested-action resolution, action economy, scenario causality and Fate rules remain open.  
**Implementation:** Not started.

## 1. Product thesis
FATE/CTRL is a competitive narrative strategy game for two players. Both influence one protagonist but want different outcomes. Fate pursues a scenario-defined ending and intervenes when events drift away from it.

The intended tension is that each player can see enough to plan, neither fully controls the protagonist, and Fate turns small choices into consequences that can be exploited or resisted. This thesis succeeds only if players can explain why decisions mattered and sometimes find it strategically useful to cooperate against Fate.

## 2. Intended emotional arc
1. Recognition: an ordinary, immediately understandable problem.
2. Contest: conflicting goals and meaningful limits on control.
3. Complication: choices create persistent consequences and opportunities.
4. Pressure: Fate advances while giving players enough signal to respond.
5. Escalation: consequences grow surprising and large, but remain causally traceable.
6. Resolution: explicit state conditions end the game; narration cannot arbitrarily declare an ending.

A 15–25 minute session is only a hypothesis. The idea of an explosive final 10–15 minutes may imply a longer session; pacing must be tested.

## 3. Design pillars
- Agency under constraint: neither player owns the protagonist outright.
- Readable causality: surprises make sense in hindsight.
- Strategic conflict: decisions have opportunity costs and counterplay.
- Earned escalation: extraordinary events grow from established facts, relationships, objects, and institutions.
- Fate as an opponent: goals, constraints, signals, and counterplay; not random punishment.
- Replayable scenarios: different strategic structures, not just different prose.
- Trustworthy resolution: rules determine outcomes; narration describes them.

## 4. Initial scope
Initial target is two people playing one short scenario in a browser, possibly on separate devices. Whether first play is local/pass-and-play or online is unresolved. Single-player, matchmaking, accounts, cosmetics, campaigns, monetization, and user-generated scenarios are out of scope until the core loop proves fun.

Mobile usability, accessibility and readable text are important. Details should be tested in the selected direct-action experience.

## 5. Scenario probe: The Red Umbrella
Jules borrowed a red umbrella from a flatmate, damaged it, and must return it before the flatmate leaves. Player A wants Jules to return it without losing trust. Player B wants the flatmate's responsibility for lending an already-damaged umbrella exposed. Fate wants Jules to become the public face of a citywide emergency during a live broadcast, holding the red umbrella and being blamed for the crisis.

This is a design probe, not canon. Revise it if the causal path feels contrived, objectives are uninterestingly asymmetric, or Fate's ending has only one forced route.

Scenario requirements:
- Establish the umbrella, its condition, the relationship, the deadline, and objectives clearly.
- Distinguish objective facts, character knowledge, player knowledge, and suspicion.
- Give both players multiple viable strategies.
- Make the emergency arise through explicit causal links.
- Provide at least three materially different routes toward Fate's ending and at least two credible ways to disrupt or delay it.
- Provide a satisfying ending if Fate is thwarted.
- Never make the protagonist act on knowledge they do not possess.

## 6. Roles and information
**Protagonist:** a character with traits, knowledge, relationships, resources, and commitments. The game must not make them omniscient or infinitely capable.

**Players:** each has a private objective and may have private information. Both inspect a shared public state. Hidden information should enable inference, not make objectives impossible to understand or counter. Objectives require measurable criteria; vague goals such as “be the good one” are insufficient.

**Fate:** a system-controlled opponent with a scenario goal, explicit intervention limits, and legal actions. It cannot invent facts, cancel actions without a rule, or force an ending before prerequisites are met. How much of Fate's plan is visible remains unresolved.

## 7. Direct-action control and timing

**Direct-action control is selected.** Players choose concrete actions they want Jules to take; the game does not ask them to adjust environmental signals tied directly to objective features. The existing comparison prototype remains a historical experiment and does not set the next game's resolver.

The **timing model** is still unresolved:

**A — Simultaneous hidden proposals:** both players privately choose legal actions from the same scene state, then one protagonist action is resolved under deterministic conflict rules. This supports bluffing and inference, but contested proposals require fair, comprehensible arbitration.

**B — Alternating direct action and response:** one player submits a direct action, the other gets a disclosed response or contest opportunity, then the world resolves. This may be easier to teach but risks privileging the second mover and making counters too obvious.

Do not conflate this timing choice with the now-selected direct-action control mode. A hybrid is acceptable only if it solves a demonstrated problem without needless cognitive load.

The chosen loop must define when players see state and commit, whether commitments can change, how illegal/stale actions are handled, how conflicts resolve, when deadlines and delayed effects trigger, when Fate acts and pays, how outcomes are explained, and how timeouts/disconnects work if online play is selected. CONTROL_MODEL.md is a historical test-only comparison fixture; its semantics do not define the production rules. DECISIONS.md records the owner's selection of direct-action mode. The candidate resolver and objective-coupling analysis in SCENARIO_CAUSALITY_REVIEW.md §§10–12 remain unapproved.

## 8. Candidate action families
Potential actions: influence the protagonist; interfere with another influence; protect an eligible fact/object/relationship; delay a consequence; reveal a hidden fact; suppress an object's availability or an effect; swap or redirect eligible resources/targets/consequences.

These are not approved mechanics. Each needs a target model, preconditions, cost, duration, counterplay, event record, and behavior when the target changes. “Erase an object” must not mean deleting established history or invalidating references. Prefer typed effects such as suppressing availability for a defined number of resolutions over unrestricted mutation.

The first prototype should use the smallest action set that creates meaningful counterplay. More action types do not automatically create more depth.

## 9. State and causality
The canonical state will likely need scenario/rules versions, phase and round, protagonist location/status/knowledge/relationships/commitments, objects and condition, public/private facts and knowledge ownership, active effects and expiry, objectives/resources/progress, Fate progress/resources/signals, event history, and terminal outcome.

The schema is not approved. Avoid duplicated derived values unless consistency rules are explicit. Every state change must be traceable to an accepted action, a rule, or a scenario trigger.

Keep these concepts distinct:
- World fact: objectively true.
- Character knowledge: what a character has learned.
- Player knowledge: what that player may see.
- Belief/suspicion: a possibly false interpretation.
- Narration: prose describing a resolved event.

Narration is never authoritative for the first four. An LLM, if used, may phrase a resolved event but cannot decide legality, invent evidence, alter scores, or write to canonical state.

## 10. Fate model
Fate should be defined by scenario goals, prerequisites, progress conditions, legal interventions, and fallback routes. Candidate components include a milestone graph/rule set, eligibility conditions, effects, limited Fate actions, alternate routes, and terminal conditions.

A rigid sequence risks making player choices cosmetic. Free-form generated plot risks incoherence and untestability. The intended middle ground is a constrained causal model with multiple routes, but the graph representation itself remains provisional.

If Fate becomes stronger as players resist, the escalation needs a budget, warning, or understandable rule. Otherwise resistance feels automatically punished.

## 11. Ending and scoring
Define explicit terminal predicates for Fate success, each player's success, partial/compatible goals, and draw/unresolved states if needed. Objectives may overlap; do not force mutually exclusive winners without a deliberate, tested reason. Report primary outcome, secondary achievements, and key causal events separately. Never choose an ending merely because a text generator wrote a dramatic paragraph.

## 12. Fairness and edge cases
Tests and rules must cover:
- one action invalidating another action's target;
- repeated protection, delay, suppression, or resource farming;
- circular triggers or effects that run forever;
- impossible/contradictory state;
- hidden information leaking through feedback;
- one objective being strictly easier or more rewarding;
- Fate repeatedly undoing player success;
- stalling to avoid loss;
- no legal actions remaining;
- deadline expiry coinciding with rescue;
- simultaneous actions depending on each other's results;
- retries, disconnects, duplicate submissions;
- narration contradicting resolved state.

## 13. Non-functional goals
- Deterministic, replayable resolution for a fixed state and ordered input.
- Clear separation of rules, scenario data, interface, persistence, and optional text generation.
- Useful event history and stable reason codes.
- Versioned and validated scenario formats.
- Automated tests for transitions, legality, terminal conditions, visibility, and adversarial cases.
- No paid LLM API required for core play.
- Minimal data collection; accounts and online persistence deferred until needed.
- Mobile-friendly interface if browser play is selected.

Do not invent performance or retention targets before measuring a prototype.

## 14. Design gate
Before production implementation:
1. Choose and document the turn/commitment model with worked examples.
2. Explain a complete round without ambiguity.
3. Specify each prototype action's target, preconditions, cost, duration, and failure behavior.
4. Give both players measurable objectives and multiple viable strategies.
5. Give Fate limited interventions, multiple causal routes, and counterplay.
6. Model the umbrella scenario's facts, knowledge, prerequisites, effects, and endings.
7. Hand-simulate at least three rounds without contradictory outcomes, including compatible and conflicting actions, stale targets, and deadline/effect collisions.
8. Identify a single source of truth for state, legality, resolution, timing, and narration.
9. Define playtest questions and revision triggers.
10. List unknowns explicitly rather than hiding them in code.

CONTROL_MODEL.md is the active test reference for the unresolved direct-intention versus environmental-influence decision; it is not an accepted production specification. ARCHITECTURE.md and MODULE_CONTRACTS.md define the proposed comparison-harness boundaries. INFORMATION_MODEL.md defines distinctions between facts, evidence, access, knowledge, belief, disclosure, and narration. PAPER_SIMULATION_01.md, PAPER_SIMULATION_02.md, DIRECT_INTENTION_TRACE.md, MATCHED_MODEL_COMPARISON_01.md, and PRIORITY_TABLE_REPLAY_01.md are historical desk analyses, not accepted round contracts or playtest evidence. OBJECTIVE_AND_FAIRNESS_WORKSHEET.md describes objective semantics. CAUSAL_ROUTE_TRACE_01.md and the other causal-route documents assess whether the umbrella premise can support the intended escalation. These supporting documents do not override the accepted decision log or the current test reference.
