# Control Model — Revised Test Contract 0.2

**Status:** Revised specification candidate; not accepted production rules.  
**Decision owner:** Project owner.  
**Evidence class:** Claude Sonnet 5.5 audit received; corrections below are desk/specification repairs. No independent reconstruction or human playtest is claimed.  
**Scope:** Define a reproducible, test-only comparison between direct intention and environmental influence. This document is the single active working reference for that comparison. Older traces are historical analyses when their assumptions differ.

## 1. Decision and system boundaries

FATE/CTRL is intended to let two players influence one protagonist, Jules, while pursuing partly conflicting objectives. Fate is a bounded scenario opponent. The authoritative game state and outcomes must be deterministic; narration explains results but does not decide them.

The decision being tested is the player's **unit of control**:

- **Direct intention (I):** a player nominates an action they want Jules to take. The nomination gives that action limited support in Jules's selection policy; it is not a command.
- **Environmental influence (W):** a player applies a bounded effect to an existing world condition or opportunity. That effect changes the state/context that Jules's selection policy reads; it does not choose Jules's action directly.

Do not conflate the unit of control with timing, resources, or the final protagonist policy. For this comparison, hold timing constant: each player makes one private submission per round, the submissions resolve together, and Jules takes at most one major action. This is an experimental control, not a decision that simultaneous play is the final product.

### Comparison architecture

The minimum conceptual pipeline is:

1. **Scenario fixture:** validated facts, access, knowledge, objective predicates, initial state, and boundary schedule.
2. **Player-view projection:** each player receives only authorized facts/objectives.
3. **Mode-specific submission adapter:** validate and interpret either intentions or environmental influences.
4. **Mode resolution:** intentions produce bounded support counts; influences apply typed world/context effects and deterministic conflict rules.
5. **Legal-action generator:** calculate Jules's available actions from canonical state and Jules's knowledge.
6. **Protagonist selector:** rank legal actions by one shared, deterministic decision procedure.
7. **Action executor:** apply exactly one selected action and emit typed events.
8. **Knowledge/character response step:** transfer information only through defined acquisition events; apply the fixture's deterministic flatmate response.
9. **Objective evaluator:** compute progress and terminal predicates from state/events, never from submissions alone.
10. **Deadline/effect boundary:** evaluate objectives while the flatmate is still present, expire temporary signals, decrement the boundary counter, then process departure.
11. **View/explanation projection:** return audience-safe reason codes and outcomes.

These are logical responsibilities, not necessarily separate classes or services. The first comparison should be an offline deterministic enumerator over small states and submissions, not a browser game, online service, or production architecture.

## 2. Hard constraints

Both candidates must obey these conditions:

- A submission is not an unconditional command over Jules.
- Jules cannot use information not in Jules's knowledge state.
- Player-private information never transfers to Jules automatically.
- No effect creates an unsupported fact, witness, recording, evidence item, character, or institution.
- The same state, rules version, and accepted submissions produce the same state/events.
- Every selected or rejected action has an internal reason code. Player-facing explanations are filtered so they do not reveal an opponent's private objective or private evidence.
- Objective progress comes from resolved state/events, not from making a submission.
- Fate cannot use a milestone until its prerequisites are satisfied.
- Temporary context effects and persistent world-state changes are distinct and have explicit expiry semantics.
- Do not add a hybrid, bid, reaction phase, random roll, or LLM action selector to patch a weakness before the pure candidates have been tested.

## 3. Shared test fixture

The following facts are deliberately specific so the experiment is reproducible. They are **test-fixture assumptions**, not accepted canon for the game's story.

### World and timeline

- Jules borrowed a red umbrella from a flatmate. A loose rib existed before the loan; Jules later worsened a tear. These are two distinct condition events.
- A shared household message thread exists and is accessible from Jules's phone. Jules knows this thread exists but has not inspected the relevant older messages. Access to the thread is not knowledge of its contents.
- The thread contains a dated photo of the loose rib and a message sent by the flatmate before the loan: “The rib is still loose—I noticed it yesterday. Jules is borrowing the umbrella, and I haven't told them about it.” This test message is intentionally strong evidence of prior knowledge and nondisclosure. It exists in the fixture from the start; no influence can invent it.
- Player B's private briefing says the relevant message is in the thread. Player A is not given this information. Neither player's knowledge automatically becomes Jules's knowledge.
- A repair kit exists in the apartment but is initially stored out of immediate reach. It can be brought within reach without creating a new object.
- The flatmate is reachable in rounds 1, 2, and 3, and leaves immediately after Jules's action at the end of round 3. The countdown at the beginning of those rounds is respectively 3, 2, and 1 boundaries remaining.
- A quiet, private conversation space exists in the apartment. It can be made available for the current disclosure action, but a private window is not active at round start. This is a seeded opportunity, not a new place created by an influence. This is not a claim that an actual public emergency, broadcast, or Fate route exists.
- There is one major protagonist action per round. A player submission consumes that player's single submission for the round; no separate token economy is assumed in this comparison.
- The test excludes the Fate/public-blame finale. No public emergency or public evidence channel is established, so that Fate milestone is ineligible.

### Initial state

| Field | Initial value |
|---|---|
| round / boundaries remaining | 1 / 3 |
| umbrella returned | false |
| Jules acknowledged their later tear | false |
| repair kit exists | true |
| repair kit within reach | false |
| repair plan prepared | false |
| message thread exists and is accessible | true |
| Jules knows the thread exists | true |
| thread inspected by Jules | false |
| evidence presented to flatmate | false |
| flatmate prior knowledge established to Jules | false |
| trust | 1 (the fixture's baseline) |
| flatmate reachable | true |
| private conversation option exists | true |
| private window active at round start | false |
| flatmate departed | false |
| temporary action-context signals | zero |

### Test objectives

These predicates are intentionally concrete enough to test. They are not a final scoring design.

- **Player A — preserve trust through honest return:** complete when the umbrella is returned before departure, Jules acknowledges the tear Jules caused, and trust is at least the initial baseline (1).
- **Player B — establish accountability with evidence:** complete when Jules has inspected the seeded message, presented it to the flatmate before departure, and the flatmate's prior knowledge is acknowledged from that evidence.

A prepared repair plan and an inspected source are progress, not terminal success by themselves. The photo alone proves only the earlier condition; the accompanying message supplies the evidence of prior knowledge and nondisclosure.

### Deterministic relationship-response hypothesis

This test needs a rule for the trust predicate rather than an assumption about human psychology:

- Trust begins at 1.
- If Jules presents the message before acknowledging their own later damage and **no private window is active**, trust falls to 0.
- If Jules has already acknowledged the later damage before presenting the message, trust remains at 1.
- If a private window is active during presentation, the disclosure is private rather than humiliating; trust remains at 1 even if Jules has not yet acknowledged their own damage.
- A later honest return does not restore trust that fell to 0 in this three-round fixture.

This is a deliberately strong ordering hypothesis to make the objective trade-off observable. It needs owner approval and later human testing before being treated as game canon. The fixture must not imply that this is a general model of real human trust.

## 4. Legal protagonist-action vocabulary

All actions below consume Jules's one major action for the round when selected. Preconditions are evaluated after any environmental effects for that resolution, but before the action executes.

| Action | Preconditions | Authoritative effect | What it does not do |
|---|---|---|---|
| FETCH_REPAIR_KIT | Kit exists and is not within reach | Set repair kit within reach; emit KitMovedWithinReach | Does not prepare a repair plan or return the umbrella |
| PLAN_REPAIR | Kit within reach and no plan prepared | Set repairPlanPrepared=true; emit RepairPlanPrepared | Does not repair/return the umbrella or complete A's objective |
| INSPECT_SHARED_THREAD | Thread exists, is accessible, Jules knows the thread exists, and it is not yet inspected | Set threadInspected=true; Jules learns the photo's visible condition and the seeded message's content; emit EvidenceInspected | Does not disclose evidence to the flatmate or complete B's objective |
| PRESENT_EVIDENCE | Thread has been inspected; flatmate is reachable; evidence has not already been presented | Set evidencePresented=true; flatmate acknowledges what the seeded message establishes; emit EvidencePresented and PriorKnowledgeAcknowledged; apply the trust-response hypothesis in §3 | Does not return the umbrella or erase Jules's responsibility for the later tear |
| RETURN_HONESTLY | Umbrella has not been returned; flatmate is reachable | Set umbrellaReturned=true, ownDamageAcknowledged=true, repairOfferMade=true; emit HonestReturn | Does not restore trust already lost under the test hypothesis |
| WAIT | Always | No protagonist state change; deadline boundary still proceeds | Does not preserve the current round or stop departure |

The test vocabulary is finite. No generic “do what feels right” action, arbitrary state patch, or unseeded evidence discovery is allowed. A later test may add actions only with explicit preconditions, state effects, events, cost, target-change behavior, and visibility.

## 5. Candidate I — Direct-intention semantics

Each player submits one action identifier from the vocabulary above. A submission must be legal in the round-start state and consistent with Jules's knowledge/capability. An invalid proposal adds no support and is logged internally with a stable reason.

**Chosen semantics for this comparison:** all legal actions remain candidates; a legal proposal adds one support mark to that action. The proposal does not restrict the candidate set and does not directly execute the action.

- support(action) is 0, 1, or 2 according to how many players submitted that legal action;
- duplicate proposals are one action candidate with support 2, not two executions;
- incompatible proposals each contribute support to their own action;
- an invalid/stale proposal contributes support 0;
- if neither proposal is legal, Jules still selects from all legal actions using the same fallback ranking;
- an unselected proposal has no mechanical effect after this resolution, though an event may record that it was rejected. Do not claim a losing proposal preserves strategic value unless a later rule supplies such value.

This semantics keeps the submission from being an unconditional command while making its causal role testable. It is a provisional comparison contract, not a final product decision. If the owner later prefers “Jules chooses only among nominated proposals,” that is a different model and must be tested as such, including unanimous proposals that conflict with character priorities.

## 6. Candidate W — Environmental-influence semantics

Each player submits one typed influence. Valid effects operate on seeded state and are applied before Jules's action is chosen. Effects can alter either a persistent world condition or a temporary, explicit action-context signal.

### Minimum effect vocabulary

| Influence | Preconditions | Effect consumed by the selector | Duration / failure behavior |
|---|---|---|---|
| PASS | Always | No state/context change | Consumes the submission slot; permits a player not to apply a specific influence |
| SET_THREAD_PROMINENCE (direction=up/down) | Thread exists, is accessible, Jules knows the thread exists, and it is not inspected | Up sets the temporary selector signal for INSPECT_SHARED_THREAD to +1; down sets it to -1 | Current action selection only; source contents remain unknown and accessibility/truth do not change |
| SET_EVIDENCE_PROMINENCE (direction=up/down) | Thread has been inspected; evidence has not been presented; flatmate is reachable | Up sets the temporary selector signal for PRESENT_EVIDENCE to +1; down sets it to -1 | Current action selection only; does not present evidence or open a private conversation |
| MOVE_REPAIR_KIT_WITHIN_REACH | Kit exists and is not within reach | Persistently set repairKitWithinReach=true; PLAN_REPAIR becomes legal after effects resolve | Persistent physical state change; fails if kit is absent or target condition is stale |
| OPEN_PRIVATE_WINDOW | Private conversation option exists; flatmate is reachable; evidence is already inspected and not yet presented | Set privateWindowActive=true for the current action/response step and contribute +1 to the selector signal for PRESENT_EVIDENCE | Does not disclose evidence itself; expires after this action/response step if unused |

An influence consumes the player's one submission for the round. This fixture has no additional token cost. Temporary thread/evidence signals expire after action selection, whether or not the action uses them. A private window and its signal expire after the action/response step if unused. Moving the existing kit is persistent because it changes the physical setup; it is not automatically reset at the boundary.

### Composition and conflict rules

- SET_THREAD_PROMINENCE with opposite directions targets the same temporary signal. If up and down are both validly submitted in one resolution, they cancel to 0. Both submissions are consumed; neither changes evidence or thread accessibility.
- SET_EVIDENCE_PROMINENCE uses the same opposite-direction cancellation rule for the PRESENT_EVIDENCE context signal.
- Repeating the same prominence direction is capped at its defined value (+1 or -1); it does not stack.
- MOVE_REPAIR_KIT_WITHIN_REACH is compatible with either prominence signal. Duplicate moves are idempotently coalesced into one persistent transition; both submitters are recorded as contributors and neither makes the other stale.
- OPEN_PRIVATE_WINDOW is compatible with other valid effects. Duplicate opens coalesce into one current-round private window. Its +1 presentation signal combines with the evidence-prominence signal and is clamped to the range [-1,+1]; the private-window trust protection remains active even when the combined signal is 0.
- Compute effects from a shared round-start snapshot and group them by target before mutating canonical state. Signal conflicts are resolved by the rules above; independent persistent changes are then applied in stable effect-type/target-ID order. Do not let arbitrary iteration or player ID determine the winner.
- Revalidate target preconditions as a group before application. If a target is stale, the effect fails with a stable internal reason, does not mutate state, and still consumes the submitted influence slot in this test. Any player-facing reason must be visibility-filtered.
- No influence directly selects a protagonist action. It must change a state/context value that the legal-action generator or selector actually reads.

The effect set is intentionally tiny. If the team cannot explain why an influence changed the outcome from the resulting state, that effect is not sufficiently specified.

## 7. Shared deterministic protagonist-selection procedure

The policy is scenario-authored. It must run the same way in both candidates; the only difference is the input channel that supplies support or context. Player objectives do not appear as character motives in the ranking function.

### Step 1 — Derive the legal action set

Apply the action preconditions in §4 to the post-influence state and Jules's current knowledge. If the set is empty due to a specification defect, fail the fixture validation; do not invent a story action. WAIT is always legal, so ordinary valid states always have a fallback.

### Step 2 — Assign each legal action a rank tuple

Compare actions lexicographically, highest tuple first:

**(actionTier, contextSignal, directSupport, deadlineTier, tieBreakRank)**

- **actionTier:** use the table below. A rank of 2 represents a meaningful current route; rank 1 is a lower-priority preparation action; WAIT is 0.
- **contextSignal:** in W, use the temporary signal for the action (normally -1, 0, or +1). Thread-prominence effects modify INSPECT_SHARED_THREAD; evidence-prominence effects and OPEN_PRIVATE_WINDOW modify PRESENT_EVIDENCE. If both effects target PRESENT_EVIDENCE, add the private-window +1 to the resolved evidence-prominence signal and clamp to [-1,+1]. In I this field is always 0. MOVE_REPAIR_KIT_WITHIN_REACH affects legality, not contextSignal.
- **directSupport:** in I, use the valid support count (0–2). In W this field is always 0.
- **deadlineTier:** RETURN_HONESTLY gets 3 only when exactly one boundary remains and it is legal; every other action gets 0. At earlier boundaries all actions get 0. This is deliberately after the mode-specific contribution, so a deadline adds strong pressure without making every player input irrelevant on the final round.
- **tieBreakRank:** use the fixed test-fixture action order below. It is intentionally a provisional character choice, not a neutral or universal rule.

| Action | actionTier condition |
|---|---|
| PRESENT_EVIDENCE | 2 if legal |
| INSPECT_SHARED_THREAD | 2 if legal |
| RETURN_HONESTLY | 2 if legal; its deadlineTier strengthens it on the final boundary after mode-specific input fields are compared |
| PLAN_REPAIR | 2 if legal and at least two boundaries remain; otherwise 1 |
| FETCH_REPAIR_KIT | 2 if legal and at least two boundaries remain; otherwise 1 |
| WAIT | 0 |

**Fixed test tie-break order, highest first:** FETCH_REPAIR_KIT, PLAN_REPAIR, INSPECT_SHARED_THREAD, PRESENT_EVIDENCE, RETURN_HONESTLY, WAIT.

This order gives a reproducible result when all previous tuple fields tie. It may bias strategy; do not canonize it without a sensitivity check. To prevent a tie-break from becoming an invisible design choice, the enumerator must report whenever it decides an outcome.

### Step 3 — Execute one selected action

Execute the highest-ranked legal action once. The selector must retain the complete candidate list, each action's tuple, the winner, and the first differing tuple field that decided the result. If two submissions are tied, the tie-break is part of the result and is recorded.

### Step 4 — Update knowledge, responses, and objectives in a fixed order

Use this fixture order, from top to bottom:

1. Validate both submissions against the start snapshot.
2. Resolve valid W effects (or calculate valid I support counts).
3. Revalidate and apply persistent environmental changes; derive the legal protagonist action set.
4. Rank legal actions and execute exactly one.
5. Apply action events and explicit knowledge acquisition.
6. Apply the deterministic flatmate response/trust rule if PRESENT_EVIDENCE or RETURN_HONESTLY occurred.
7. Evaluate objective progress and completion while the flatmate is still present.
8. Expire temporary context signals.
9. Decrement boundaries remaining.
10. If the counter reaches zero, mark the flatmate departed. No further action can reach the flatmate after this point.
11. Recompute terminal status and filtered player views; narrate only the authorized resolved events.

This order is a fixture contract, not an accepted global game-resolution contract. Fate is absent from this test. Before production, the broader D-010 phase order must reconcile objective evaluation, deadlines, effects, Fate, information updates, and terminal conditions.

## 8. Worked trace and sensitivity checks

The table below defines a repeatable **null-submission diagnostic baseline**. The enumerator may use null inputs for sensitivity analysis, but null is not a legal live-player submission: a real round requires one submission from each player. It is not evidence of balance. Inputs can alter the trajectory under the tuple procedure above; all legal paired submissions must also be enumerated.

| Round | Baseline starting state | Baseline selected action | State/event change | Objective status after action |
|---|---|---|---|---|
| 1 (3 remain) | Kit out of reach; thread accessible/uninspected; no plan; flatmate reachable | FETCH_REPAIR_KIT by fixture tie-break among rank-2 actions | Kit comes within reach; no knowledge gained | Neither objective complete |
| 2 (2 remain) | Kit within reach; thread uninspected; no plan; flatmate reachable | PLAN_REPAIR by fixture tie-break among rank-2 actions | Plan becomes ready | Neither objective complete |
| 3 (1 remains) | Not yet returned; thread uninspected; flatmate reachable and departs after this action | RETURN_HONESTLY by deadlineTier=3 | Umbrella returned; own damage acknowledged; trust remains 1; then departure occurs | A complete; B incomplete |

The baseline run deliberately makes it possible to see whether submitted inputs change anything. The following single-submission checks must also be run; their expected mechanics are specified, not claimed as empirical evidence.

| State for test | Input changed from null baseline | Expected difference, and why |
|---|---|---|
| Round 1, initial state | I: one player proposes INSPECT_SHARED_THREAD instead of no proposal | INSPECT gets support 1 while FETCH has support 0; both have actionTier 2, so the direct proposal changes Jules's selected action |
| Round 1, initial state | W: one player submits SET_THREAD_PROMINENCE(direction=up) instead of no influence | INSPECT gets contextSignal +1 and beats FETCH at actionTier 2; the effect changes the selected action but does not reveal message contents |
| Round 2 state with kit within reach, plan already prepared, thread uninspected, flatmate reachable | W: one player submits SET_THREAD_PROMINENCE(direction=down) | INSPECT and RETURN tie on action tier. Without an influence, INSPECT wins by the fixed tie-break order; SET_THREAD_PROMINENCE(direction=down) sets its context signal to -1, so RETURN wins. The selected action changes deterministically |
| Round 2 state after evidence inspected, plan not ready, flatmate reachable | I: one player proposes PRESENT_EVIDENCE rather than no proposal | PRESENT_EVIDENCE gets support 1 and can beat PLAN_REPAIR at the tied actionTier 2 |
| Round 2 state after evidence inspected and flatmate reachable | W: one player submits SET_EVIDENCE_PROMINENCE(direction=up) | PRESENT_EVIDENCE gets contextSignal +1 and may be selected without a private window; if presented before own damage is acknowledged, trust falls to 0 |
| Round 2 state after evidence inspected, kit out of reach, flatmate reachable | W: MOVE_REPAIR_KIT_WITHIN_REACH | PLAN_REPAIR becomes legal after effects; the selector's candidate set changes, and the state transition persists even if Jules does not select PLAN_REPAIR |
| Round 2 state after evidence inspected and flatmate reachable | W: OPEN_PRIVATE_WINDOW | Adds a privacy state for the response and a +1 presentation signal; this can select PRESENT_EVIDENCE while preserving trust, without transferring evidence itself |

If any row does not behave as specified, the trace or the rule contract is defective. The action ranking, not prose, determines the result. The enumerator should evaluate all valid submission pairs and verify these one-input sensitivity tests automatically.

### Objective-order illustration

- **A route:** FETCH_REPAIR_KIT or another early action; later PLAN_REPAIR if useful; RETURN_HONESTLY before departure. A completes only if trust remains at baseline.
- **B route:** INSPECT_SHARED_THREAD, then PRESENT_EVIDENCE before departure. B completes only after disclosure and acknowledgement.
- **Both goals can be achieved under I:** inspect in round 1, return honestly in round 2, present the evidence in round 3. Trust remains at baseline because Jules acknowledges their own damage before disclosure.
- **Both goals can be achieved under W:** surface the thread so Jules inspects in round 1; open a private window and present the evidence in round 2; return honestly in round 3. Trust remains at baseline because the evidence is presented privately; the private window does not itself transfer the evidence.
- **A can be blocked:** inspect in round 1, present evidence in round 2 before acknowledging the later tear and without a private window, then return honestly in round 3. B completes, but trust falls to 0 and is not restored, so A fails.
- **B can be blocked:** use the early rounds for preparation/return choices and leave no action to inspect and present the evidence before departure. Discovering the message and presenting it are distinct actions.

These sequences establish feasibility in the fixture, not overall balance. The trust response, private-window effect, and strength of the message are high-impact scenario assumptions and need explicit owner approval.

## 9. Explainability and information visibility

Internal diagnostics must contain the complete rank tuple, candidate list, accepted/failed submissions, resulting events, and objective deltas. Player-visible explanations must be independently projected by audience:

- A player can receive the visible outcome and a non-leaking reason for why their own submission did or did not affect the action.
- Do not reveal that an opponent targeted a private source or held an undisclosed objective unless the game intentionally reveals submissions at that boundary.
- Do not expose private facts through validation errors, stale-target errors, event identifiers, timing, or debug logs.
- Public events can describe the effect on a visible object or opportunity. Private state changes need their own visibility rules.
- Narration failure or contradiction never changes the result.

## 10. What the comparison is and is not testing

### Held constant

Scenario facts, player objectives, player information boundaries, legal protagonist action vocabulary, action costs, one-action-per-round limit, submission timing, deadline boundary, protagonist preference tiers, flatmate response, objective predicates, and explanation policy.

### Different by design

- I changes per-action directSupport; it does not change world state or legal options.
- W changes explicitly named context variables or persistent world conditions. These can alter ranking or legal actions before Jules acts.
- The I and W legal candidate sets may differ after W changes a real precondition, such as moving the repair kit within reach. That is part of the model difference, not grounds to claim the scenarios are identical at that instant.
- Identical selected actions do not establish equivalence if the modes differ in options, future state, knowledge, or player-visible reasons.

### Findings we are not allowed to claim yet

No one has independently reconstructed this revised procedure and no human has played it. We cannot yet claim either model is fun, fair, strategically deep, easy to teach, or appropriate for the full Fate premise. The baseline and sensitivity checks only make the structural comparison reproducible.

## 11. Remaining design decisions and decision gate

The following choices are now explicit **test-fixture defaults**, but still require project-owner review before becoming canon:

1. Whether direct intentions should add bounded support to all legal actions, or whether the product should instead restrict Jules to nominated proposals.
2. Whether the seeded message and its forceful wording are appropriate for the umbrella story, or whether B's objective should be changed.
3. Whether the trust-response rule creates a useful strategic sequencing choice or feels artificially punitive.
4. Whether the protagonist tie-break order is a plausible characterization or an unacceptable baseline bias.
5. Whether the bounded W effect vocabulary is sufficiently environmental and strategic, rather than disguised action encouragement.
6. Whether the one-major-action-per-round economy is worth preserving after observing action denial and multi-step objectives.

Before a comparative prototype, run an offline deterministic enumerator over every valid player-submission pair for every reachable fixture state. It must report:

- null-input baseline action;
- chosen action and full rank tuple for each candidate;
- whether changing either player's submission alone changes the selected action, legal action set, or persistent state;
- all reachable trajectories and whether each objective can be completed;
- whether any candidate input is always irrelevant or strictly dominated;
- cases where a player loses trust or misses a deadline;
- hidden information available to each audience at each event;
- deterministic replays and a result diff when one rule changes.

Then have an independent reviewer reconstruct the enumerator's results from this file. Only after the corrected trace and independent reconstruction agree should a small local comparative prototype be considered. Human teach-back sessions are still required before choosing a model for the actual game.

A model must not be selected merely because one authored baseline reaches a convenient result. The purpose of the enumerator is to find states where each control input matters, to expose dominant or irrelevant inputs, and to falsify a candidate before spending human playtest time.

## 12. Historical-document handling

This file is the single working reference for the control-model experiment while the consolidation PR is in review.

- SPEC.md is the product-level draft; it does not settle this choice.
- scenarios/umbrella.json remains a non-executable design probe, not canonical truth.
- INFORMATION_MODEL.md defines truth, evidence, accessibility, knowledge, belief, disclosure, visibility, and event distinctions.
- MODULE_CONTRACTS.md and ARCHITECTURE.md describe the proposed technical boundary; they must identify who owns protagonist selection and model-specific submission handling before any engine implementation.
- DECISIONS.md is the canonical decision log.
- PRIORITY_TABLE_REPLAY_01.md and MATCHED_MODEL_COMPARISON_01.md are prior source analyses, not independent evidence.
- DIRECT_INTENTION_TRACE.md, PAPER_SIMULATION_01.md, PAPER_SIMULATION_02.md, CORE_LOOP_COMPARISON.md, and PROTAGONIST_CONTROL.md are historical explorations. Their old fixtures and unresolved semantics must not be silently treated as current rules.

Preserve historical reasoning, but do not maintain multiple active definitions of the same test fixture, policy, or action contract.
