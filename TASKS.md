# Project Plan and Task Ledger

**Last reconciled:** 2026-10-21  
**Current phase:** Concept validation through a bounded, story-first browser experiment.  
**Production gameplay:** Not started. Neither control model nor the story premise is finalized.  
**Merge policy:** The project owner reviews and merges pull requests. Open-branch work is not part of `main` until merged.

This ledger tracks completion and decision gates. A document, passing test, simulation, or prototype existing does not by itself mean the related design question is settled.

## 1. Current state at a glance

| Area | State | What is established—and what is not |
|---|---|---|
| Initial browser experiment | **Merged — PR #6** | A deterministic three-moment comparison lab exists. Its state/objectives/policy are test-only. |
| Story-first iteration | **Merged — PR #7** | Authored story beats, direct-intention as default, handoff, and condition meters exist. The interface is still an experiment, not the finished game. |
| Enumerator and fixture validation | **Open — PR #8** | Adds fail-closed input/config validation; reported Python and Node CI runs passed. The independent audit remains open. |
| Input-derived UI diagnostics | **Open — PR #10** | Removes ranking diagnostics from the player UI and adds Chromium smoke coverage. The branch's 17 Node tests and 390 × 844 browser smoke passed; these changes are not yet in `main`. |
| Story premise / Fate ending | **Draft — PR #9** | Tests public blame for a local operational failure during an independently caused storm disruption. It is not canon and is not yet a complete or accepted route. |
| Human playtesting | **Not done** | The owner gave useful but limited first-prototype feedback. There has been no uncoached session of the improved narrative-first experience. |
| Production engine, online play and persistence | **Not started / not approved** | No production architecture or full-game rules should be inferred from the local prototype. |

Pull requests: [#6](https://github.com/ShreyasGautam01/fate-ctrl/pull/6), [#7](https://github.com/ShreyasGautam01/fate-ctrl/pull/7), [#8](https://github.com/ShreyasGautam01/fate-ctrl/pull/8), [#9](https://github.com/ShreyasGautam01/fate-ctrl/pull/9), [#10](https://github.com/ShreyasGautam01/fate-ctrl/pull/10).

## 2. Refined product direction

These guide the next experiment; they do not amount to a final ruleset.

- **Two players, one protagonist:** players compete through their influence over Jules, while the eventual Fate system pursues its own scenario-defined outcome and may create reasons for temporary cooperation.
- **Direct intention leads:** players choose an action they want Jules to take and infer possible consequences. The owner preferred this to selecting abstract signals tied directly to objective features. Environmental influence remains a comparator, not a discarded model or a production decision.
- **Story is the primary feedback:** each resolution should show a credible scene, action, dialogue, or consequence. Objective results alone are too mechanical.
- **Observed action is public; submitted intention is private:** do not reveal raw submissions or input-derived ranking diagnostics in normal play, including inside a collapsible inspector. Players should infer intentions from observable events rather than read the opponent's move or the resolver's private calculations.
- **Meters are secondary:** show a small set of explicitly tracked conditions and changes. Do not present them as win probabilities. The current percentages are coarse fixture-specific indicators and need further UX validation.
- **Rules remain authoritative and deterministic:** story presentation describes resolved facts/events and must not select actions, invent evidence, or mutate state. Core play must not depend on a paid LLM API.
- **Causality outranks spectacle:** the umbrella story is only a probe. The literal citywide-emergency ending has no accepted causal route. Do not force it into the game.
- **No premature infrastructure:** online multiplayer, accounts, persistence, production deployment and a final framework/stack remain unapproved until local play demonstrates a worthwhile loop and hidden-information requirements are specified.

## 3. Merged work

### Merged PR #6 — First playable comparison experiment
A local browser interface compares direct intention and environmental influence over a three-moment deterministic fixture. It includes pass-and-play, state/objective results, and automated tests. It intentionally excludes Fate, the public-emergency ending, network play, persistence and generated narration.

### Merged PR #7 — Story-first iteration
The ordinary resolution view now emphasizes deterministic authored story rather than only objective outcomes. Direct intention is the default, choice labels use more natural language, locked controls are removed during handoff, and three state-condition meters show tracked state. The fixture and its story are still provisional.

### Earlier design and audit foundation
- `CONTROL_MODEL.md`, `scenarios/control_model_test_fixture.json`, `tools/control_model_enumerator.py`, its tests, and the report provide a small reproducible comparison harness.
- `INFORMATION_MODEL.md`, `ARCHITECTURE.md`, and `MODULE_CONTRACTS.md` describe conceptual information boundaries and responsibility ownership; they are not a final production architecture.
- `DECISIONS.md` contains the current decision status and rationale.
- `PROJECT_HANDOFF.md` is the concise continuation brief.

Historical simulations and workshop documents are evidence of prior reasoning, not competing authorities where they conflict with the active contract or executable fixture.

## 4. Review queue and validation evidence

### PR #8 — Enumerator input/config validation
The branch adds checks for exactly two submissions, unique and ordered tie-break entries, terminal-boundary consistency with the configured round count, supported influence-composition modes, integer selector signals (excluding booleans/fractions), and supported influence shapes. It adds Python/browser regression tests and a Python CI workflow. The PR reports successful CI with 16 Python tests and 16 Node tests.

**Still not proven:** the implementation has not been independently audited end-to-end against the fixture and `CONTROL_MODEL.md`; passing tests cannot show that every contract nuance is covered.

### PR #10 — Keep input-derived diagnostics out of the player UI
The branch removes ranking diagnostics from the normal UI, clarifies timeline labels, adds regression tests and pinned Playwright/Chromium browser smoke coverage. Its reported 17 Node tests and browser smoke passed at 390 × 844, including a complete direct-intention run, meter and terminal checks, handoff/privacy checks, and an environmental-influence run.

**Still not proven:** human comprehension, fun, fairness, all-browser visual quality, or secure hidden information. The local browser still holds submissions in memory. The smoke run is branch evidence; the changes are not in `main` until PR #10 is merged.

### PR #9 — Causal-route draft
This draft tests a smaller target: during an independently caused storm disruption, Jules may be blamed for a consequential local operational failure. It distinguishes actual cause, what Jules knows, what a recording shows, and what the public believes. It currently does not establish multiple materially distinct viable routes, the intended scale, or accepted scenario canon. Keep it in draft until skeptical review.

## 5. Active tasks and exit criteria

### P0-01 — Independently validate the comparison harness
**Status:** Partially implemented; PR #8 is open.  
**Next:** Independently inspect the enumerator, fixture and contract together; reconstruct selected actions and terminal routes without relying on the report as authority; record counterexamples and rule gaps before changing policy.

The historical enumeration reported:
- Direct intention: 5 reachable nonterminal states, 264 transition evaluations across path prefixes, 204 complete input sequences; A-only 42, B-only 36, both 126.
- Environmental influence: 7 reachable nonterminal states, 1,257 transition evaluations, 1,146 complete input sequences; A-only 642, B-only 9, both 495.

These are counts of paths under different state-dependent input sets, **not probabilities, win rates or balance scores**. A draft reconstruction suggests the nine W B-only sequences share a narrow pattern involving an early positive thread signal, a public early evidence reveal, and a final deadline return. Independently reproduce this route and decide whether it exposes an intentional trade-off or a fixture artifact.

**Exit:** An independent reviewer reproduces implementation results, understands all objective paths and input-sensitivity results, and distinguishes code defects from product choices.

### P0-02 — Define protagonist response and agency
**Status:** Test selector is deterministic; action tiers, direct-support semantics and tie-break policy remain provisional.  
**Exit:** Actions are legal and informed, the same configured response policy is used across candidate modes, consequences are explainable without disclosing private submissions, and Jules does not simply optimize either player objective.

### P0-03 — Define objectives and outcome semantics
**Status:** Fixture-only predicates exist for an honest return/trust outcome and evidence-backed accountability. They are not approved product scoring rules.  
**Exit:** Each objective has a human-readable goal, progress events, terminal predicate, partial/compatible outcomes, counterplay, and independently reviewed viable routes. The owner reviews trust response, evidence wording, and terminal assumptions.

### P0-04 — Define actions, effects and economy
**Status:** A small fixture vocabulary exists. No general production action/effect schema or persistent economy is selected.  
**Exit:** Every action/effect defines actor, target, preconditions, state changes, event provenance, cost, duration/expiry, conflict and stacking behavior, stale-target behavior, visibility, and counterplay where relevant.

### P0-05 — Define Fate
**Status:** Blocked by scenario causality and the missing global rules contract. Fate is not in the comparison prototype.  
**Exit:** A scenario-defined goal/milestone system has legal bounded interventions, readable pressure, counterplay, multiple routes and a credible non-Fate ending. Resisting Fate must not trigger arbitrary punishment.

### P0-06 — Validate the scenario and ending
**Status:** `scenarios/umbrella.json` remains a story probe. PR #9 is a draft, not canon.  
**Next:** Decide whether the local-public-blame route survives skeptical reconstruction, whether the umbrella opening connects naturally to the larger story, and whether at least three materially different strategic routes exist. Otherwise change the target or premise.  
**Exit:** Facts, evidence provenance, knowledge, timing, causes, public beliefs, objectives and endings form a coherent trace without unsupported coincidence.

### P0-07 — Define visibility and information fairness
**Status:** `INFORMATION_MODEL.md` is conceptual. The local prototype's UI hiding is not a security boundary.  
**Exit:** Hidden information has explicit ownership, acquisition and visibility rules; each player view is projected from authorized data; unauthorized clients never receive secrets; reason messages and logs do not leak them.

### P0-08 — Approve global contracts and production architecture
**Status:** Logical module boundaries exist; global phase order, Fate integration, boundary collisions and production stack are not approved.  
**Exit:** One authoritative resolution order covers collisions, stale actions, duplicate submissions, deadlines, knowledge updates, Fate eligibility, objective evaluation, terminal state and filtered explanations. Select infrastructure only after play requirements justify it.

### P0-09 — Validate the interaction with actual players
**Status:** First-prototype feedback is recorded; the improved story-first experience has not had an uncoached human session.  
**Exit:** Players can explain their aim and available actions, anticipate some consequences, infer possible opponent intentions from public events, reconstruct why a result occurred, identify counterplay, and say whether they want to replay. Record sample size and scenario version; small sessions are qualitative evidence, not statistical proof.

### P0-10 — Validate the story-first browser slice
**Status:** PR #7 is merged; PR #10 has passing branch-level test/browser-smoke evidence but remains open.  
**Next:** Review and merge through the owner's normal process, then run checks on the combined main-branch code. Perform human comprehension and visual/accessibility review after the privacy change is present in the merged build.  
**Exit:** Natural-language choices are understandable; story accurately describes resolved events; meters show real tracked state and deltas without false precision; the normal UI omits submissions and input-derived diagnostics.

## 6. Recommended next sequence

1. Review PR #8 and merge only when the owner is satisfied; confirm CI on the resulting main branch.
2. Review PR #10 next; rerun its tests and browser smoke against the combined code after PR #8's rule changes are present. Do not treat separate green branches as proof that the combined tree has passed.
3. Complete independent enumeration/contract review and an uncoached reconstruction of `PRIORITY_TABLE_REPLAY_01.md`. This older umbrella paper trace is separate from the machine fixture.
4. Skeptically review PR #9's causal route on paper. Establish three genuinely different viable routes or reject/change the target before promoting it to canon or implementing Fate.
5. Design a richer, coherent narrative slice with direct-action choices, consequential trade-offs, public story events, observable state changes, and bounded/counterable Fate pressure. Do not just add more interface elements to the three-moment fixture.
6. Run uncoached think-aloud sessions on that richer slice. Revise until story, rules, inference and pacing work together.
7. Only after those gates, decide whether online multiplayer is necessary and design server-authoritative views, persistence and operations accordingly.

## 7. Change discipline

Record substantive decisions in `DECISIONS.md`; put blockers and exit criteria here; use `PROJECT_HANDOFF.md` for the compact handover. Keep one executable comparison fixture and keep it separate from scenario canon. Do not add analysis files unless they provide reproducible evidence. Label each claim as authored analysis, automated result, independent review, browser verification or human playtest evidence.
