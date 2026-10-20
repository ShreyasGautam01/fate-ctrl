# Project Handoff

**Last reconciled:** 2026-10-21  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Current phase:** Concept validation with a bounded, story-first browser experiment  
**Production gameplay:** Not started; neither control model is selected  
**Story canon:** Unresolved; the literal citywide-emergency route is not established  
**Merge authority:** The project owner reviews and merges pull requests; open-branch work is not yet part of main.

## One-minute summary

FATE/CTRL is intended to be a two-player narrative strategy game: both players influence one relatable protagonist, Jules, while pursuing competing objectives. An eventual Fate system applies its own bounded pressure and can give players reasons to cooperate temporarily. The intended session is short, text-first, tense and increasingly consequential.

The first prototype was too mechanical to reveal much of that experience. The owner's supported feedback is that choices were hard to understand, the UI exposed too much mechanics detail, and resolutions reported objective results instead of telling a story. The owner preferred direct-action/intention mode because players must infer consequences themselves. The next experiment should therefore be story-led, use understandable actions, hide submitted intentions and input-derived ranking diagnostics, and show only a few grounded state indicators.

## Owner feedback and current direction

- **Choice clarity:** Current options felt difficult to understand. Choice wording must use ordinary in-world language, with enough context to understand the intended action but not a guaranteed outcome.
- **Story:** The game should narrate scenes and consequences as the story unfolds. Objective/state results are secondary explanation, not the main experience.
- **Inference and privacy:** Players observe what Jules does and how the world responds; they should not automatically see the opponent's submission or ranking signals derived from private submissions.
- **State display:** A small number of bars/percentages may make changes legible, but each must correspond to an explicit tracked condition and show the change caused by the moment. They are not success probabilities; current coarse percentages still need UX validation.
- **Preferred model:** Direct intention is the lead candidate because it preserves consequence inference. Environmental influence remains a comparison setting until both mechanics and player experience are understood.
- **Quality bar:** A better visual style cannot compensate for weak causal logic, unmeaningful choices or a flat story.

These are design inputs from one owner session, not comparative playtest evidence or proof of fairness. **No formal or uncoached human playtest of the improved narrative-first build has been conducted.**

## What is merged into main

### PR #6 — Initial comparison lab
A local browser prototype compares direct intention and environmental influence over a three-moment deterministic fixture. It established a runnable test surface, not the full game. It excludes Fate, the intended public-emergency finale, online multiplayer, persistence and generated narration.

### PR #7 — Story-first iteration
The story-first version is merged. It presents deterministic authored story beats based on resolved actions/state, defaults to direct-intention, uses more natural-language choice descriptions, removes locked controls during handoff, and shows three condition meters: honest return, evidence discovered/shared and trust. The meter values are fixture-specific and do not estimate the probability of winning.

The merged UI still has limitations addressed by open PR #10; do not assume that PR #10's privacy changes are present in main yet.

## Open pull requests as of this reconciliation

### PR #8 — Enumerator input/config validation
https://github.com/ShreyasGautam01/fate-ctrl/pull/8

**State:** Open, not merged. The branch tightens validation for paired inputs, tie-break order/uniqueness, configured terminal boundaries, supported influence composition/shapes, and selector signal types. The PR reports successful CI for 16 Python and 16 Node tests. This is a useful implementation hardening pass, **not** the independent end-to-end audit of the enumerator, fixture and contract.

### PR #10 — Remove input-derived diagnostics from the player UI
https://github.com/ShreyasGautam01/fate-ctrl/pull/10

**State:** Open, not merged. Removes the ranking inspector because even collapsed input-derived ranking tuples can reveal how private submissions affected selection; fixes decision/aftermath timeline labels; adds regression checks and pinned Playwright/Chromium smoke coverage. Its branch reports 17 passing Node tests and a passing 390 × 844 browser smoke that completes the direct-intention path, checks story/meter/objective state and handoff privacy, and exercises environmental influence.

That browser result applies to PR #10's tested branch, not the current main branch. The local browser still retains submissions in memory, so hiding information in the UI is not secure multiplayer architecture.

### PR #9 — Draft causal route
https://github.com/ShreyasGautam01/fate-ctrl/pull/9

**State:** Draft, not merged. It tests a narrower ending: Jules becomes publicly blamed for a consequential local operational failure during an independently caused storm disruption. It does not claim the umbrella causes a citywide emergency. The route still needs skeptical reconstruction, multiple materially different viable paths, and an explicit decision about scale/premise before any promotion to canon.

## What the current experiment is—and is not

**It is:** a deterministic, fixture-driven local experiment for testing natural-language direct actions, observable consequences, hidden-intention inference, story presentation, state-condition meters and a comparison mode.

**It is not:** the full 10–15-minute game; accepted story canon; a selected control model; a Fate implementation; secure hidden-information multiplayer; or proof that the game is fun or balanced.

Current story prose is authored and deterministic. It may describe only events and state established by the rules. It must never choose an action, invent evidence, silently disclose private information, or alter authoritative state. Core gameplay should not require a paid LLM API.

## Authority map

- `README.md`: repository entry point and source-of-truth index.
- `SPEC.md`: overall product hypothesis and design scope; still a draft.
- `CONTROL_MODEL.md`: provisional direct-intention/environmental-influence comparison contract.
- `scenarios/control_model_test_fixture.json`: executable source of truth for the small comparison experiment only.
- `tools/control_model_enumerator.py` and `tests/test_control_model_enumerator.py`: Python enumerator and its tests.
- `prototype/rules.mjs`: browser resolution semantics for the fixture.
- `prototype/story.mjs`: deterministic presentation and state-meter derivation; it cannot choose or mutate outcomes.
- `prototype/app.js`, `prototype/index.html`, `prototype/styles.css`: player-facing experiment. PR #10 is the pending change that removes input-derived ranking diagnostics.
- `INFORMATION_MODEL.md`: conceptual distinction between facts, evidence, access, knowledge, belief, disclosure, visibility and narration.
- `ARCHITECTURE.md` and `MODULE_CONTRACTS.md`: logical responsibilities, not a locked production stack.
- `DECISIONS.md`: rationale and statuses of major choices.
- `TASKS.md`: canonical task ledger, blockers and exit criteria.
- `PLAYTEST_PLAN.md`: independent-reconstruction and human-playtest protocol.
- `scenarios/umbrella.json`, `CAUSAL_ROUTE_TRACE_01.md` and causal-route workshop docs: scenario probes, not accepted canon.

Historical simulations preserve design reasoning but do not outrank the active contract, current executable fixture or explicit decision status.

## Immediate next steps

1. Review PR #8; if accepted, merge through the owner's normal process and verify CI on the resulting main branch.
2. Review PR #10 after #8's rule changes are present; rerun its tests and Chromium smoke against the combined tree. Separate successful branch runs are not a substitute for testing the combined main branch.
3. Independently audit the enumerator/fixture/contract and reconstruct the narrow environmental-influence B-only path shape. Do not interpret path counts as probabilities or balance scores.
4. Reconstruct `PRIORITY_TABLE_REPLAY_01.md` without coaching. This historical umbrella paper trace is separate from the machine-readable comparison fixture.
5. Review PR #9's causal story skeptically. Establish at least three meaningfully different viable routes or change the causal target/premise. Do not implement Fate or canonize the route before this gate.
6. Design a richer playable narrative slice around meaningful action trade-offs and a causally coherent escalation; then run uncoached sessions for comprehension, inference, fairness, pacing, counterplay and replay desire.

## Constraints to preserve

- Quality and cross-system coherence outrank speed.
- Direct intention is the preferred lead candidate, not a final model selection.
- Story is the primary player feedback; state meters are secondary and must reflect actual tracked state.
- Authoritative rules are deterministic; narration is presentation only.
- Keep submitted intentions and input-derived ranking diagnostics out of the normal player UI. A local browser is not a security boundary.
- Keep the test fixture separate from accepted story canon.
- Do not add networking, accounts, persistence, production gameplay or a paid LLM dependency before their needs are demonstrated and contracts reviewed.
- Distinguish automated tests, independent reconstruction, browser smoke tests, visual/accessibility review and human playtesting.
