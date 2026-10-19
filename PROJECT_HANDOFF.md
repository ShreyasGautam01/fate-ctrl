# Project Handoff

**Last updated:** 2026-10-19  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Working branch:** feat/narrative-first-playable-slice-02  
**Current phase:** concept validation with a bounded narrative-first browser experiment  
**Production gameplay:** not started; neither control model is selected  
**Story canon:** unresolved; the literal citywide-emergency route is not established

## Owner feedback and current design direction

The owner could provide limited feedback on the first prototype because it revealed too little of the intended game. The supported findings are:

- Choices were difficult to understand.
- The UI was too mechanical and information-heavy.
- The resolution reported game-objective outcomes without an unfolding story, making play dry and boring.
- Raw submissions were revealed after resolution; this conflicts with the desired inference loop.
- Of the two experimental control approaches, direct action/intention felt better. It asks players to choose an action they want Jules to take and reason about possible consequences, whereas environmental influence exposes objective-related signals more directly and reduces that layer of inference.

The direct-action preference is an owner preference for the next experiment, not proof of fairness or a final production-model selection. Keep environmental influence available only as a comparison setting until the model-selection gates are reviewed.

## Current iteration

The current branch evolves the same small fixture experiment rather than expanding it into production:

- The scene is the primary feedback. Deterministic authored story beats vary according to the protagonist action and resolved state.
- Direct-intention mode is the default. The move descriptions explain the intended action in natural language and remind the player that Jules may choose differently.
- Locked selections are removed from visible controls during handoff. Story output does not print raw submissions.
- Three meters show honest return, evidence discovered/shared, and relationship trust. They represent exact tracked conditions, not odds of winning. Changes are annotated after resolution.
- Story history, objective recap, ranking details and experiment settings are secondary/collapsed.
- Tests cover story branches, meter derivation, and separation between story presentation and player submissions.

The story presentation is deterministic and authored. It consumes already-resolved action/state and cannot decide outcomes or change state. The fixture's facts, trust response, objectives and protagonist-selection policy remain provisional.

## Authority map

- CONTROL_MODEL.md is the provisional control-model comparison contract; no model is selected.
- scenarios/control_model_test_fixture.json is the machine-readable source of truth for the current test fixture.
- tools/control_model_enumerator.py and tests/test_control_model_enumerator.py are the deterministic Python comparison harness and its tests.
- prototype/rules.mjs is the browser implementation of the fixture's resolution semantics.
- prototype/story.mjs maps resolved records/state to deterministic prose and state meters; it must never select or mutate outcomes.
- prototype/app.js, prototype/index.html, and prototype/styles.css provide the player-facing experiment and optional diagnostics.
- prototype/tests/ tests browser-rule and story/meter behavior; CI is configured to run these tests.
- scenarios/umbrella.json is a separate unresolved story probe, not the canonical source for the smaller comparison fixture.
- DECISIONS.md records choice status and rationale; TASKS.md owns current gates, blockers and exit criteria.
- INFORMATION_MODEL.md, ARCHITECTURE.md, and MODULE_CONTRACTS.md remain references for future information boundaries and logical ownership.

## Existing technical evidence and open risks

The earlier deterministic comparison enumerated paired submissions over the fixture and found A-only, B-only and joint-success routes in both modes. These are exhaustive counts of paths in a small fixture, not probabilities, win rates, balance scores or evidence of fun. B-only environmental-influence routes are unusually narrow and still need a rule-level explanation.

Previous independent design review identified weaknesses in causal logic, selector semantics, evidence feasibility, trust response and influence behavior. The revised fixture/harness addressed some defects, but remaining gates are:

1. Independent audit of tools/control_model_enumerator.py against scenarios/control_model_test_fixture.json and CONTROL_MODEL.md.
2. Uncoached reconstruction of PRIORITY_TABLE_REPLAY_01.md; this historical umbrella trace is separate from the machine fixture.
3. Explanation of narrow B-only environmental-influence routes and owner review of seeded evidence, trust, direct-support and tie-break assumptions.
4. Player-specific view projection and leakage tests before any secure multiplayer work.
5. A credible causal route for Fate's intended ending, or an explicit decision to narrow or replace that target.
6. Human sessions evaluating story comprehension, meaningful decisions, inference, pacing, counterplay and replay desire.

## Validation status for this iteration

No browser smoke test or full visual/browser verification is claimed yet. The earlier prototype's rules CI passed against the committed fixture, but the current branch adds story and interface behavior that needs its own CI result and review. Passing automated tests proves only the behavior covered by those tests; it does not establish fun, fairness, visual polish across browsers, or hidden-information security.

## Next steps

1. Run CI and review the current branch's rules/story tests.
2. Smoke-test a complete three-moment run in both modes, including handoff and ending; verify no raw submissions are exposed and meters match the canonical state.
3. Compare every story branch with the events and state it describes. Prose must not imply a fact/action that the rules did not establish.
4. Independently audit the enumerator/fixture and reconstruct the historical paper trace without coaching.
5. Adversarially design the larger Fate scenario on paper before implementing Fate.
6. Use direct-intention as the lead player-facing candidate in the next iteration, while preserving environmental influence as an experimental comparator until the open gates are reviewed.

## Constraints

- Quality and cross-system coherence outrank speed.
- Authoritative state and rules remain deterministic; story presentation must not mutate them.
- Keep one executable fixture and do not silently canonize it.
- Avoid paid LLM dependencies for core play.
- Keep raw player submissions out of ordinary player-facing views; a local browser is not a security boundary.
- Do not add networking, accounts, persistence or production gameplay before their design gates.
- The project owner reviews and merges pull requests.
- Distinguish specification, automated tests, independent review, browser verification and human playtest evidence.
