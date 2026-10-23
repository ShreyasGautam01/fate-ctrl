# Project Handoff

**Last reconciled:** 2026-10-23  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Current phase:** Direct-action mode selected; premise discovery after the failed/partial P2 first-pass reconstruction; no replacement premise or production rules selected  
**Production gameplay:** Not started; direct-action mode is selected, but the resolver and complete rules are not  
**Story canon:** Unresolved; the literal citywide-emergency route is not established  
**Merge authority:** The project owner reviews and merges pull requests; open-branch work is not yet part of main.

## One-minute summary

FATE/CTRL is intended to be a two-player narrative strategy game: both players influence one relatable protagonist, Jules, while pursuing competing objectives. An eventual Fate system applies its own bounded pressure and can give players reasons to cooperate temporarily. The intended session is short, text-first, tense and increasingly consequential.

The first prototype was too mechanical to reveal much of that experience. The owner's supported feedback is that choices were hard to understand, the UI exposed too much mechanics detail, and resolutions reported objective results instead of telling a story. The owner has selected direct-action mode because players must infer consequences from concrete actions. The next iteration should be story-led, use understandable action choices, hide raw submissions and input-derived ranking diagnostics, and show only a few grounded state indicators.

## Owner feedback and current direction

- **Choice clarity:** Current options felt difficult to understand. Choice wording must use ordinary in-world language, with enough context to understand the intended action but not a guaranteed outcome.
- **Story:** The game should narrate scenes and consequences as the story unfolds. Objective/state results are secondary explanation, not the main experience.
- **Inference and privacy:** Players observe what Jules does and how the world responds; they should not automatically see the opponent's submission or ranking signals derived from private submissions.
- **State display:** A small number of bars/percentages may make changes legible, but each must correspond to an explicit tracked condition and show the change caused by the moment. They are not success probabilities; current coarse percentages still need UX validation.
- **Selected model:** Direct action is the chosen player-facing control mode. Environmental influence remains only as a historical comparison setting in the existing experiment, not a co-equal mode for new gameplay unless the owner explicitly reopens it.
- **Quality bar:** A better visual style cannot compensate for weak causal logic, unmeaningful choices or a flat story.

These are design inputs from one owner session, not comparative playtest evidence or proof of fairness. **No formal or uncoached human playtest of the improved narrative-first build has been conducted.**

## What is merged into main

### PR #6 — Initial comparison lab
A local browser prototype compares direct intention and environmental influence over a three-moment deterministic fixture. It established a runnable test surface, not the full game. It excludes Fate, the intended public-emergency finale, online multiplayer, persistence and generated narration.

### PR #7 — Story-first iteration
The story-first version is merged. It presents deterministic authored story beats based on resolved actions/state, defaults to direct-intention, uses more natural-language choice descriptions, removes locked controls during handoff, and shows three condition meters: honest return, evidence discovered/shared and trust. The meter values are fixture-specific and do not estimate the probability of winning.

PR #10 is also merged: the ranking inspector and input-derived diagnostics are now absent from the ordinary player interface. Its branch-level browser smoke is not a human playtest or a security guarantee.

## Current review and design work

### Merged PR #8 — Enumerator input/config validation
The Python enumerator now rejects malformed paired submissions, duplicate/incorrectly ordered tie-break entries, inconsistent configured terminal boundaries, unsupported composition/influence shapes, and fractional or boolean selector signals. The PR's CI passed 16 Python tests and 16 Node tests. This hardens known contracts but does **not** close the independent end-to-end audit of the enumerator, shared fixture and `CONTROL_MODEL.md`.

### Merged PR #10 — Keep input-derived diagnostics out of the player UI
The normal gameplay interface no longer exposes ranking tuples/selector diagnostics that could reveal how private submissions affected Jules's action. Decision and aftermath timeline labels are distinct. Its branch passed 17 Node tests and a pinned Playwright/Chromium smoke at 390 × 844, including a complete direct-intention path, meter/objective checks, handoff privacy checks, and an environmental-influence path.

This is automated browser evidence from the PR branch, not proof of human comprehension, enjoyment, balance, full visual quality or secure multiplayer. The local browser still contains submissions in memory.

### Merged PR #9 — Causal-route challenge (merged 2026-10-22; still non-canon)
https://github.com/ShreyasGautam01/fate-ctrl/pull/9

**State:** The documentation changes are merged into main. Merge status is repository state, not design approval. The borrowed-radio P2 trace still does not pass independent reconstruction or the three-viable-route gate. No scenario, Fate target, priority policy, or production rule is canon.

The authored desk findings remain provisional: the radio/paddle trace has explicit event mechanics, but operator attribution, player-view projection, contested-action priorities, Ren's response/trust outcome, full terminal horizon, and a third materially distinct route remain unresolved. The original citywide-emergency scale is not established.

## What the current experiment is—and is not

**It is:** a deterministic, fixture-driven local experiment for testing natural-language direct actions, observable consequences, hidden-intention inference, story presentation, state-condition meters and a comparison mode.

**It is not:** the full 10–15-minute game; accepted story canon; a finalized action-arbitration contract; a Fate implementation; secure hidden-information multiplayer; or proof that the game is fun or balanced.

Current story prose is authored and deterministic. It may describe only events and state established by the rules. It must never choose an action, invent evidence, silently disclose private information, or alter authoritative state. Core gameplay should not require a paid LLM API.

## Authority map

- `README.md`: repository entry point and source-of-truth index.
- `SPEC.md`: overall product hypothesis and design scope; still a draft.
- `CONTROL_MODEL.md`: provisional direct-intention/environmental-influence comparison contract.
- `scenarios/control_model_test_fixture.json`: executable source of truth for the small comparison experiment only.
- `tools/control_model_enumerator.py` and `tests/test_control_model_enumerator.py`: Python enumerator and its tests.
- `prototype/rules.mjs`: browser resolution semantics for the fixture.
- `prototype/story.mjs`: deterministic presentation and state-meter derivation; it cannot choose or mutate outcomes.
- `prototype/app.js`, `prototype/index.html`, `prototype/styles.css`: player-facing experiment, including the merged PR #10 privacy/timeline fixes.
- `INFORMATION_MODEL.md`: conceptual distinction between facts, evidence, access, knowledge, belief, disclosure, visibility and narration.
- `ARCHITECTURE.md` and `MODULE_CONTRACTS.md`: logical responsibilities, not a locked production stack.
- `DECISIONS.md`: rationale and statuses of major choices.
- `TASKS.md`: canonical task ledger, blockers and exit criteria.
- `PLAYTEST_PLAN.md`: independent-reconstruction and human-playtest protocol.
- `P2_RECONSTRUCTION_PACKET.md`: standalone first-pass reconstruction task.
- `P2_RECONSTRUCTION_REVIEW_01.md`: Claude AI first-pass outcome, finding register F-01–F-25, and recommended design triage; disclosed possible priming, not human playtest evidence.
- `P2_TARGET_VIABILITY_SCREEN_01.md`: comparison of the current Fate targets and next-step options after the failed/partial reconstruction; no target or premise is accepted.
- `PREMISE_DISCOVERY_SCREEN_01.md`: exploratory comparison of replacement premises and next acceptance gates; Campus Fest is only the leading investigation candidate, not canon.
- `scenarios/umbrella.json`, `CAUSAL_ROUTE_TRACE_01.md` and causal-route workshop docs: scenario probes, not accepted canon.

Historical simulations preserve design reasoning but do not outrank the active contract, current executable fixture or explicit decision status.

## Immediate next steps

1. Read `P2_RECONSTRUCTION_REVIEW_01.md` and `P2_TARGET_VIABILITY_SCREEN_01.md`. The first-pass by Claude (AI) failed/partially reproduced P2 and disclosed possible priming; this is not human independent reconstruction or a playtest.
2. Reassess the Fate target before adding more rules. The current sources cannot establish Jules as the R4 operator. T0 is unsupported; T1 is weak alone; T2-F2's proposed recovery is too late for the 18:24 first-note target under the existing evaluation boundary.
3. Use `PREMISE_DISCOVERY_SCREEN_01.md` to develop Candidate A (Campus Fest Countdown) into a one-page causal skeleton; Candidate B (Community Fair Finale) is the fallback. These are exploration priorities, not accepted canon. Test the objective tension, measurable Fate target, three genuinely distinct routes, two counterplay paths and a credible non-Fate ending before expanding the candidate.
4. Keep P2 only if useful as a bounded mechanics stress test. Do not add more priority rows or invent evidence to rescue its attribution target. If a new candidate proceeds, run a blinded first-pass reconstruction before implementation, disclose any priming risk, and do not treat an AI review as human playtesting.
5. Keep `scenarios/umbrella.json` and `scenarios/control_model_test_fixture.json` unchanged. No production gameplay implementation or canonical premise change follows from this screen.
6. Separately continue the historical enumerator/fixture/contract audit. The current prototype-test and browser-smoke results apply to the PR #10 code merge commit; PR #9 was documentation-only and had no new code workflow run.

## Constraints to preserve

- Quality and cross-system coherence outrank speed.
- Direct-action mode is the selected interaction direction. The exact contested-proposal resolver, action economy and production rules are not yet selected.
- Story is the primary player feedback; state meters are secondary and must reflect actual tracked state.
- Authoritative rules are deterministic; narration is presentation only.
- Keep submitted intentions and input-derived ranking diagnostics out of the normal player UI. A local browser is not a security boundary.
- Keep the test fixture separate from accepted story canon.
- Do not add networking, accounts, persistence, production gameplay or a paid LLM dependency before their needs are demonstrated and contracts reviewed.
- Distinguish automated tests, independent reconstruction, browser smoke tests, visual/accessibility review and human playtesting.
