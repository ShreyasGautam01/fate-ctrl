# Matched Model Comparison 01 — Same Goals, Different Control Units

**Status:** Analytical comparison; neither model selected.  
**Depends on:** PAPER_SIMULATION_02.md, DIRECT_INTENTION_TRACE.md, MODEL_COMPARISON_SCORECARD.md.  
**Evidence class:** Desk analysis, not human playtesting.

## 1. Why another comparison is needed

The two candidate traces were not yet perfectly matched. In particular, the direct-intention trace treats searching for a private message thread as potentially illegal, while the influence trace allows a player to create a discoverable opportunity around that thread. If the scenario does not specify whether Jules can search their own recent messages, this difference is a scenario ambiguity—not evidence that one model is better.

This document standardizes the fixture and compares the models by strategic intent rather than forcing identical action labels. A player intention and a world influence are different control units; the comparison must preserve the goal and starting conditions while allowing the action representation to differ.

## 2. Standardized fixture

For this comparison only:
- Jules has a phone and can search recent messages with the flatmate. The dated photo is in a thread that is searchable but not yet inspected.
- The photo shows a loose rib before borrowing. It does not by itself prove what the flatmate knew or intended; a separate message or testimony is needed to establish knowledge.
- Jules knows they worsened a tear after borrowing the umbrella.
- The flatmate leaves after three completed round boundaries.
- The repair kit is physically available in the apartment.
- Jules is willing to admit to the tear but wants to avoid a humiliating confrontation.
- A public storm or city emergency is not active in these three rounds. Fate cannot use a public-image milestone without establishing the required public event and capture chain.
- A and B have independently evaluated objectives: A wants an honest return with trust preserved; B wants to establish the flatmate's prior knowledge and nondisclosure.
- Each round allows one major protagonist action in both models. The difference is what player submissions control before that action.

This fixture intentionally makes evidence search a legal candidate so the model comparison is not decided by an accidental target-availability mismatch.

## 3. Same strategic profile in both models

### Player A's strategy
Protect the relationship through honesty and a credible repair/return plan. Avoid needlessly humiliating the flatmate, but do not make Jules lie about the damage.

### Player B's strategy
Establish what the flatmate knew before the loan. Avoid public accusation before the evidence is understood; prioritize verifiable facts over immediate exposure.

These profiles are not the only rational strategies. They are used to compare the control models under a common intention.

## 4. Round-by-round comparison

### Round 1 — Prepare for the deadline

**Shared start:** Jules has the umbrella, the tear Jules worsened is known to Jules, the photo is searchable but uninspected, and the flatmate leaves in three boundaries.

**Direct-intention submissions**
- A requests that Jules inspect the tear and prepare an honest repair plan.
- B requests that Jules search recent messages for evidence about the umbrella's earlier condition.

Both requests are legal. Jules chooses one according to the same published preference model in both variants. For this trace, suppose Jules chooses the repair plan because the immediate deadline is more salient. The selection rule and reason must be explicit in a real specification; this supposition is not a final priority value.

**Environmental-influence submissions**
- A makes the repair kit/repair option easier to use before departure.
- B makes the relevant message search salient or lowers its access cost, without revealing the photo's contents.

Both influences can apply because they affect different opportunities. Jules still chooses one major action. Suppose Jules also chooses the repair plan.

**Comparison:** The protagonist's immediate action is identical, but the influence model allows both players to shape the next choice context. This may preserve contribution for the non-selected player, but the contribution must be meaningful and not merely cosmetic.

### Round 2 — Evidence and accountability

**Shared state:** Jules has a repair plan, the message search remains available, deadline is two, and no knowledge of the photo's contents has been acquired.

**Direct-intention submissions**
- A requests that Jules have a candid conversation about the tear.
- B requests that Jules inspect the dated photo and compare it with the current umbrella condition.

Suppose Jules chooses the photo inspection because the evidence is immediately available and the character's current preference supports resolving uncertainty before speaking. The inspection grants only the facts visible in the image; it does not grant knowledge of the flatmate's state of mind.

**Environmental-influence submissions**
- A makes the candid conversation easier to initiate in private.
- B makes the evidence inspection easier to complete before departure.

Both influences apply if compatible. Jules chooses the evidence inspection under the same character preference assumptions.

**Comparison:** Both models can lead to the same action. The key difference is that direct intentions contest the protagonist's next action, while influences can both alter conditions and leave the final choice to Jules. The influence model needs a rule preventing cost-free setup spam; the direct model needs a fair, legible selection rule for rejected requests.

### Round 3 — The final boundary

**Shared state:** Deadline is one. Jules has inspected the photo and knows the umbrella had a loose rib before borrowing, but the photo alone does not establish the flatmate's prior knowledge. The flatmate departs after Jules's action in this test.

**Direct-intention submissions**
- A requests an honest return conversation that admits to the later tear.
- B requests a follow-up question or evidence search that could establish what the flatmate knew before lending the umbrella.

Suppose Jules chooses the honest return conversation. B's goal does not automatically succeed because the photo was discovered; the knowledge question remains unresolved at departure.

**Environmental-influence submissions**
- A preserves a private return/conversation opportunity.
- B surfaces an existing corroborating message or makes a supported follow-up question easier to ask before departure.

If a corroborating message exists and is legally accessible, B's influence may create a meaningful route to further evidence. If no such evidence exists, the influence must fail or redirect to a valid alternative; it cannot create a fact. Jules still has one major action and may choose the return conversation.

**Comparison:** The influence model may allow B to set up a later opportunity, but the deadline prevents all opportunities from being used. This is strategic only if B understands the trade-off and if the setup has a visible, nontrivial effect. Otherwise it is wasted bookkeeping. Direct intention makes the sacrifice clearer but may make B's turn feel simply denied.

## 5. What is genuinely different?

| Dimension | Direct intentions | Environmental influence |
|---|---|---|
| Immediate player expression | "Ask Jules to do X" | "Change condition Y so options shift" |
| How agency is experienced | The request is accepted or rejected by Jules | The world changes, then Jules chooses |
| Main fairness risk | Opaque or biased request selection | Indirect effects and unclear contribution |
| Main action-economy risk | One request loses the protagonist action slot | Players create many options that cannot be used |
| Compatibility | Two requests can conflict even when goals are compatible | Independent influences can coexist, but may create too many options |
| Character autonomy | Must be protected by preference/knowledge rules | Must be protected by the same preference/knowledge rules |
| Best explanation | Why this request was selected | What changed, why it matters, and why Jules chose as they did |
| Main exploit to test | Repeatedly submit the same high-priority request | Repeatedly create low-cost opportunities or stack modifiers |
| Implementation burden | Rank/resolve requests and explain selection | Validate world effects, resolve effect conflicts, then choose protagonist action |

## 6. Edge-case parity audit

| Case | Direct-intention handling required | Environmental-influence handling required |
|---|---|---|
| Both submissions support same action | Merge support or define no stacking | Merge compatible effects or define stacking |
| Submissions conflict | Apply explicit protagonist selection rule | Apply explicit effect conflict rule, then protagonist response |
| Target becomes stale | Revalidate request at execution | Revalidate influence effect at application |
| Player knows fact Jules does not | Request must not grant knowledge | Influence must not grant knowledge implicitly |
| Deadline expires this round | Use shared boundary rule | Use shared boundary rule |
| Fate milestone becomes eligible | Evaluate from canonical state/events | Evaluate from canonical state/events |
| Objective progress occurs | Evaluate actual state/event, not request | Evaluate actual state/event, not opportunity creation |
| One action is not selected/used | Explain rejected request | Explain unused opportunity and its expiry/cost |

The same canonical state, knowledge model, deadline rule, objective predicates, and Fate eligibility rules should be shared by both candidates. Otherwise the comparison confounds control model with other design decisions.

## 7. Preliminary assessment without numerical scoring

The matched trace suggests:
- Direct intentions are easier to phrase and may make agency more immediate.
- Environmental influence can preserve a contribution from both players in one round, but only if creating an opportunity has a meaningful cost or persistent consequence.
- Both models need the same protagonist preference model; changing that rule to rescue one candidate would invalidate the comparison.
- Both models can produce the same protagonist action, so identical outcomes do not prove the models are equivalent. The difference may lie in strategic options, future setup, counterplay, and perceived agency.
- Neither model has yet been shown to be fun or fair with actual players.

## 8. Required follow-up before selection

1. Replace the assumed choice in each round with an explicit provisional preference calculation and show every input.
2. Add one trace where the preference model selects B's request/influence over A's.
3. Add a genuine conflict and show how each model resolves it without arbitrary narration.
4. Add a case where an influence creates an opportunity that expires unused, and assess whether it was meaningful or wasted.
5. Have a reviewer who has not authored the trace reconstruct the same state changes from the event log.
6. Run a short human test only after the rules can be explained without coaching.

Do not choose a winner based on this document alone. It reduces one comparison confound and clarifies the next evidence needed.
