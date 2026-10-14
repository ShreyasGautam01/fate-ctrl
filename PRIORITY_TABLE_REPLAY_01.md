# Priority Table Replay 01 — A Shared Protagonist Policy for Both Control Models

**Status:** Provisional analytical fixture; not approved game rules.  
**Evidence class:** Desk simulation, not human playtesting.  
**Purpose:** Close the gap in MATCHED_MODEL_COMPARISON_01.md by applying one explicit protagonist policy to both direct-intention and environmental-influence models.

## 1. What this test can and cannot establish

This replay tests whether the two control models can be compared without changing Jules's personality, knowledge, legal actions, deadlines, or objective rules between variants. It does not prove either model is fun, fair in multiplayer, or ready for implementation. The conditions and priority order below are deliberately small and contestable.

Keep four layers separate:
- **Control model:** what players submit and how submissions affect the decision context.
- **Protagonist policy:** how Jules chooses among legal actions after submissions resolve.
- **Scenario facts:** what is true, available, known, and time-limited.
- **Objective evaluator:** whether A or B made progress or completed a goal.

No player objective directly appears in Jules's preference ranking. Otherwise the protagonist becomes a proxy for whichever objective the engine favors.

## 2. Shared fixture

### Initial state

- Jules has borrowed a red umbrella and worsened a tear.
- The flatmate leaves after three completed round boundaries.
- A dated photo in Jules's searchable message thread shows a loose rib before the loan.
- The photo does **not** prove the flatmate saw the defect or knowingly withheld it.
- A corroborating message may exist only if explicitly seeded in scenario data; this replay does not assume one.
- Jules wants to return the umbrella honestly, avoid a humiliating confrontation, and resolve important uncertainty when time permits.
- No public emergency is active in this three-round test. Fate has no eligible public-blame milestone here.
- Each round gives Jules one major action. Information is gained only from an action that actually accesses a source.
- Player A's objective is an honest return while preserving trust. Player B's objective is to establish prior knowledge and nondisclosure with supportable evidence.

### Legal action vocabulary

| Action | Preconditions | Direct-intention expression | Influence-model expression |
|---|---|---|---|
| PLAN_REPAIR | Repair kit available; enough time to prepare | Request Jules prepare a repair plan | Reduce friction or make the kit salient |
| INSPECT_PHOTO | Phone and message thread accessible; one action available | Request Jules inspect the dated photo | Make the existing thread easier to notice/access without revealing contents |
| RETURN_HONESTLY | Flatmate reachable before departure; umbrella in Jules's possession | Request an honest return/conversation | Preserve or improve a private return opportunity |
| ASK_KNOWLEDGE | Flatmate reachable; question can be asked; does not presume answer | Request Jules ask what the flatmate knew | Make a supported question easier to ask |
| WAIT | Always legal | Request Jules wait | No beneficial change; only legal if a player can actually choose a no-op |

The action names are labels for this paper test, not proposed production API identifiers. An influence may change access, salience, or opportunity cost, but cannot create evidence, transfer knowledge, or force an action.

## 3. Candidate protagonist priority table

This is an ordinal table, not a numeric utility formula. Evaluate it from top to bottom, considering only legal actions and current character knowledge.

| Priority | Condition | Rule |
|---|---|---|
| P0 — Legality | Action preconditions are false or Jules lacks required knowledge/capability | Exclude the action; player pressure cannot make it legal |
| P1 — Imminent commitment | The flatmate leaves after this action, and an honest return is still possible now | Prefer RETURN_HONESTLY over actions that can safely wait, unless the return would require Jules to assert something Jules knows is false |
| P2 — Deadline preparation | The flatmate leaves later, and Jules has not prepared a credible return/repair plan | Prefer PLAN_REPAIR over WAIT; this does not automatically outrank evidence inspection |
| P3 — Material uncertainty | A specific unresolved fact can be checked from an existing accessible source, and checking it can change a consequential next action | Prefer INSPECT_PHOTO over WAIT or repeating already-known information |
| P4 — Honest accountability | A reachable conversation can truthfully acknowledge Jules's own damage without making unsupported accusations | Prefer RETURN_HONESTLY or ASK_KNOWLEDGE, according to whether the deadline is immediate |
| P5 — Avoid unnecessary confrontation | If higher priorities are tied, prefer the legal action that obtains needed information or enables a private conversation over a public accusation |
| P6 — Stable tie-break | Remaining actions are equivalent under the conditions above | Choose the action with the earliest deadline relevance; if still tied, use fixed scenario-authored action order |

### Important limitations of this table

1. P1 deliberately tests whether an immediate honest return can outrank evidence gathering. That choice is a design hypothesis, not a universal moral rule.
2. P2 and P3 can conflict before the final round. This table says material uncertainty outranks preparation when the uncertainty is consequential and checkable; this is an explicit choice that should be challenged in review.
3. P4 is a fallback, not permission to claim the flatmate knowingly concealed the defect.
4. P5 cannot override P0–P4 and cannot transform a private fact into public knowledge.
5. The final tie-break order is artificial but deterministic. If many meaningful decisions land here, the policy is under-specified.
6. There is no random roll, hidden LLM judgment, or use of A/B objective progress as a protagonist preference.

## 4. Round-by-round replay

For both models, apply this sequence: validate submissions; apply legal influence effects if any; calculate Jules's legal actions and knowledge; apply P1–P6; execute one action; update world facts and Jules's knowledge; evaluate objectives. The order is a fixture for this test, not a final global resolution contract.

### Round 1 — Deadline three boundaries away

**State before submissions:** Jules knows they worsened the tear. The dated photo is available but uninspected. The flatmate leaves after three completed boundaries.

**Shared legal candidates:** PLAN_REPAIR, INSPECT_PHOTO, and WAIT. RETURN_HONESTLY is possible only if the flatmate is reachable; this fixture assumes the flatmate is away until the next round. ASK_KNOWLEDGE is therefore illegal now.

**Direct intentions**
- A requests PLAN_REPAIR.
- B requests INSPECT_PHOTO.

**Environmental influences**
- A reduces the effort needed to prepare a repair plan.
- B makes the existing message thread easier to notice, without exposing the photo's contents.

**Priority result:** P2 makes PLAN_REPAIR the selected action because the deadline is approaching and Jules has no credible plan. P3 is not reached as a tie-breaker because P2 already selects a preferred action.

**Resulting state:** Jules has a repair plan. Jules still does not know what the photo shows. A gains objective progress only if the objective definition recognizes a prepared plan; this does not yet count as an honest return or preserved trust. B has not established prior knowledge.

**What differs:** In direct intentions, B's requested action is not selected. In the influence model, B may have made the evidence easier to access, but that contribution is only strategically meaningful if it persists into the next round and has a defined, bounded effect. If the salience modifier disappears immediately and changes no later choice, it is cosmetic and should not be counted as meaningful influence.

### Round 2 — Evidence versus conversation

**State before submissions:** Two boundaries remain. Jules has a repair plan. The photo remains uninspected. The flatmate is reachable.

**Shared legal candidates:** INSPECT_PHOTO, RETURN_HONESTLY, ASK_KNOWLEDGE, and WAIT. Jules can truthfully admit to worsening the tear. Jules cannot yet assert that the flatmate knew about the loose rib.

**Direct intentions**
- A requests RETURN_HONESTLY.
- B requests INSPECT_PHOTO.

**Environmental influences**
- A preserves a private opportunity to return the umbrella and admit to the tear.
- B reduces the effort of inspecting the already-accessible message thread.

**Priority result:** P3 selects INSPECT_PHOTO: a checkable, consequential uncertainty is available and the return deadline is not immediate. The choice is not a verdict for B. It is an information-gathering action motivated by Jules's own stated desire to resolve uncertainty before a difficult conversation.

**Resulting state:** Jules learns only what the photo visibly supports: the rib was loose before the loan. Jules does not learn whether the flatmate saw the defect, noticed it, or intended to conceal it. A's private conversation opportunity remains available only if the scenario rules say the influence persists; it does not itself force a conversation.

**What differs:** Direct-intention A's requested action is not selected. In the influence model, A's opportunity may persist while Jules inspects the photo, potentially giving A a later benefit. That persistence is a real model advantage only if the cost/action budget makes setup meaningful and the rules tell players how long it lasts. Otherwise the influence model has hidden free value.

### Round 3 — Final boundary

**State before submissions:** One boundary remains; the flatmate leaves after this action. Jules knows the rib was already loose but does not know whether the flatmate knew.

**Shared legal candidates:** RETURN_HONESTLY, ASK_KNOWLEDGE, and WAIT. INSPECT_PHOTO is no longer useful because the photo has already been inspected; repeating the action cannot generate the same knowledge again. If a separate corroborating message is not seeded, Jules cannot obtain it merely by trying harder.

**Direct intentions**
- A requests RETURN_HONESTLY.
- B requests ASK_KNOWLEDGE.

**Environmental influences**
- A protects the existing private return opportunity.
- B makes a direct, non-accusatory knowledge question easier to ask.

**Priority result:** P1 selects RETURN_HONESTLY, because the deadline is immediate and the return is still possible. Jules can honestly admit to worsening the tear and ask about the earlier loose rib during that conversation, but the engine must not assume the question was asked unless the selected action contract explicitly includes it. For this replay, RETURN_HONESTLY does **not** include ASK_KNOWLEDGE; they are separate actions. Therefore B's evidence objective remains unresolved at departure.

**Resulting state:** The umbrella is returned honestly before departure. Jules has not established nondisclosure. A may complete the honest-return predicate, but trust preservation must be evaluated from a defined observable consequence rather than assumed from honest intent. B does not complete the prior-knowledge predicate.

**What differs:** The same protagonist policy yields the same selected action in both variants. Direct intentions create a clear request conflict and visible rejection for B. Environmental influence lets B alter the conditions for asking, but that setup does not overcome P1 and may feel less legible if the player cannot see why it failed to change the choice.

## 5. Does the table actually favor both players?

The three-round trace is not enough to establish balanced strategic opportunity: A's objective is better positioned at the terminal deadline. To test whether the table is inherently biased, add two counterfactual state checks without treating them as extra canonical rounds.

### Counterfactual A — B-favoring state

- Two boundaries remain.
- A credible repair plan is already complete.
- The photo is accessible but uninspected.
- The flatmate is not currently reachable.
- No imminent irreversible consequence requires a return.

Then P2 no longer selects PLAN_REPAIR; P3 selects INSPECT_PHOTO. B's information-seeking route wins because the relevant uncertainty is material and the preparation task is already satisfied. This favors B's immediate strategic aim, but does not itself prove nondisclosure.

### Counterfactual B — A-favoring state

- One boundary remains.
- The umbrella is still with Jules.
- The flatmate is reachable.
- The earlier condition is known, but no evidence can establish the flatmate's prior knowledge before departure.

P1 selects RETURN_HONESTLY. A's objective can be completed if its predicate is honest return before departure; B's cannot be completed from the available facts. This is an intentional deadline asymmetry, not proof of general fairness. A fair scenario must provide B a viable earlier path to investigate, not guarantee that both objectives can be completed in every state.

## 6. Parity and exploit audit

| Test | Expected behavior under this fixture | Remaining concern |
|---|---|---|
| Same canonical state and same character knowledge | Same protagonist choice in both models after model-specific submissions resolve | Influence effects may alter the candidate set; comparisons must record that difference |
| Player claims a fact Jules has not learned | Cannot affect Jules's belief or legality | Need a final information-transfer contract |
| Evidence already inspected | Repeating inspection gives no duplicate information or free progress | Objective progress must be idempotent |
| Target/source missing | Related action is illegal or resolves to a documented failure; no invented evidence | Need exact failure and cost/refund rule |
| Both players affect the same opportunity | Effects merge only if their composition rule is explicit; otherwise deterministic conflict resolution applies | Influence model has more effect-composition cases |
| Influence makes a task easier | Its duration, magnitude, and persistence are visible and bounded | If not visible, players cannot plan against it |
| Request loses to a higher priority | Rejection reason cites the decisive priority without leaking private facts | Direct model risks repeated frustration |
| Deadline boundary | P1 applies only at the explicitly defined final boundary | Global round-order contract remains open |
| Objective progress vs completion | Repair plan, photo discovery, and honest return are distinct events | Avoid awarding a full objective for partial setup |
| Fate tries to use this trace | Public-blame milestone is ineligible because no public emergency or public evidence chain exists | Keep Fate independent from protagonist preference |

## 7. Comparison against predeclared criteria

No numerical ratings are assigned because this is an authored desk test.

- **Legibility:** Direct intentions make the rejected request explicit. Influences need a UI that explains what changed and why it was insufficient.
- **Agency:** Both preserve Jules's final action choice under this policy. The influence model may offer simultaneous setup value; whether that is agency-enhancing or opaque is untested.
- **Meaningful contribution:** Direct intentions give one player the action request and leave the other rejected. Influences may let both contribute, but only if effects persist, are bounded, and materially change future options.
- **Exploitability:** Direct intentions invite repeated high-priority requests. Influences invite stacking, setup spam, and modifier interactions.
- **Rule burden:** The protagonist table is shared, but the influence model additionally requires effect composition, duration, and opportunity validation.
- **Replayability:** Both are deterministic under the fixture. The influence model needs deterministic effect resolution before the same protagonist policy can be applied.
- **Objective fairness:** Not resolved. A deadline can make one goal unattainable if the other player wins early decisions; objective feasibility needs multiple routes, not symmetric outcomes at every state.
- **Narrative causality:** Neither model repairs the weak citywide-emergency premise. The scenario still supports, at most, a narrower local accountability route until a credible causal chain is demonstrated.

## 8. Findings and next gate

1. A small deterministic protagonist policy can make the same selection rule explicit across both control models, but this fixture's priority ordering remains a hypothesis.
2. The example gives A a strong final-boundary advantage and B a plausible earlier evidence route. That is potentially strategic, but no claim of balance is warranted without independent players trying to exploit it.
3. The influence model's possible advantage—both players can shape future conditions—is also its largest fairness risk. Duration, cost, stacking, visibility, and counterplay must be specified before comparing it fairly.
4. Direct intentions are easier to explain at the moment of resolution, but the model needs a satisfying way for a rejected player to retain strategic options.
5. Neither model should be selected from this self-authored trace alone.

**Next gate:** Have an independent reviewer reconstruct each round using only the shared fixture, priority table, and action definitions. Ask them to identify the selected action, decisive rule, knowledge gained, objective progress, and unresolved facts. Then run a small human test with both control models in counterbalanced order. Record actual observations separately from this desk analysis. Do not start the gameplay engine until the resolution contract and the scenario's causal ending have also passed review.
