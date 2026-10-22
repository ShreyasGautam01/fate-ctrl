# Project Plan and Task Ledger

**Last reconciled:** 2026-10-21  
**Current phase:** Direct-action mode selected; validate story causality and contested-action resolution through bounded paper tests before implementation.  
**Production gameplay:** Not started. Direct-action mode is selected; the scenario, action-arbitration rule, Fate and full-game rules remain unapproved.  
**Merge policy:** The project owner reviews and merges pull requests. Open-branch work is not part of `main` until merged.

This ledger tracks completion and decision gates. A document, passing test, simulation, or prototype existing does not by itself mean the related design question is settled.

## 1. Current state at a glance

| Area | State | What is established—and what is not |
|---|---|---|
| Initial browser experiment | **Merged — PR #6** | A deterministic three-moment comparison lab exists. Its state/objectives/policy are test-only. |
| Story-first iteration | **Merged — PR #7** | Authored story beats, direct-intention as default, handoff, and condition meters exist. The interface is still an experiment, not the finished game. |
| Enumerator and fixture validation | **Merged — PR #8** | Fail-closed input/config validation is in main; the independent audit remains open. |
| Input-derived UI diagnostics | **Merged — PR #10** | Ranking diagnostics are removed from the player UI; the PR's 17 Node tests and 390 × 844 Chromium smoke passed before merge. Human playtesting remains outstanding. |
| Story premise / Fate ending | **Draft — PR #9** | The trace compares physical direction, stale-information relay and post-incident attribution. A is plausible but unproven, B is conditional, C is weak; the three-viable-route gate remains open. Nothing is canon. |
| Human playtesting | **Not done** | The owner gave useful but limited first-prototype feedback. There has been no uncoached session of the improved narrative-first experience. |
| Production engine, online play and persistence | **Not started / not approved** | No production architecture or full-game rules should be inferred from the local prototype. |

Pull requests: [#6](https://github.com/ShreyasGautam01/fate-ctrl/pull/6), [#7](https://github.com/ShreyasGautam01/fate-ctrl/pull/7), [#8](https://github.com/ShreyasGautam01/fate-ctrl/pull/8), [#9](https://github.com/ShreyasGautam01/fate-ctrl/pull/9), [#10](https://github.com/ShreyasGautam01/fate-ctrl/pull/10).

## 2. Refined product direction

These guide the next experiment; they do not amount to a final ruleset.

- **Two players, one protagonist:** players compete through their influence over Jules, while the eventual Fate system pursues its own scenario-defined outcome and may create reasons for temporary cooperation.
- **Direct-action mode is selected:** players privately choose a concrete action they want Jules to take and infer possible consequences from observed events. Environmental influence remains only as a historical comparator in the existing experiment, not a co-equal mode for new gameplay unless the owner explicitly reopens it.
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

### Merged PR #8 — Enumerator input/config validation
Input/config validation now rejects malformed paired submissions and invalid rule configuration shapes. Its PR runs passed 16 Python and 16 Node tests. This does not replace the independent end-to-end audit of the enumerator, fixture and control-model contract.

### Merged PR #10 — Player-interface privacy and browser smoke
The ranking inspector and input-derived diagnostics are removed from the normal player UI, and decision/aftermath labels are clearer. Its branch passed 17 Node tests and a pinned Chromium smoke at 390 × 844. This is browser automation evidence, not human playtest evidence or a security guarantee for online hidden information.

### Earlier design and audit foundation
- `CONTROL_MODEL.md`, `scenarios/control_model_test_fixture.json`, `tools/control_model_enumerator.py`, its tests, and the report provide a small reproducible comparison harness.
- `INFORMATION_MODEL.md`, `ARCHITECTURE.md`, and `MODULE_CONTRACTS.md` describe conceptual information boundaries and responsibility ownership; they are not a final production architecture.
- `DECISIONS.md` contains the current decision status and rationale.
- `PROJECT_HANDOFF.md` is the concise continuation brief.

Historical simulations and workshop documents are evidence of prior reasoning, not competing authorities where they conflict with the active contract or executable fixture.

## 4. Review queue and validation evidence

### Merged PR #8 — Enumerator input/config validation
The branch adds checks for exactly two submissions, unique and ordered tie-break entries, terminal-boundary consistency with the configured round count, supported influence-composition modes, integer selector signals (excluding booleans/fractions), and supported influence shapes. It adds Python/browser regression tests and a Python CI workflow. The PR reports successful CI with 16 Python tests and 16 Node tests.

**Still not proven:** the implementation has not been independently audited end-to-end against the fixture and `CONTROL_MODEL.md`; passing tests cannot show that every contract nuance is covered.

### Merged PR #10 — Keep input-derived diagnostics out of the player UI
The branch removes ranking diagnostics from the normal UI, clarifies timeline labels, adds regression tests and pinned Playwright/Chromium browser smoke coverage. Its reported 17 Node tests and browser smoke passed at 390 × 844, including a complete direct-intention run, meter and terminal checks, handoff/privacy checks, and an environmental-influence run.

**Still not proven:** human comprehension, fun, fairness, all-browser visual quality, or secure hidden information. The local browser still holds submissions in memory. The changes are now in main. The browser smoke tested the PR branch before merge; passing smoke tests are not evidence of human comprehension, fairness or fun.

### PR #9 — Causal-route draft
The draft now includes three route hypotheses and adversarial mini-replays: physical direction captured without context; stale information relayed through an existing channel; and post-incident attribution competing with correction. The desk review provisionally finds A plausible but unproven, B conditional on bounded channel reach, and C currently weak. The three-viable-route gate remains open, as do objective coupling and the original citywide-scale question. No route is canon.

## 5. Active tasks and exit criteria

### P0-01 — Independently validate the comparison harness
**Status:** Input/config validation is merged via PR #8; independent audit remains open.  
**Next:** Independently inspect the enumerator, fixture and contract together; reconstruct selected actions and terminal routes without relying on the report as authority; record counterexamples and rule gaps before changing policy.

The historical enumeration reported:
- Direct intention: 5 reachable nonterminal states, 264 transition evaluations across path prefixes, 204 complete input sequences; A-only 42, B-only 36, both 126.
- Environmental influence: 7 reachable nonterminal states, 1,257 transition evaluations, 1,146 complete input sequences; A-only 642, B-only 9, both 495.

These are counts of paths under different state-dependent input sets, **not probabilities, win rates or balance scores**. A draft reconstruction suggests the nine W B-only sequences share a narrow pattern involving an early positive thread signal, a public early evidence reveal, and a final deadline return. Independently reproduce this route and decide whether it exposes an intentional trade-off or a fixture artifact.

**Exit:** An independent reviewer reproduces implementation results, understands all objective paths and input-sensitivity results, and distinguishes code defects from product choices.

### P0-02 — Define protagonist response and agency
**Status:** Direct-action mode is selected by owner direction. The comparison fixture's support-count selector is historical and is not the P2 production resolver. Sections 10–13 preserve the earlier umbrella/transit arbitration test; the current scenario-design gate is the borrowed-radio paper trace in `SCENARIO_CAUSALITY_REVIEW.md` §§15.1–15.7. No resolver is approved for implementation.  
**Next:** Obtain an uncoached reconstruction of §15.5's targeted matrix and close the remaining stale/invalid, route-paddle, role-swap and resource-state gaps. The cue rule remains: latest complete radio destination wins; otherwise use the paddle; otherwise hold; a truncated message preserves any earlier complete destination. The proposed “verify route and relay correction” compound action is rejected under the one-task-per-four-minute-action contract. T0's Fate target remains blocked by missing operator attribution. Continue §15.8's T2-F2 paper test: Beat 2 pits the long verified R4 instruction against review/attach; the candidate priority favours routing before arrival. Beat 3 adds a new **Ask Ren privately about R4's reliability** counterplay action based on the double beep; the old S3-V-H priority table does not include this action, so conversation-versus-review priority must be tested rather than assumed. F2 only earns progress if it actually intercepts a selected Review/attach attempt and all report/queue/private-follow-up predicates hold at sign-off. Audit the generic Fate cue, player-view leakage, resource spend on unused activation, one-beat expiry, and the candidate Beat 4 retry window. Define Ren's response/trust outcome and post-sign-off action availability before scoring objectives; reject F2 if 18:24 is terminal.
**Exit:** The resolver is deterministic and reconstructable; both legal proposals have meaningful effects in some states; role swaps are fair; no raw intentions leak; Jules acts only on acquired knowledge; and narration cannot choose outcomes.

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
**Status:** `scenarios/umbrella.json` remains a story probe; PR #9 is a draft and neither premise is canon. A first P2 borrowed-radio three-beat trace, direct-action pair matrix and causal-route screen exist in `SCENARIO_CAUSALITY_REVIEW.md` §§15.1–15.7. This is authored desk work, not independent reconstruction. R1 (stale display relay) is conditional, R2 (truncated correction) is a plausible event mechanism but a weak blame route, and R3 (physical direction) may be a variant of R1 rather than a third distinct route. The three-route gate remains open.  
**Next:** Do not implement P2 or add an arbitrary cutoff to rescue P0. Obtain an uncoached reconstruction of §§15.1–15.8. T0 (Jules-specific transmission blame) remains unsupported; do not add a custody log or authenticated-speaker mechanic. T1 (report omission alone) overlaps A's private-handling goal. T2-F2 is a paper-test candidate: the first report omits the warning, Jules has not privately raised it with Ren, the queue/delay is recorded, and F2 actually intercepts a selected Review/attach attempt. Ren already knows the warning from the seeded acknowledgement; the new private counterplay is to ask him about R4 after the audible double beep. This is distinct from the formal Review/attach action and is not blocked by F2. F1's direct report-attachment hold is rejected. F2 spends 1 provisional unit on activation, but an unused/ineffective activation earns no progress; a real Beat 4 (18:24–18:28) retry window must exist or F2 must be rejected. Add role-symmetric tests for route-versus-review, conversation-versus-review and review-versus-return; audit player projections; define Ren's response/trust rule. Do not change executable fixtures or scenario canon until the target, Fate intervention and three-route gate are independently reviewed.
**Exit:** Facts, evidence provenance, knowledge, timing, causes, audience response, objectives, counterplay and endings form a coherent trace without unsupported coincidence.

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
**Status:** PR #7, PR #8 and PR #10 are merged. PR #10's branch passed 17 Node tests and Chromium smoke at 390 × 844 before merge.  
**Next:** Verify the combined main-branch build, then perform a human comprehension and visual/accessibility review.  
**Exit:** Natural-language choices are understandable; story accurately describes resolved events; meters show real tracked state and deltas without false precision; the normal UI omits submissions and input-derived diagnostics.

## 6. Recommended next sequence

1. Obtain an uncoached reconstruction of the P2 radio paper trace in `SCENARIO_CAUSALITY_REVIEW.md` §§15.1–15.7, including the now-expanded paddle/radio matrix. The reviewer should reconstruct radio behavior, source evidence, event ordering, action preconditions and counterfactual outcomes without coaching.
2. Finish the remaining matrix gaps: relevant stale/invalid proposals, role swaps, route-paddle pairs and resource-state variants. Integrate **Ask Ren privately about R4's reliability** into the state/action matrix; its conflict with Review/attach has two materially different candidate priorities and neither is approved. Preserve direct-action role symmetry and never let F2 choose the protagonist action.
3. Have the reviewer classify R1–R3 independently and compare T0 with T2-F2. The T2-F2 trace is authored desk work only: it must survive the Beat 2 route-versus-review priority check, the Beat 3 conversation-versus-review priority check, the F2 eligibility/expiry/counterplay review, player-view projection audit, and an actual post-sign-off retry window. Do not count a shared timestamp/checklist as causal proof.
4. Separately complete the historical enumerator/fixture/contract audit and verify combined main-branch CI/browser checks after PR #8 and PR #10. Do not interpret path counts as probabilities or balance scores.
5. Use Stage -1B in `PLAYTEST_PLAN.md` to reconstruct the older Target 1 mechanisms/objective slice, but do not let that exercise replace the new P2 review. If P2 fails the causal/objective gate, compare another premise rather than implementing Fate.
6. Only after a coherent scenario and action contract pass review, build a narrow story-first direct-action slice with understandable choices, observable consequences and a few causally grounded indicators.
7. Run uncoached think-aloud sessions on that slice. Revise until story, rules, inference and pacing work together.
8. Only after those gates, decide whether online multiplayer is necessary and design server-authoritative views, persistence and operations accordingly.

## 7. Change discipline

Record substantive decisions in `DECISIONS.md`; put blockers and exit criteria here; use `PROJECT_HANDOFF.md` for the compact handover. Keep one executable comparison fixture and keep it separate from scenario canon. Do not add analysis files unless they provide reproducible evidence. Label each claim as authored analysis, automated result, independent review, browser verification or human playtest evidence.
