# Project Handoff

**Last updated:** 2026-10-19  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Working branch:** fix/enumerator-submission-shape-01  
**Current implementation/validation PR:** https://github.com/ShreyasGautam01/fate-ctrl/pull/8  
**Current design draft:** https://github.com/ShreyasGautam01/fate-ctrl/pull/9  
**Current phase:** concept validation with a bounded narrative-first browser experiment  
**Production gameplay:** not started; neither control model is formally selected  
**Story canon:** unresolved; the literal citywide-emergency route is not established

## Latest owner feedback

The owner could provide limited feedback on the first prototype because it revealed too little of the intended game:

- Choices were difficult to understand.
- The interface was too mechanical and information-heavy.
- The result stated objective/state outcomes without an unfolding story, making the experience dry and boring.
- Raw submissions were shown after resolution; the intended experience is to observe actions and infer the opponent's likely intention.
- The owner preferred direct-action/intention mode over environmental-influence mode because it puts consequence prediction in the player's hands.

That preference is qualitative product direction for the next experiment, not proof of fairness or a final production-model selection.

## Merged implementation: PR #7

PR #7, the narrative-first browser iteration, has merged. Its CI run passed 15 Node tests, including the story/meter tests. It:

- Makes deterministic authored story beats the primary resolution feedback.
- Uses direct-intention as the default and explains choices in natural language.
- Removes locked choice controls from the visible page during handoff and does not print raw submissions in player-facing story output.
- Shows three condition meters—honest return, evidence discovered/shared, and trust. They reflect tracked state, not odds of success.
- Moves story history, ending objective recap and experiment settings behind collapsed controls. The ranking inspector could reveal input-derived support and is therefore being removed in PR #10.

The story is a deterministic presentation of resolved state/events. It is not allowed to select an outcome or mutate authoritative state. The experience still uses the original three-moment comparison fixture.

## Current validation PR: #8

PR #8 adds a validation fix found during a separate code review:

- The Python enumerator now rejects anything other than exactly two player submissions, matching the browser resolution contract.
- Fixture validation rejects duplicate tie-break entries and an objective terminal boundary that disagrees with the configured round count.
- Python/browser regression tests cover malformed paired submissions.
- A separate GitHub Actions workflow runs the Python enumerator test suite.

The current PR #8 branch's CI passed **14 Python unit tests and 15 Node tests**. PR #8 is open and unmerged. This fixes identified validation gaps but is not the full independent audit of the enumerator, fixture and control-model contract.

## Current UI privacy fix: #10

PR #10 removes the optional action-ranking inspector from the player-facing experience. Even though it did not print the literal player choices, its ranking tuples could expose how submitted support affected Jules's action, undermining the intended inference loop. CI passed **17 Node tests** for the current PR #10 code head. A pinned Playwright/Chromium smoke test also passed at a 390 × 844 viewport, completing a direct-intention run and checking both objectives, state meters, submission visibility and the environmental-influence mode. PR #10 remains open and unmerged. The local browser still contains both submissions in memory, so this is a presentation/privacy improvement, not secure hidden-information architecture.

## Current causal-design draft: #9

Draft PR #9 adds an event-by-event, falsifiable trial of the narrower target already discussed in the causal documents: Jules is publicly blamed for a consequential local operational failure during an independently caused storm disruption. It explicitly does not claim that the umbrella causes a citywide emergency. The draft remains exploratory; the umbrella/deadline connection, objective fit, route diversity and finale scale remain open questions.

## Authority map

- CONTROL_MODEL.md is the provisional control-model comparison contract; neither model is selected.
- scenarios/control_model_test_fixture.json is the executable source of truth for the small comparison experiment.
- tools/control_model_enumerator.py and tests/test_control_model_enumerator.py are the deterministic Python comparison harness and tests.
- prototype/rules.mjs implements the browser fixture's resolution semantics.
- prototype/story.mjs maps resolved records/state to deterministic prose and condition meters; it must never select or mutate outcomes.
- prototype/app.js, prototype/index.html and prototype/styles.css provide the player-facing experiment. PR #10 removes the input-derived ranking inspector from this view.
- prototype/tests/ covers the rule, narrative and meter behavior.
- scenarios/umbrella.json and CAUSAL_ROUTE_TRACE_01.md remain design probes, not accepted story canon.
- INFORMATION_MODEL.md defines the vocabulary for facts, evidence, access, knowledge, belief, disclosure, visibility and events.
- ARCHITECTURE.md and MODULE_CONTRACTS.md define logical boundaries, not a final production stack.
- DECISIONS.md records decision status/rationale; TASKS.md owns blockers and exit criteria.

## Remaining gates

1. Browser-smoke-test the merged story-first prototype in Codespaces or a browser: both control modes, all moments, the handoff, meter deltas and endings. **No browser smoke test is claimed yet.**
2. Independently audit tools/control_model_enumerator.py against scenarios/control_model_test_fixture.json and CONTROL_MODEL.md. PR #8 fixes concrete input/config validation gaps but does not close this gate.
3. Reconstruct PRIORITY_TABLE_REPLAY_01.md without coaching. This historical umbrella paper trace is separate from the newer machine-readable fixture.
4. Explain the narrow B-only environmental-influence routes and review seeded evidence, trust, direct-support and character tie-break assumptions.
5. Decide whether the Target 1 causal route survives skeptical review; establish three materially different routes or change the premise. Do not silently promote the draft in PR #9 to canon.
6. Build player-specific view projections and leakage tests before secure multiplayer.
7. Run uncoached play sessions to evaluate comprehension, meaningful decisions, inference, story consistency, pacing, counterplay and replay desire.

## Constraints

- Quality and cross-system coherence outrank speed.
- Keep rules deterministic; narration only communicates outcomes.
- Keep one executable comparison fixture and do not silently canonize it.
- Avoid paid LLM dependencies for core play.
- Keep raw player submissions out of normal views; a local browser is not a security boundary.
- Do not add online networking, accounts, persistence or production gameplay before their design gates.
- The project owner reviews and merges pull requests.
- Distinguish automated tests, independent review, browser verification and human playtest evidence.
