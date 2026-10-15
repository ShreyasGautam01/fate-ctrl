# Project Handoff

**Last updated:** 2026-10-15  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Working branch:** docs/control-model-consolidation-audit  
**Current pull request:** https://github.com/ShreyasGautam01/fate-ctrl/pull/4  
**Current phase:** concept validation and specification  
**Gameplay implementation:** not started

## Current goal

Use the Sonnet 5.5 audit to repair the control-model comparison contract, assign clear architecture ownership, and prepare the next small experiment. Avoid another free-form analysis pass. The next code artifact should be a deterministic enumerator, not a playable application.

## Product summary

FATE/CTRL is a proposed two-player narrative strategy game. Both players influence one protagonist while pursuing distinct objectives; a bounded Fate system attempts to reach a scenario-defined dramatic outcome. Rules determine outcomes; narration presents them.

## Current authority map

- CONTROL_MODEL.md is the revised working reference for direct-intention versus environmental-influence semantics, its test-only fixture, common protagonist ranking procedure, objective predicates, and comparison gate.
- ARCHITECTURE.md describes the proposed offline comparison harness, not a production stack.
- MODULE_CONTRACTS.md defines logical responsibilities including mode-specific submission adapters and protagonist selection.
- SPEC.md remains the product-level draft.
- scenarios/umbrella.json remains an unresolved design probe; it has not been silently promoted to the revised test fixture.
- DECISIONS.md remains the canonical decision log; no control model has been accepted.
- TASKS.md owns the work plan and exit criteria.
- Other control traces are historical analyses. When they conflict with CONTROL_MODEL.md, do not treat the older assumptions as current rules.

## Audit response and corrections

Sonnet's audit of the previous CONTROL_MODEL.md found that both player input types were effectively null in the trace: the protagonist policy alone produced the stated action sequence. It also found that the priority table was not executable, Player B's objective lacked evidence that could prove prior knowledge, photo awareness/access was underspecified, environmental effect persistence was undefined, the trust predicate was not measurable, and the architecture lacked an owner for protagonist selection.

The current branch addresses those issues in the revised draft:

- Direct intention now has one provisional meaning: each valid proposal adds a support mark; proposals do not restrict the action set or execute themselves.
- Environmental influence has typed, bounded effects: surface/obscure a seeded message for the current decision, or move an existing repair kit within reach.
- The selector has an explicit lexicographic rank tuple, legal-action set, and fixed test-only tie-break order.
- The test fixture seeds a dated shared-thread message that explicitly records prior knowledge/nondisclosure; inspection and disclosure are distinct actions.
- Test-only objective predicates and a deterministic trust-response hypothesis make the goals computable and allow sequencing to matter.
- Boundary order, effect conflicts, objective-evaluation timing, and input-visibility constraints are specified for this fixture.
- MODULE_CONTRACTS.md now identifies the submission adapters, effect resolver, legal-action generator, protagonist selector, action executor, knowledge/response processor, boundary processor, objective evaluator, and replay diagnostics.
- ARCHITECTURE.md makes the offline enumerator the next technical artifact, before any UI or online architecture.

These are specification repairs and test assumptions, not approved game canon. In particular, the seeded message wording, direct-support semantics, Jules's tie-break order, and trust response remain project-owner decisions. The environmental model is not yet shown to be better or more fun.

## What has not been established

- No enumerator code has been written or run.
- The rewritten baseline and sensitivity checks are still authored predictions, not executed test results.
- No independent reviewer has reconstructed the revised file.
- No human playtest has been conducted.
- The citywide-emergency Finale remains unsupported; the comparison fixture intentionally excludes Fate.
- The broader production resolution order, online play, database, UI framework, and LLM use remain undecided.

## Next action

First inspect the revised CONTROL_MODEL.md and its architecture cross-references in PR #4. If the test-only assumptions are acceptable, implement the offline deterministic enumerator exactly as described in ARCHITECTURE.md. Enumerate all valid input pairs across reachable states for both modes, verify the one-input sensitivity rows, record all state/event/objective transitions, check whether either input is irrelevant or dominant, and enumerate whether both predicates have multiple completion paths. Do not claim validation until the harness is run and its output is independently reconstructed.

If a test-only assumption is not acceptable, revise CONTROL_MODEL.md first and regenerate expected results. Do not encode a disputed narrative choice in code and call it an architectural invariant.

## Constraints

- Quality and cross-system coherence outrank speed.
- Keep one active definition of test fixture, model semantics, and selection policy.
- Avoid paid LLM dependencies for core play.
- Do not let narration decide outcomes or invent facts.
- Do not build UI, networking, persistence, or production infrastructure before the control-model gate.
- Project owner reviews and merges pull requests.
- Clearly distinguish specification claims, executed tests, independent review, and human playtest evidence.
