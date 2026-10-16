# Project Handoff

**Last updated:** 2026-10-16  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Working branch:** docs/control-model-consolidation-audit  
**Current pull request:** https://github.com/ShreyasGautam01/fate-ctrl/pull/4  
**Current phase:** concept validation and executable rule testing  
**Playable game implementation:** not started

## Current goal

Translate the Sonnet 5.5 audit into a testable control-model contract, execute the small state-space comparison, then have an independent reviewer challenge the implementation and fixture. Do not select a model or build a UI yet.

## Current authority map

- CONTROL_MODEL.md is the decision rationale and control-model contract.
- scenarios/control_model_test_fixture.json is the machine-readable source of truth for this experiment's exact facts, initial state, objectives, trust-response hypothesis, selector configuration, and influence definitions.
- tools/control_model_enumerator.py is the one Python standard-library implementation of the enumerated comparison.
- tests/test_control_model_enumerator.py has unit tests for known paths, input sensitivity, deterministic replay, effect cancellation, private-window behavior, and invalid input.
- ARCHITECTURE.md describes the comparison harness and later gates.
- MODULE_CONTRACTS.md describes logical ownership boundaries.
- scenarios/umbrella.json remains a separate unresolved story probe; it has not been silently rewritten to match the test fixture.
- DECISIONS.md is the canonical decision log; neither control model has been selected.
- Older traces are historical analyses and must not override the contract when their assumptions differ.

## Audit findings and implemented corrections

Sonnet's audit of the prior contract found that the inputs effectively had no causal force in the trace, the selection procedure was ambiguous, B's evidence objective was infeasible, and photo awareness, trust semantics, influence persistence, and selector ownership were not adequately specified.

CONTROL_MODEL.md now defines two test candidates and points to a machine-readable fixture. The direct-intention candidate adds one support mark per valid proposal. Environmental influence uses a small set of temporary selector signals and a private-window opportunity. Both models share a configured deterministic selector, state-transition code, objective predicates, and the same three-boundary fixture. The seeded message enables B's prior-knowledge predicate without allowing an influence to invent evidence.

The current harness enumerates all legal paired submissions over reachable nonterminal fixture states, calculates full rank tuples, tracks state/event/objective results, checks conditional input sensitivity, and finds example objective routes. It is a local test tool, not the game engine.

## Executed run

**Automated tests:** 11 tests passed locally using Python's standard library.

| Metric | Direct intention (I) | Environmental influence (W) |
|---|---:|---:|
| Unique reachable nonterminal states | 5 | 7 |
| Transition evaluations across all path prefixes | 264 | 1,257 |
| Complete legal input sequences | 204 | 1,146 |
| Sequences ending A-only | 42 | 642 |
| Sequences ending B-only | 36 | 9 |
| Sequences ending with both goals | 126 | 495 |

These values are exhaustive counts for this test fixture, **not probabilities, win rates, or balance scores**. Available options vary by state; raw sequence counts cannot establish fairness. Still, B-only W trajectories are far narrower in this run than A-only trajectories, and that deserves a rule-level explanation. The enumerator shows A-only, B-only, and joint-success routes exist in both models; it does not establish how real players experience the choices.

Both players' inputs change selected actions in reachable states when the opponent's input is held fixed. The test covers deterministic replay, selected invalid inputs, opposite-signal cancellation, and the private-window trust rule. Player-view projection, leakage tests, Fate, UI, online behavior, and human play remain untested.

## Owner decisions still open

- Is additive direct-intention support the desired control fantasy, especially when both players propose different actions?
- Is the seeded message too conclusive for the intended mystery?
- Is Jules's tie-break/default preference plausible?
- Does the private-window/trust response create an interesting sequencing choice or encode an arbitrary result?
- Is environmental influence meaningfully distinct enough to merit further investment, given the current signal-based implementation?

These are test assumptions, not accepted game canon. They should not be resolved by silently hard-coding a preferred story outcome.

## Next action

Audit tools/control_model_enumerator.py as the primary target, using scenarios/control_model_test_fixture.json and CONTROL_MODEL.md as the only consistency references. Ask the reviewer to check whether the code faithfully implements the config, whether exhaustive enumeration is actually exhaustive, whether any sensitivity or route result is an artifact of branch ordering, and whether the B-only W bottleneck is real under this policy. Do not ask them to rewrite files or choose the model. Once their audit is reviewed and fixed, have a second reviewer reconstruct the report and only then decide whether to prototype both models locally.

## Constraints

- Quality and cross-system coherence outrank speed.
- Keep one machine-readable test fixture and one implementation of the comparison rules.
- Avoid paid LLM dependencies for core play.
- Do not let narration decide outcomes or invent facts.
- Do not build UI, networking, persistence, or production infrastructure before the control-model gate.
- Project owner reviews and merges pull requests.
- Keep specification, executed tests, independent review, and human playtest evidence distinct.
