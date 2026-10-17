# Instructions for AI Coding Agents

## Mission
Develop FATE/CTRL as a coherent, testable game. Protect design intent and correctness; do not maximize code volume or speed at the expense of quality.

## Read before changing behavior
1. PROJECT_HANDOFF.md
2. SPEC.md
3. DESIGN_REVIEW.md
4. MODULE_CONTRACTS.md
5. ARCHITECTURE.md
6. DECISIONS.md
7. TASKS.md

If documents conflict, report the conflict and propose reconciliation; do not silently choose. SPEC.md describes intended behavior, DECISIONS.md records choice status/rationale, and TASKS.md tracks approved work.

## Working rules
- Do not implement production gameplay before the design gate in TASKS.md passes. An explicitly owner-authorized experiment may be built against the existing test fixture only; label it non-canon, preserve both candidate models where relevant, and do not imply that the gate or model selection has passed.
- Do not present provisional ideas as accepted requirements.
- Prefer the smallest complete, testable change.
- Before large changes, explain the problem, proposal, alternatives, risks, and acceptance criteria.
- Keep rules deterministic and separate from UI, persistence, networking, and narration.
- Never let narration/LLM mutate authoritative state or decide action legality.
- Validate external input and scenario data; protect hidden-information boundaries.
- Add/update tests for every behavior change and important edge case.
- Explain dependencies and alternatives before adding packages.
- Do not add accounts, analytics, paid APIs, or infrastructure without an approved requirement.
- Do not silently change action semantics, objective balance, scenario facts, or terminal conditions.
- Never claim tests passed unless actually run; state exactly what was verified.
- Never commit secrets, credentials, or real player data.

## Change protocol
1. State intended outcome and files expected to change.
2. Inspect contracts and callers.
3. Identify edge cases and compatibility effects.
4. Implement the minimum coherent change.
5. Run relevant tests and validation.
6. Review the diff for unintended changes and stale documentation.
7. Update TASKS.md, DECISIONS.md, and PROJECT_HANDOFF.md where relevant.
8. Open a pull request with summary, rationale, evidence, risks, and unresolved questions.
9. Do not auto-merge; the project owner reviews significant changes.

## Code quality
Use descriptive names, narrow responsibilities, explicit types, stable IDs, and structured errors. Avoid speculative abstractions, duplicated sources of truth, silent fallbacks, and broad exception swallowing. Comments should explain non-obvious rationale.

## Completion report
- What changed and why.
- Design implications.
- Tests/validation run and results.
- Known gaps and risks.
- Exact next decision/task.
