# Model Comparison Scorecard — Protagonist Intentions vs Environmental Influence

**Status:** Criteria defined; scores intentionally blank.  
**Purpose:** Prevent a favorite mechanic from winning through selective examples or invented numeric weights.

## 1. Candidates

### Candidate I — Direct intentions
Each player submits a proposed action for Jules. Jules chooses one legal request using an explicit preference model. The unselected request may have no immediate effect unless a variant is separately specified.

### Candidate W — Environmental influence
Each player changes a supported opportunity or constraint in the world. Jules chooses from the resulting legal action set using an explicit preference model.

Neither is selected. Other candidates should be introduced only if these two fail on a named requirement.

## 2. Comparison method

Before scoring, reviewers should:
1. Read the same scenario fixture and objective definitions.
2. Trace the same number of rounds with the same deadlines and Fate state.
3. Include compatible actions, incompatible actions, stale targets, a hidden-information event, a deadline collision, and one chance for temporary cooperation.
4. Record exact state changes and player-facing explanations.
5. Judge each criterion independently, then discuss disagreement.
6. Keep analytical confidence separate from player-test evidence.

No weighted total should be computed until criterion importance is agreed. A decimal score would imply more precision than the current evidence supports.

## 3. Criteria and operational questions

| Criterion | Question to answer | Evidence required |
|---|---|---|
| Immediate agency | Can a player predict how their choice can affect the next meaningful decision? | Submitted action and outcome can be connected without guesswork |
| Protagonist autonomy | Does Jules remain a person with knowledge, capability, and preferences rather than a puppet? | Illegal/uninformed actions are blocked for clear reasons |
| Strategic depth | Are there meaningful alternatives with different risks, timing, and consequences? | At least two viable strategies per player |
| Compatibility | Can both players help without one action automatically erasing the other? | A trace where both actions matter and one where goals truly conflict |
| Counterplay | Can the opponent respond to a threat in time and with understandable options? | At least one disruption route per major Fate path |
| Readability | Can players explain why an action succeeded, failed, or was not selected? | Independent reviewer reconstructs the trace |
| Information fairness | Does player-only knowledge remain separate from Jules's knowledge? | No hidden-target leaks or unexplained knowledge jumps |
| Pacing | Does the model create decisions rather than repeated waiting or action denial? | Round trace shows no repeated forced no-op pattern |
| Cognitive load | Can a first-time player understand legal choices and costs? | Teach-back from a novice tester |
| Narrative causality | Do actions alter causes and opportunities rather than only prose? | Event log identifies each causal transition |
| Objective fairness | Are goals independently achievable, partially compatible, and not trivially locked? | Feasibility and exploit audit |
| Implementation burden | Can legality, resolution, and replay be implemented with a small deterministic rule set? | Contracts and test cases remain bounded |
| Testability | Can outcomes be tested without calling an LLM? | Identical inputs reproduce identical state/events |
| Scenario generality | Does the model work beyond the umbrella story? | A second tiny scenario can use the same rules naturally |
| Mobile interaction | Can simultaneous submissions and result explanations work on a phone screen? | A minimal interface sketch and later usability test |

## 4. Blank evidence table

| Criterion | Candidate I evidence/concerns | Candidate W evidence/concerns | Current finding |
|---|---|---|---|
| Immediate agency | Direct request is clear, but selection can reject it | Opportunity change is indirect, but may affect multiple options | Open |
| Protagonist autonomy | Depends on visible preference rule | Depends on the same preference rule | Open |
| Strategic depth | Competes for one protagonist action slot | May allow complementary setup actions | Open |
| Compatibility | One request may lose the round | Independent world effects can both apply | Open |
| Counterplay | Opponent competes for next action | Opponent can alter access/opportunity before response | Open |
| Readability | Request rejection needs explanation | State changes and resulting choices need explanation | Open |
| Information fairness | Requests must respect character knowledge | Influence must not smuggle knowledge through world state | Open |
| Pacing | Risk of repeated losing requests | Risk of indirect setup without satisfying resolution | Open |
| Cognitive load | Clear action labels; opaque preference scoring risk | More abstract verbs and world-state concepts | Open |
| Narrative causality | Intent directly names a possible cause | Influence may require more steps before effect | Open |
| Objective fairness | Goals may collide at action slot | Goals may be too compatible if setup is cheap | Open |
| Implementation burden | Request ranking and preference logic | Influence legality, effect conflicts, then protagonist choice | Open |
| Testability | Deterministic if preference rules are explicit | Deterministic if influence rules and response rules are explicit | Open |
| Scenario generality | May work for compact, character-driven scenarios | May work for evidence/environment-driven scenarios | Open |
| Mobile interaction | Easy to present a proposed action | Harder to explain state-changing influence | Open |

This table records current hypotheses only. The rows must be revised when matched traces or playtest evidence contradict them.

## 5. Avoid common comparison errors

- Do not compare a polished direct-intention example against a deliberately awkward influence example.
- Do not give one model more actions, resources, or information than the other.
- Do not count more possible actions as greater depth unless they create meaningful decisions.
- Do not equate deterministic outcomes with fair outcomes.
- Do not score "fun" from a paper simulation.
- Do not add a hybrid because each pure model has one weakness; first establish that the hybrid resolves both without creating a larger cognitive burden.
- Do not let implementation convenience override the core player fantasy, but include engineering cost as one criterion.
- Do not treat an AI-generated narrative explanation as evidence that players will understand the actual rules.

## 6. Decision gate

A model may be accepted for a limited prototype only when:
- matched traces exist for both candidates;
- every outcome has a deterministic reason;
- critical edge cases are specified;
- no candidate depends on a hidden or inconsistent knowledge rule;
- reviewers agree on the criteria and discuss major disagreements;
- a small human test plan can falsify the model's main claim.

Even then, acceptance is only for a prototype. Production suitability requires playtest evidence.
