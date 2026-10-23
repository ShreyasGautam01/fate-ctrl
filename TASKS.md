# Project Plan and Task Ledger

**Last reconciled:** 2026-10-23  
**Current phase:** Direct-action mode selected; premise discovery after the failed/partial P2 reconstruction; no replacement premise or production rules selected.  
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
| Story premise / Fate ending | **Merged design work — PR #9** | The borrowed-radio trace is merged as provisional documentation. Independent reconstruction, a credible Fate target, and the three-viable-route gate remain open. Nothing is canon. |
| P2 first-pass reconstruction | **AI desk review complete — fail/partial** | Claude's 2026-10-23 first-pass response is recorded in `P2_RECONSTRUCTION_REVIEW_01.md`. It disclosed possible priming and is not a human review or playtest. Core target, objective, priority and terminal issues remain. |
| Replacement premise screen | **Exploratory analysis drafted; gate open** | `PREMISE_DISCOVERY_SCREEN_01.md` compares new premise candidates. `CAMPUS_FEST_CAUSAL_SKELETON_01.md` sketches a leading candidate but explicitly fails to prove its third route yet. No premise is canon; no playtest has validated the ratings. |
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

### Merged PR #9 — Causal-route challenge (still provisional)
The documentation was merged into main on 2026-10-22. The paper trace compares a stale-display relay, a truncated verified transmission, and physical paddle direction, but none is accepted as a viable Fate route to the current attribution-specific target. The priority policy, evidence/knowledge projection, Ren's response/trust rule, full terminal horizon, and three-route gate remain open. Merge status does not make any route or scenario canon.

### P2 first-pass reconstruction — AI review received 2026-10-23
**Result: FAIL / PARTIAL RECONSTRUCTION.** See `P2_RECONSTRUCTION_REVIEW_01.md` for the finding register F-01–F-25 and the evidence boundary. The reviewer was Claude (AI), reported using an external throwaway model for selected checks, and disclosed that it read the `PLAYTEST_PLAN.md` diff, creating a possible priming concern. This is not human independent reconstruction or a playtest.

Key blockers: (1) A1 + A2 are infeasible together within the three single-task beats if intended conjunctively; (2) no seeded source establishes that Jules operated R4; (3) no three materially distinct routes support the same current Fate target; (4) selector priorities omit many legal action pairs, especially those involving RL; (5) Beat 4 begins after sign-off predicates are evaluated; (6) queue/delay can arise from Mina's default hold without a Jules-caused error; and (7) Fate activation/resource/progress and player-view leakage rules remain undefined.

**Decision gate:** do not patch each finding independently. First reconsider the Fate target against existing evidence, simplify/clarify the objective structure, define the terminal horizon and objective-evaluation time, then define a complete proposer-blind selector and information projection. Keep P2 and both executable fixtures provisional and unchanged until those decisions are reviewed.

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
**Status:** Direct-action mode is the owner-selected direction. The comparison fixture's support-count selector is historical and is not the P2 production resolver. The P2 reconstruction packet received a first-pass AI review on 2026-10-23; see `P2_RECONSTRUCTION_REVIEW_01.md`. The review found that H1/H2 each rank only one of ten legal distinct-action pairs at B1/B2, while H3 leaves all pairs involving the still-legal long instruction RL unresolved. Role-swap invariance held on the tested H3 pairs, but this does not establish objective fairness or a complete resolver. No production resolver is approved.
**Next:** Do not add arbitrary priority rows to make the existing trace work. First decide whether the current objective/target structure is viable. If retained, define a complete resolution contract for every legal pair/state, including invalid proposals, same-action consensus, no-op actions, actor-independent selection, action locations, acquired observations and post-resolution visibility. Then generate matched counterexamples and re-run the reconstruction packet.
**Exit:** The resolver is deterministic and reconstructable; legal proposal pairs have an explicit outcome; role swaps are fair by stated criteria; no raw intentions leak; Jules acts only on acquired knowledge; and narration cannot choose outcomes.

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
**Status:** The AI first-pass reconstruction failed/partially reproduced P2; findings are recorded in `P2_RECONSTRUCTION_REVIEW_01.md`. `P2_TARGET_VIABILITY_SCREEN_01.md` records why T0 is unsupported, T1 is weak alone, T2-F2 misses its evaluation window, and T3 is only a possible local mechanics target. The current routes do not pass the three-materially-distinct-route gate. No route or premise is canon.
**Next:** The exploratory Candidate A skeleton is in `CAMPUS_FEST_CAUSAL_SKELETON_01.md`. Its three-route gate is **not passed**: the shared-microphone route may collapse into the schedule or announcement route, and the audience-response rule needs independent challenge. The next step is a blinded reconstruction that tests R1/R2/R3 separately, attacks each counterplay claim, and checks objective feasibility. Candidate B remains a fallback. Do not add more P2 priority rows, invent evidence, or change production code. P2 may remain a mechanics stress test if it isolates a bounded rule question. Keep `scenarios/umbrella.json` and `scenarios/control_model_test_fixture.json` unchanged.
**Exit:** The chosen target is measurable and evidence-supported; facts, knowledge, timing, causes, counterplay, objective feasibility and terminal states form a coherent trace; three materially distinct routes survive independent reconstruction; and a credible non-Fate ending exists.

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

1. Review `P2_RECONSTRUCTION_REVIEW_01.md` and `P2_TARGET_VIABILITY_SCREEN_01.md`. The AI first pass failed/partially reproduced the packet; its disclosed possible priming and non-human-review status remain part of the evidence record.
2. The initial Campus Fest skeleton is in `CAMPUS_FEST_CAUSAL_SKELETON_01.md`; its R3 shared-microphone route has not passed the distinctness gate. Run a blinded, route-isolated reconstruction and challenge the crowd-response and counterplay assumptions before writing a full packet. Community Fair remains a fallback if this fails.
3. The reconstruction must check feasible A/B outcomes, the exact Fate terminal predicate, three genuinely distinct causal hinges, two counterplay paths, information ownership, bounded Fate intervention, terminal timing and a credible non-Fate ending.
4. Record possible reviewer priming and distinguish AI desk review from human playtesting. If a route collapses into another, do not pad the route count; revise or reject the candidate.
5. Only after a candidate passes reconstruction should the team define a complete proposer-blind resolver/player-view contract and implement a narrow story-first slice. Keep `scenarios/umbrella.json` and `scenarios/control_model_test_fixture.json` unchanged until the design gate passes.
6. Separately continue the historical enumerator/fixture/contract audit. The latest prototype-test and browser-smoke runs passed on PR #10's code merge commit; PR #9 was documentation-only and had no new code workflow run.
7. Only after a revised design passes reconstruction should the team build a narrow story-first direct-action slice and conduct uncoached human think-aloud sessions.


## 7. Change discipline

Record substantive decisions in `DECISIONS.md`; put blockers and exit criteria here; use `PROJECT_HANDOFF.md` for the compact handover. Keep one executable comparison fixture and keep it separate from scenario canon. Do not add analysis files unless they provide reproducible evidence. Label each claim as authored analysis, automated result, independent review, browser verification or human playtest evidence.
