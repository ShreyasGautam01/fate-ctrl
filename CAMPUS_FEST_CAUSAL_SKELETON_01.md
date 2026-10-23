# Campus Fest Countdown — Causal Skeleton 01

**Date:** 2026-10-23  
**Status:** Exploratory skeleton only. Not scenario canon, not a complete ruleset, and not approval to implement.  
**Parent screen:** `PREMISE_DISCOVERY_SCREEN_01.md`.

## 1. Premise in two sentences

Twelve minutes before a campus showcase opens, Jules is the stage-runner holding the current running order after an organiser has moved one club's promised main-stage slot. The affected club is still waiting backstage, the other club has prepared for the slot it was already given, and a simple scheduling dispute can become a public showdown before anyone has time to agree on a fair change.

This opening is intended to be legible immediately: a person has to resolve a last-minute schedule conflict while people are waiting. The campus-fest setting does not, by itself, prove the scenario works.

## 2. Fixed facts for this paper test (all still assumptions)

These facts are proposed so a reviewer can reconstruct the intended causal model without inventing crowd behaviour. They must be challenged rather than silently promoted to canon.

1. The showcase opens in twelve in-world minutes. Its main stage has one short pre-opening window and a published official running order.
2. Two student groups, **North Crew** and **South Crew**, are both present at the venue and are ready to perform. Both have a previously confirmed main-stage appearance, but a late change has made their slot instructions inconsistent.
3. The groups know their own confirmed slot and can see the public running order. They do not automatically know private messages between Jules and the organiser.
4. The two performances need the same single working wireless microphone. It is currently at the stage desk, and neither group has exclusive ownership of it. Each group will approach the main stage to claim the microphone when its slot is called or when it sees a public open-stage invitation. A group does not move solely because Jules privately intended something.
5. A live microphone announcement can be heard by both groups and by the assembled audience. The groups have a known, playful rivalry, but they have not agreed to start an unscheduled contest.
6. The organiser is reachable before the opening and can authorise a revised schedule. The secondary side-stage is available for a short, separate performance, but moving a group there has a relationship/trust cost if done without explanation.
7. No emergency, crime, secret conspiracy, hidden evidence trail or prior public accusation is required. The scenario is about choices under time pressure, not discovering a culprit.
8. Jules cannot complete two independent tasks in one action. Travel and action timings will be specified in a later packet only after the action economy is chosen.

The most important assumptions are the groups' reasonable responses to a public call and their need for the shared microphone. A first-pass reviewer must be allowed to reject any response that is not actually implied by these facts.

## 3. Provisional objective shapes

### Player A — Keep the opening credible

**Private aim:** Have the showcase opening begin on time (or within one explicitly defined grace window) while avoiding an unexplained unilateral demotion of either group.

**What counts:** The opening time and each group's published slot/confirmed replacement are authoritative state. “Keep everyone happy” is not a scoring predicate. Any grace window and the meaning of an explained demotion remain unresolved until a paper trace is built.

### Player B — Restore the displaced promise

**Private aim:** Restore North Crew's promised main-stage appearance and make the reason for the late change explicit to the group before the showcase opens.

**What counts:** North Crew has a main-stage slot in the authoritative order, and the organiser-approved reason for the change has been delivered to the group through an established channel. A private resolver record is not evidence. The explanation cannot be fabricated by Jules.

### Tension and feasibility question

A and B share the same limited pre-opening time and microphone/stage capacity. A unilateral fix may protect the schedule but sacrifice B's slot or explanation; a public confrontation may restore B's visibility but delay the opening or damage A's trust outcome. A negotiated solution may partially or fully satisfy both, which is allowed.

This is still only an objective shape. The exact predicates, partial outcomes and timing are not yet complete enough to score a playthrough. Before the full packet, enumerate at least one A-only, one B-only, one compatible/mixed and one Fate-defeat result, and check that none requires two tasks in one beat.

## 4. Provisional Fate target

**Candidate target:** Before the official opening, an unscheduled public face-off begins on the main stage with both North Crew and South Crew present and an audience already gathered.

For a paper model, this should be encoded as state—not a narrative judgement:

- `event_status = live_unscheduled_faceoff`;
- `north_crew_location = main_stage`;
- `south_crew_location = main_stage`;
- `audience_gathered = true` (defined by a seeded attendance threshold or explicit zone-state rule, not inferred from dramatic narration);
- the official opening has not yet started.

The target fails if the groups remain in separate scheduled positions, the opening begins first, or the face-off is defused before the defined evaluation moment. A later scene cannot retroactively make an earlier pre-opening target true.

**Why this could pressure both players:** A's schedule goal is endangered by the unscheduled face-off. B's promised-slot goal can be partially advanced by the public confrontation, yet the face-off can also turn B's request into spectacle and cost the group its agreed appearance. Neither player should be automatically allied with Fate simply because the target sounds disruptive.

**Important caveat:** “An audience gathers” is not a free assumption. The packet must define a minimum audience state and explain how the audience knows where to go. If the only way to reach the predicate is for Fate to dictate audience behaviour, reject or revise the target.

## 5. Three candidate causal routes

The common terminal state is the same; the proposed causal hinges are different. The route test has not yet passed independent reconstruction.

### Route R1 — Official schedule collision (authority/timing hinge)

- **Initiating event:** The authoritative running order calls both groups to the same pre-opening stage window.
- **Causal hinge:** Each group responds to its own visible official slot, not to a private intention or rumour.
- **State change:** Both groups converge at the main stage to claim the overlapping slot and the shared microphone; the audience sees a public dispute escalate into a face-off if it is not resolved.
- **Publicly available source:** The running order and the stage call.
- **Counterplay:** Correct the authoritative running order and provide a sequential/side-stage allocation before both calls are acted on.
- **Defeat condition:** A consistent, accepted schedule prevents simultaneous arrival, or the opening starts before a face-off becomes live.
- **Risk:** If the schedule can be silently changed without authorisation, the mechanic is unfair. The later packet must distinguish editing a draft, publishing an order, and obtaining organiser approval.

### Route R2 — Public microphone challenge (public commitment hinge)

- **Initiating event:** Jules makes an audible, direct invitation for both groups to compete for the currently contested pre-opening slot.
- **Causal hinge:** The groups react to a public challenge they can actually hear; a private proposal does not itself move either group.
- **State change:** Both groups approach the main stage and the audience gathers because the invitation names a visible event and place.
- **Publicly available source:** The live announcement and the observable responses.
- **Counterplay:** Before the invitation is accepted and the groups commit, clarify that the slot is a joint or sequential showcase, or announce an authorised correction.
- **Defeat condition:** The public call is retracted/reframed before the challenge becomes live, or one group accepts a separate slot.
- **Risk:** A mic announcement is a social commitment, not a magical command. The story must not force both groups to accept if the opening facts do not give them a reason.

### Route R3 — Shared-microphone contention (physical-resource hinge)

- **Initiating event:** The only working microphone is brought to the main stage while both groups still believe they have the next main-stage slot.
- **Causal hinge:** Both performances require the same physical resource at the same time; the visible resource makes the conflicting claims concrete even without a new public challenge.
- **State change:** Both groups converge to claim the microphone; a dispute can turn into an unscheduled face-off if a live audience and a public stage call are already in place.
- **Publicly available source:** The microphone's location, the stage queue and each group's published slot.
- **Counterplay:** Keep the microphone at the stage desk while confirming order, provide a tested second microphone, or authorise and announce a sequential allocation before both groups contest it.
- **Defeat condition:** The resource is not contested simultaneously, a valid substitute is provided, or the resource allocation is agreed before the face-off begins.
- **Risk / distinctness test:** This route is only distinct if physical scarcity drives the convergence independently of an announcement or duplicate schedule. If it merely accompanies R1 or R2, it must be collapsed into that route. “The microphone is brought out, therefore a crowd gathers” is not an acceptable causal rule.

### Route-gate result so far

R1 uses official-schedule authority; R2 uses a public commitment; R3 uses physical scarcity. They are meaningfully different *hypotheses*, but R3 has not yet proved it can reach the exact Fate terminal state without borrowing R2's announcement or R1's collision as the real cause. **The three-route gate is therefore not passed yet.** A reviewer must be able to reconstruct each route in isolation and show that its counterplay works before target evaluation.

## 6. Non-Fate resolution

A coherent ending exists without a catastrophe: Jules pauses the call, gets the organiser's authorisation, gives North Crew the promised appearance or a clearly agreed replacement, and publishes one consistent running order. The opening may be slightly late if that is an explicit player trade-off. The groups either take separate short slots or jointly agree to a brief shared appearance; the story ends on a real choice and its relational cost, not on Fate manufacturing a new crisis.

This outcome must be reachable through legal actions with the same timing rules that make Fate's route possible. If Fate can invalidate every correction after it happens, the non-Fate ending is not genuine counterplay.

## 7. Minimum Fate contract to test (not a global rule)

Before the paper packet, write an explicit Fate contract containing:

- **Eligibility:** Fate can advance only when a route's actual preconditions are present. It cannot move either group or invent a public call by fiat.
- **Budget:** A small finite number of interventions per scenario; exact count and costs require action-economy testing.
- **Signal:** Every intervention produces a public, in-world sign of rising pressure before the irreversible target evaluation. The signal reveals pressure, not the hidden player proposal that enabled it.
- **Counterplay:** A legal player action can interrupt each candidate route before the target becomes true.
- **Evaluation:** One fixed time/state boundary; no later event rewrites a failed or completed predicate.
- **Boundaries:** Fate cannot reveal hidden submissions, fabricate organiser approval, alter a published schedule without a rule, compel consent, or use narration as an action.

This screen does not choose the intervention list, spend/refund logic or progress metric. Those are blockers, not details to improvise during a playthrough.

## 8. Information and presentation

Player-visible state should show consequences, not private intentions or resolver diagnostics. The ordinary scene can expose the current published running order, who is physically present at stage/backstage, the opening countdown and the microphone's location. Each player's objective and submissions stay private according to an explicit information model; the resolved action and legitimate world consequences become public.

Avoid a dashboard of inferred crowd mood. If a meter is used, it must correspond to an explicit state (such as minutes until opening or whether both groups have converged), not a fabricated probability of Fate winning. The story can say that the audience turns toward the stage only when the audience-state rule says that happened.

## 9. What still blocks a full scenario packet

1. R3 needs an isolated reconstruction. If it collapses into R1/R2, this premise fails the current three-route gate until a genuinely different third route is found.
2. The exact A/B terminal and partial-success predicates need timed traces to prove feasible action counts.
3. The crowd state needs a small, explicit rule grounded in the opening scene; no assumed virality or instant mass response.
4. Fate needs a bounded, observable, counterable action contract and a non-leaking signal.
5. All legal contested action pairs still need a complete, fair resolver and authorised player-view projection. This skeleton does not define them.
6. The 10–15 minute target needs a real session/beat plan with no counteraction scheduled after terminal evaluation.

## 10. Recommendation

Proceed only to an adversarial reconstruction of this skeleton, not to implementation. Ask a reviewer to reconstruct R1, R2 and R3 in isolation, find a counterexample to each counterplay condition, and try to achieve A, B and Fate outcomes with action counts. Do not tell the reviewer which route is preferred. If R3 or the audience rule requires invented behaviour, reject this candidate or return to the premise shortlist; do not add a convenient rule solely to reach three routes.
