# Paper Simulation 02 — Provisional Resolution Rules Under Stress

**Status:** Analytical stress test; proposed rules are test fixtures, not accepted design.  
**Scope:** Compare a constrained influence model against a protagonist-intention model using identical edge cases.  
**Evidence class:** Desk simulation authored by the design process. It is not independent playtest evidence and cannot validate fun, balance, or clarity.

## Executive result

The first simulation showed that discussing simultaneous turns without defining the controlled unit leaves the main game unresolved. This test adds a minimal provisional rule set so outcomes can be checked rather than improvised.

A potentially useful direction is for each player to submit one influence that changes a legal opportunity or constraint; Jules then chooses from a small set of available actions using explicit character priorities. However, this may feel indirect. A direct-intention model remains a serious alternative and should not be rejected until tested with independent players.

The main result is not to choose influence actions. It is a list of conditions any candidate loop must satisfy: no accidental knowledge transfer, no arbitrary tie-break, no silent action cancellation, a stable deadline boundary, and a visible explanation for every outcome.

## 1. Shared fixture

These details are temporary test data only.

- Jules borrowed a red umbrella from a flatmate.
- The umbrella had a loose rib before borrowing; the flatmate knew about it.
- Jules later worsened a tear; Jules knows this.
- Jules does not initially know the flatmate knew about the loose rib.
- A dated photograph of the loose rib exists in a private message thread. Jules cannot initially access it.
- The flatmate leaves at the end of round 3 unless a supported state change alters the departure plan.
- Jules wants to avoid a humiliating confrontation, but also prefers not to be unfairly blamed. These are candidate priorities, not a finalized personality system.
- Player A's draft goal is to return the umbrella while preserving trust. Player B's draft goal is to expose prior knowledge and nondisclosure. Both goals may be partially or fully compatible.
- Fate's large ending is deliberately not active in rounds 1–3 because no causal prerequisite has been established.

### State notation

- T: canonical world truth.
- E: evidence artifact exists.
- A(actor, evidence): actor can access evidence.
- K(actor, fact): actor knows fact.
- B(actor, fact): actor believes or suspects fact.
- D(evidence, audience): evidence has been disclosed to an audience.
- deadline: number of completed round boundaries before the flatmate departs.
- trust: qualitative state for this simulation only; no numeric scale is assumed.

These are conceptual predicates, not an approved runtime schema.

## 2. Candidate rules used for the stress test

### Shared round skeleton

1. **Snapshot:** Publish the permitted state view and current deadline to each player. Private information remains filtered.
2. **Commit:** Each player submits exactly one legal candidate action without seeing the other's current submission.
3. **Validate:** Validate both against the same round-start snapshot. An action that was legal at commitment may become stale after resolution; that is handled explicitly.
4. **Resolve independent effects:** Apply non-conflicting effects in stable order. The order is not strategically meaningful for independent effects.
5. **Resolve conflicts:** For effects that cannot coexist, use a declared conflict rule. This test uses a simple contest only when both actions target the same exclusive slot; equal priority produces a defined no-op with a reason event, not a hidden random winner.
6. **Protagonist response:** Jules chooses one action from the resulting legal opportunity set. Jules can use only character knowledge, available capabilities, and stated priorities. If two options tie, a stable rule breaks the tie and is recorded.
7. **Observation:** Emit events for what happened. Characters acquire knowledge only from supported observation or disclosure rules.
8. **Deadline boundary:** Decrement the deadline once. If it reaches zero, departure occurs after all effects and Jules's response in this round. This is a test convention, not a final choice.
9. **Evaluate:** Recompute objective progress and Fate eligibility from canonical state and resolved events. No objective or Fate action may retroactively change an earlier resolution.
10. **Present:** Generate each player's view and explanation from authorized events. Narration cannot alter state.

### Why this ordering is only provisional

- Resolving Jules's response before deadline expiry gives players a final chance to act on the last round. Reversing the order is also coherent but produces a different game; it must be selected once and tested for fairness.
- Fate evaluation after player effects prevents a milestone from activating on a condition that was immediately undone within the same resolution. An alternative is to evaluate at named checkpoints.
- The no-op tie rule is deterministic and easy to test, but may make a round feel wasted. A fallback, partial resolution, explicit bid, or action-specific precedence may be better if equal conflicts occur often.
- Jules's stable tie-break rule prevents nondeterminism but risks making the protagonist predictable or robotic. Character priorities need a small, legible model, not a hidden language-model decision.

## 3. Candidate action contract

Every submitted action must declare actor/player, action kind, target ID, intended effect, preconditions, knowledge requirement, opportunity/resource cost, duration/expiry, conflict key, visibility, failure reason code, and expected counterplay.

An action cannot declare an arbitrary state patch. It requests a named, supported transition. For example, making the message thread accessible can be legal only if the scenario already contains the thread and a plausible access path. Inventing evidence that proves the flatmate lied is not a legal effect.

## 4. Stress case A — Compatible actions

**Round 1 state:** The photo exists but is inaccessible to Jules. A repair kit is available in the apartment. Deadline is 3.

- A submits prepare-repair: make the existing repair kit available to Jules.
- B submits surface-thread: create a discoverable opportunity for Jules to access the existing message thread, without revealing its contents.

**Provisional resolution:** Both actions apply because they target distinct opportunities and neither consumes an exclusive slot. Neither objective is scored merely for creating an opportunity. Jules can choose only one action in this round, based on current priorities and what Jules knows.

**Potential failure:** If Jules is not told that the thread can be accessed, the opportunity is invisible. If Jules is told what the photo proves without inspecting it, the system has leaked information. If both opportunities are displayed but the player cannot understand why only one can be used, the action economy is unclear.

**Acceptance question:** Does each player feel their action materially affected the decision even if Jules chooses the other opportunity?

## 5. Stress case B — Conflicting actions

**Round 2 state:** Jules knows the thread is accessible but has not inspected it. Both players target the same exclusive public-attention slot, a placeholder for a later scenario mechanic.

- A submits keep-private: preserve the current interaction as private.
- B submits publish-claim: attempt to make the evidence public.

These effects are mutually exclusive at this checkpoint.

**Provisional resolution:** The actions conflict. Under this test's simple rule, each has equal priority, so neither applies. Both players receive a reasoned result that their incompatible effects canceled at the public-attention checkpoint, without the result leaking the hidden contents of the evidence.

**Failure analysis:** A deterministic no-op is fair in the narrow sense of being predictable, but may feel like the game ignored both players. It also creates an incentive to submit blocking actions every round. A later design must compare declared priority, resource bidding, action-specific precedence, partial effects, or a contest whose inputs are visible and deterministic. No rule should be selected without measuring strategic and cognitive cost.

The public-attention slot is a test abstraction, not an accepted game mechanic.

## 6. Stress case C — Stale target

**Round 2 state:** A targets the message thread. During the same resolution, a valid independent event removes Jules's access to the device containing it.

**Required behavior:** The system must not silently execute A's original effect against a target that no longer satisfies its preconditions. It must either revalidate at the documented effect boundary and fail with a stable TARGET_NO_LONGER_AVAILABLE reason, or reserve the resource at commitment if reservation is an explicit rule with visible cost and release behavior.

This test uses revalidation at effect time. Whether a stale action consumes a turn/resource remains open. Charging full cost can feel punitive when the player could not foresee staleness; refunding all cost can enable free scouting. This is a balance question, not merely an implementation detail.

**Invariant:** A stale action never mutates a substitute target and never leaks the hidden reason for unavailability.

## 7. Stress case D — Deadline/effect collision

**Round 3 state:** Deadline is 1. A makes the repair opportunity available; B makes the thread accessible. Jules can inspect the evidence or attempt the repair, but cannot complete both under the test's one-response limit.

**Provisional ordering:** Both player effects resolve; Jules responds; then the deadline decrements to zero and the flatmate departs.

**Result:** Jules can complete at most one protagonist action before departure. An opportunity created but not used remains a state fact unless its own expiry rule removes it. Departure does not automatically erase evidence, reverse prior knowledge, or award either objective.

**Alternative:** Deadline-first resolution means the flatmate leaves before Jules can respond. That may be sharper pressure, but can make a deadline round feel like a trap if players reasonably expect to use the last available moment.

**Test requirement:** Show the countdown and exact boundary rule to players. Never decide order in response to which outcome is more dramatic.

## 8. Stress case E — Knowledge versus player intent

Player B knows the photo exists through a private objective briefing. Jules does not.

- B submits an influence intended to help Jules find the photo.
- The influence creates a search opportunity but does not transfer the photo's contents.
- Jules must spend a later action to inspect it.
- Only a supported inspection event can grant Jules knowledge of the visible facts in the photo.
- Jules may still draw a mistaken inference about what the image proves.
- Disclosure to the flatmate is another distinct action/event.

If the interface narrates that Jules discovers the flatmate knowingly lent a defective umbrella at the moment the search opportunity appears, it has skipped inspection and inference. This is a correctness bug even if the sentence is dramatic.

## 9. Stress case F — Fate prerequisite

Suppose a future Fate milestone requires a public image of Jules holding the umbrella during a public response. The image must not exist merely because Fate's milestone wants it.

Eligibility should require:
- a public location or event established by the scenario;
- Jules is actually present and holds the umbrella;
- a supported observer/capture mechanism is available;
- the capture event occurs;
- the image is accessible to the relevant audience under explicit rules.

Only after these conditions are true can Fate consider a legal intervention that uses the image. Fate may influence an existing opportunity or timing within its budget; it cannot create a camera, public event, or image retroactively.

## 10. Stress case G — Non-Fate terminal state

At the end of round 3, imagine Jules has returned the umbrella, admitted to worsening the tear, and discovered the flatmate's prior knowledge. The flatmate acknowledges the earlier omission; both agree on repair/replacement, but trust is strained rather than destroyed.

This could be a non-Fate ending if the game defines explicit conditions for return/repair resolution, sufficient trust or honest acknowledgment, and no active irreversible Fate route past a defined point of no return.

It should not be awarded merely because the Fate timer ran out. The ending needs a human resolution and an explicit terminal predicate. Exact thresholds are intentionally not fabricated here.

## 11. Cross-case findings

| Invariant or risk | What the test shows | Required design response |
|---|---|---|
| Simultaneous commitment does not define resolution | Effects can still conflict or become stale | Define conflict keys, validation snapshots, effect boundaries, and costs |
| Opportunity creation is not objective completion | A player can set up an option Jules never uses | Separate setup progress from terminal success |
| Character knowledge is not player knowledge | Private briefing can bias actions without informing Jules | Use explicit information-transfer events |
| Deadline ordering changes strategy | Last-round access is useful only under a documented boundary | Test boundary order and show countdown |
| Determinism alone does not mean fairness | Equal-conflict no-op is reproducible but may feel wasted | Compare fallback policies and action economy |
| Fate needs prerequisites | A milestone must depend on an event chain | Model eligibility from canonical state/events |
| Ending needs a positive resolution | Fate failure alone is not satisfying | Define alternate terminal predicates and epilogues |

## 12. What this simulation cannot tell us

It cannot determine whether players understand the interface, whether indirect influence feels satisfying, whether simultaneous decisions create enough tension, whether character priorities are legible, whether a no-op conflict rule is frustrating, whether match tempo is right, or whether players perceive objectives as fair. Those require independent participants and observable behavior.

## 13. Next test

Create a second trace with at least two genuinely different player strategies and two Fate routes, not just different action labels. Record exact state changes and reasons after every phase. Then ask a reviewer unfamiliar with the design to reconstruct the chain from the event log. If they cannot explain what happened and why, the system is not ready to implement.
