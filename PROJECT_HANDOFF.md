# Project Handoff

**Last updated:** 2026-10-15  
**Repository:** https://github.com/ShreyasGautam01/fate-ctrl  
**Default branch:** main  
**Working branch:** docs/control-model-consolidation-audit  
**Current phase:** concept validation and specification  
**Implementation:** not started

## Current goal

Consolidate the most consequential open design decision into one reviewable reference, have it audited independently, fix high-severity flaws, and then move toward a tiny comparative local prototype. Do not generate another broad design pass before the current control semantics are challenged.

## Product summary

FATE/CTRL is a proposed two-player narrative strategy game. Both players influence one protagonist while pursuing distinct objectives; a constrained Fate system attempts to reach a scenario-defined dramatic ending. Rules are intended to determine outcomes; narration presents resolved events.

## Current authority map

- CONTROL_MODEL.md is the proposed single working reference for the direct-intention versus environmental-influence decision. It is on this branch for audit; the project owner has not approved its rules.
- SPEC.md remains the product-level draft.
- scenarios/umbrella.json is a non-executable probe; facts, deadlines, objective predicates, and Fate rules remain incomplete.
- DECISIONS.md remains the canonical decision log. No interaction model has been accepted.
- TASKS.md is the task ledger.
- The other control traces are prior authored analyses. When they conflict, do not silently treat an older trace as current canon; record the conflict and resolve it explicitly.

## Important findings so far

- The flatmate deadline differs across earlier documents (two resolution cycles versus three boundaries).
- Photo accessibility differs across traces: one begins with the photo inaccessible to Jules, while the later matched trace assumes a searchable thread.
- The latest shared priority table selects actions, but direct-intention semantics do not yet say clearly whether Jules chooses only among proposals or from all legal actions.
- Environmental examples use terms like “salience,” “friction,” and “make an opportunity easier” without specifying the state variable, magnitude, duration, cost, or how the protagonist policy consumes the effect. Their claimed strategic contribution may therefore be cosmetic.
- The current three-round replay does not establish that both environmental influences cause a meaningful difference to the outcome.
- Player A's trust-preservation objective lacks an observable predicate. Player B's objective requires evidence of prior knowledge and nondisclosure; the photo only establishes an earlier defect unless another source proves what the flatmate knew.
- The citywide-emergency Fate target still lacks a credible causal route from the interpersonal opening. No Fate outcome is tested by the three-round control comparison.
- All previous simulations are authored desk analysis. No independent reconstruction or human playtest has been recorded.

## Next action — deep audit of one file

Ask Sonnet 5.5 to audit CONTROL_MODEL.md as the target document, using SPEC.md, scenarios/umbrella.json, INFORMATION_MODEL.md, MODULE_CONTRACTS.md, and DECISIONS.md only as consistency references. The requested output should be a severity-ranked critique with exact section references, reproducible counterexamples, distinctions between true contradictions and open assumptions, and minimum changes needed. It should not rewrite files, choose the winning model, invent playtest evidence, or begin implementation. The audit prompt is in the next assistant message; it can also be pasted directly into Sonnet.

After receiving the report, triage findings into confirmed defects, valid trade-offs, false positives, and decisions that require product-owner judgment. Update CONTROL_MODEL.md and affected cross-references only after resolving those points. Do not create more supporting files unless they add evidence.

## Constraints

- Quality and cross-system coherence outrank speed.
- Preserve repository context, but avoid parallel definitions of active rules.
- Avoid paid LLM dependencies for core play.
- Do not let narration decide outcomes or invent facts.
- Do not start production code before the control unit, fixture, action contracts, and test gates are approved.
- Project owner reviews and merges pull requests.
