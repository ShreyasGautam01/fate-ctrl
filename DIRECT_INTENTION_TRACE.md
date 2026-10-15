# Direct-Intention Model — Matched Paper Trace

**Status:** Candidate model trace; not selected.  
**Purpose:** Compare direct intentions with the influence model using the same umbrella fixture and timing assumptions.  
**Evidence class:** Analytical simulation, not human playtest.

## 1. What this model means

Each player submits one intended action for Jules, such as inspect the message thread or repair the umbrella. The submission is a request, not a mind-control command. Jules chooses one legal action after considering both requests, current knowledge, capabilities, and a small explicit priority model.

This definition avoids a false comparison between environmental influence and absolute control. If a player can directly dictate Jules's action, protagonist agency disappears; if requests have no predictable effect, player agency disappears. The design question is whether a bounded request model is understandable and strategically useful.

## 2. Provisional rule fixture

To make this trace comparable, assume:
- Both players submit privately and simultaneously.
- Each request names one legal protagonist action.
- Requests are validated against the same round-start snapshot.
- Jules can perform at most one major action per round.
- If both request the same action, it is considered one request with shared causal support, not two actions or double strength.
- If requests differ, Jules evaluates both using the same published preference rules. A request that violates Jules's knowledge or capabilities is ineligible.
- If both eligible requests have equal preference, a stable, published tie-break selects one. The tie-break must not secretly favor a player.
- The unselected request produces a visible outcome event and no direct effect this round. Whether it can provide indirect support is an open variant, not assumed here.
- Deadlines expire after Jules's action on the final available round, matching PAPER_SIMULATION_02.md.
- Player knowledge never automatically transfers to Jules.
- These are test rules, not accepted rules.

This is a narrow direct-intention candidate. Other variants—priority tokens, action costs, both actions in a multi-step turn, or intentions that alter probabilities—must be evaluated separately rather than mixed into this trace.

## 3. Round 1 — Repair versus evidence access

**Initial state:** The photo exists but is inaccessible to Jules. A repair kit is available. Deadline is 3. Jules knows they worsened the tear but does not know about the flatmate's prior knowledge.

- Player A requests: Jules prepares a repair.
- Player B requests: Jules searches for the message thread.

**Eligibility:** Repair is available. Searching is not yet legal if Jules has no known or discoverable access path; a request cannot confer knowledge of the thread's existence. The scenario must decide whether the thread is a visible search target or a hidden fact.

**Provisional result:** Jules repairs/prepares if that is the only eligible request. B's request fails eligibility rather than being allowed to smuggle player-only knowledge into character action.

**What this exposes:** The model's fairness depends heavily on how scenario knowledge and legal options are shown. If the UI lists hidden targets to Jules, it leaks information. If it hides all unknown targets, the scenario must provide a fair discovery mechanism. The direct-intention model does not remove the information-design problem.

## 4. Round 2 — Both actions are legal

Assume a legitimate clue has made the thread discoverable to Jules, but its contents remain unknown. Deadline is 2.

- A requests: Jules inspects the umbrella and prepares a repair plan.
- B requests: Jules opens the message thread and inspects the dated photo.

Both are legal but differ. Jules's published priorities determine the choice. If avoiding immediate confrontation is a stronger current preference than uncovering disputed responsibility, the repair plan may win; if the deadline and visible clue make evidence more urgent, the photo may win. Those priorities cannot be improvised by narration. They must be encoded in a small deterministic rule or table.

**Required event trace:**
- both requests accepted as valid;
- the choice factors that are safe to reveal;
- the selected action and its preconditions;
- the unselected request's result;
- any resulting knowledge acquisition;
- objective progress recalculated from state, not awarded just for requesting.

**Risk:** If the protagonist preference rule is too opaque, the player experiences a hidden dice roll even if the code is deterministic. If it is fully predictable, players may solve the choice rule and feel they are optimizing a machine rather than influencing a person.

## 5. Round 3 — Deadline pressure

Deadline is 1.

- A requests: Jules completes the repair/return conversation.
- B requests: Jules discloses the photo to the flatmate.

Both may be legal only if Jules has the required knowledge and access. The round allows one major action. The selected request resolves, then the flatmate departs.

If Jules does not know what the photo proves, B's disclosure request is ineligible. If Jules knows the photo's contents but has not obtained a suitable audience/access path, disclosure may still be ineligible. These restrictions are not arbitrary obstacles; they preserve the distinction between player intention and character capability.

**Failure case:** If the request rejected by the protagonist is simply erased with no explanation, players cannot learn the system. If the explanation reveals private facts, it breaks information security. The result needs a reason code that explains the rule without leaking hidden state.

## 6. Collision tests

### Compatible requests
If both players request the same action, the action should not become twice as powerful unless that is an intentional and visible rule. A shared request can be narrated as two sources of pressure, but objective progress should derive from the one resolved action.

### Conflicting requests
If A requests repair and B requests disclosure, the protagonist preference rule chooses one. This is not a direct conflict between world effects; it is competition for the single action opportunity. That distinction matters because an environmental-influence model may let both players change separate opportunities before Jules chooses.

### Stale target
If B requests inspection of a thread that becomes inaccessible during resolution, the action must be revalidated at execution time. The system must not silently inspect a different thread. Cost/refund policy remains open.

### Deadline collision
The same final-boundary rule applies: Jules acts, then the deadline expires. The rule is global and visible.

### Fate pressure
Fate cannot request an arbitrary Jules action unless its action vocabulary explicitly allows it and the request is subject to the same knowledge, capability, and preference rules. If Fate receives special override power, that is a separate intervention with explicit cost and counterplay—not a hidden third player request.

## 7. Preliminary strengths and weaknesses

**Strengths**
- The submitted intention maps directly to what the player wants Jules to do.
- The game can explain rejected intentions in terms of knowledge, capability, timing, or protagonist preference.
- The action set may be easier to teach than a broad set of world-manipulation verbs.

**Weaknesses**
- Two players may repeatedly compete for one action slot even when their broader goals are compatible.
- A hidden protagonist preference model can feel arbitrary; a visible model can become exploitable.
- Player agency depends on the request-selection algorithm being legible and fair.
- The model may underuse the shared world and evidence system unless requests can include setup or indirect effects.

## 8. What this trace does not prove

It does not prove that direct intentions are more intuitive, more fun, or less complex than environmental influence. It uses invented strategy choices and a provisional protagonist preference rule. It must be compared in independent playtests using the same scenario, time budget, and player objectives.

## 9. Required next comparison

Use MODEL_COMPARISON_SCORECARD.md to compare this model with the influence model. Do not assign numeric scores until reviewers agree on the criteria and inspect matched traces. The next version should show exactly how Jules's preference rule operates for each legal option and include at least one situation where the lower-priority request still creates meaningful later value.
