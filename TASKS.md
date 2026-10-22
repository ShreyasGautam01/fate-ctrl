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
**Next:** Obtain an uncoached reconstruction of the expanded §15.5 matrix and remaining paddle/radio/thread/handover pairs, stale/invalid proposal effects and role swaps. The former S3-U gap is now split into two authored histories (paddle-origin and stale-radio-origin), with three representative pairs explicitly marked unresolved; the gate is **not closed** and no S3-U priority order is approved. Track Jules's location/access, R4 possession, prior-warning knowledge/attachment and what can actually resolve before 18:24 sign-off. The short-radio action now explicitly requires R4 to remain available; existing S3-V rows apply only to the worked branch with R4 available, not states where it was returned early. Define terminal/post-sign-off consequences before ranking route verification against evidence inclusion, and decide whether any compound verify-and-communicate action is legal. R3 lacks a camera-footage retrieval/attachment action and may share R1's stale-direction hinge, so it cannot count as a Fate route. Verify hard preconditions and event order at 18:20/18:24. A role-symmetric resolver must not reveal submissions, make Jules omniscient or invent an unproposed third action.  
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
**Next:** Do not implement P2 or add an arbitrary cutoff to rescue P0. Obtain an uncoached reconstruction of §§15.1–15.7. The reviewer must identify each causal hinge, distinguish what the evidence proves from what it does not prove, and name one legal counterfactual that defeats each route. Paddle pairs are only partially covered; the late-queue state with route still unknown (S3-U) needs its own action/priority trace. R3 cannot count toward Fate's current milestone until a legal camera-footage retrieval/attachment path is specified, and it may still duplicate R1. If fewer than three materially distinct routes survive, reject P2 or develop a genuinely different third mechanism before executable scenario work. Keep `scenarios/umbrella.json` and the executable comparison fixture unchanged.  
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
2. Finish the remaining matrix gaps: relevant stale/invalid proposals, role swaps, and the route-paddle pairs not yet covered. R3 cannot count as a route toward Fate's current milestone until the camera footage can be legally retrieved/attached; it may also share R1's underlying stale-direction cause. Do not treat a wider list of moves as proof of materially different routes.
3. Have the reviewer classify R1–R3 independently. R1 is conditional, R2 is a plausible incident mechanism but a weak blame route, and R3 may be a physical-channel variant of R1 and is currently missing a defined evidence-access step. The final-beat matrix is scoped to S3-V; the unverified-route S3-U branch still needs a separate legal-action/priority pass. Do not force three routes to pass. If fewer than three materially distinct routes survive, reject P2 or develop a genuinely different third route before executable scenario work.
4. Separately complete the historical enumerator/fixture/contract audit and verify combined main-branch CI/browser checks after PR #8 and PR #10. Do not interpret path counts as probabilities or balance scores.
5. Use Stage -1B in `PLAYTEST_PLAN.md` to reconstruct the older Target 1 mechanisms/objective slice, but do not let that exercise replace the new P2 review. If P2 fails the causal/objective gate, compare another premise rather than implementing Fate.
6. Only after a coherent scenario and action contract pass review, build a narrow story-first direct-action slice with understandable choices, observable consequences and a few causally grounded indicators.
7. Run uncoached think-aloud sessions on that slice. Revise until story, rules, inference and pacing work together.
8. Only after those gates, decide whether online multiplayer is necessary and design server-authoritative views, persistence and operations accordingly.

## 7. Change discipline

Record substantive decisions in `DECISIONS.md`; put blockers and exit criteria here; use `PROJECT_HANDOFF.md` for the compact handover. Keep one executable comparison fixture and keep it separate from scenario canon. Do not add analysis files unless they provide reproducible evidence. Label each claim as authored analysis, automated result, independent review, browser verification or human playtest evidence.
