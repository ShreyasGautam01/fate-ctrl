# Objective and Fairness Worksheet

**Status:** Design worksheet; no objective rules accepted.  
**Purpose:** Ensure player goals create strategic tension without forcing artificial opposition or making one player dependent on irrational behavior by the other.

## 1. The current objectives are not yet playable

Draft A: "Return the umbrella without losing the flatmate's trust."  
Draft B: "Expose that the flatmate knowingly lent an already-damaged umbrella."

These are evocative intentions, not success conditions. They leave important ambiguity:
- Is trust binary, graded, or inferred from later behavior?
- Can A succeed if trust is strained but the umbrella is returned honestly?
- Does B need Jules to discover the fact, the flatmate to admit it, or another person to believe it?
- Is exposing a true fact enough, even if it causes disproportionate harm?
- Can both goals succeed together?
- Does the game reward a player for taking an action that creates an opportunity but never achieves the goal?

Do not solve these questions by inventing a score before the intended player experience is clear.

## 2. Distinguish goal, progress, and evidence

For each objective define:

1. **Goal statement:** The human outcome the player wants.
2. **Progress signals:** Events that indicate movement toward the goal but do not guarantee success.
3. **Terminal predicate:** Exact state conditions that make the objective complete at game end.
4. **Partial outcome:** How an incomplete but meaningful result is represented.
5. **Counterplay:** What the opponent can do to change the outcome.
6. **Feasibility proof:** At least two materially different action sequences that can reach it.
7. **Fairness audit:** Required facts, knowledge, and resources are obtainable through legal actions.
8. **Exploit audit:** No trivial loop, score farming, or mutually exclusive requirement makes success impossible.

Example (illustrative only): B's progress might include Jules discovering the dated photo, but terminal success might require the relevant fact to be disclosed to the flatmate or another credible audience before the departure deadline. The objective must say which outcome matters; find evidence and expose wrongdoing are not equivalent.

## 3. Four possible objective models

### Model A — Binary victory
Each player either succeeds or fails.

- **Benefits:** Clear end state and simple feedback.
- **Risks:** Discards nuanced outcomes; can feel unfair if a player makes substantial progress but misses one threshold.
- **Use if:** The game is short, competitive, and outcomes are easy to explain.

### Model B — Graded outcomes
Each objective has several ordered outcome bands.

- **Benefits:** Represents partial success and supports narrative nuance.
- **Risks:** Harder to balance and explain; arbitrary weights may disguise subjective design choices.
- **Use if:** Players value story quality and replay variation more than simple win/loss.

### Model C — Independent objectives, shared ending
Each player has an independent objective evaluation, but the game ends on a shared terminal state.

- **Benefits:** Goals can overlap; neither player needs the other to fail on every axis.
- **Risks:** If both always succeed together, rivalry weakens; if objective scores are hidden, outcome can feel opaque.
- **Use if:** The core fantasy is conflicting interpretations and tactical interference rather than direct zero-sum competition.

### Model D — Objective plus consequence
Each player has a primary goal and a cost/compromise dimension.

- **Benefits:** Avoids a shallow binary trade-off; players may achieve a goal at a relational or strategic cost.
- **Risks:** Adds cognitive load and may turn the game into score optimization.
- **Use if:** A single goal cannot represent the desired moral tension without excessive exceptions.

No model is selected. A hybrid should be justified only if a simpler model fails.

## 4. Compatibility matrix to test

| Outcome | A: return with trust | B: expose prior knowledge | Design question |
|---|---|---|---|
| Return honestly; flatmate admits prior defect | Could succeed | Could succeed | Does shared success weaken rivalry or create a satisfying uneasy alliance? |
| Return; flatmate denies knowledge; photo remains hidden | Partial or fail | Fail | Was B's evidence path fair and visible? |
| Evidence exposed; relationship collapses | Fail or partial | Could succeed | Does B pay a meaningful cost, or is exposure a free win? |
| Umbrella not returned; public evidence proves prior defect | Likely fail | Could succeed | Does B's objective encourage sabotage that makes the story less interesting? |
| Both players preserve their own progress but Fate advances | Partial/partial | Partial/partial | Can temporary cooperation be rational without erasing competition? |
| Fate is stopped but interpersonal issue remains unresolved | Depends | Depends | Does the non-Fate ending still resolve the opening's promise? |

These are hypotheses to investigate, not score assignments.

## 5. Avoid the forced-antagonist trap

If B's only route to success requires destroying A's trust goal, B will be incentivized to sabotage even when the more interesting choice is cooperation. Conversely, if B can expose the flatmate with no cost and A can preserve trust with no compromise, the objectives may be too compatible.

Useful tension comes from scarce timing, partial disclosure, different risk tolerance, and conflicting interpretations—not arbitrary rules that force every action to cancel another.

Candidate levers to test:
- A short deadline that makes not every opportunity usable;
- evidence that supports more than one plausible interpretation until corroborated;
- a disclosure choice that affects audience and trust differently;
- a shared opportunity with competing costs;
- a Fate threat that temporarily rewards cooperation.

Do not add all of these. Start with the smallest lever that produces a real decision in a worked trace.

## 6. Fairness checklist

For each objective, answer:
- Is the terminal predicate measurable from canonical state/events?
- Can the player know enough to make informed choices without seeing the opponent's private goal?
- Is required evidence discoverable before the relevant deadline?
- Can the opponent block it, and is that block visible and counterable?
- Does the objective depend on a fact that may be false or absent?
- Can the player achieve it through at least two different strategies?
- Can an action increase progress without guaranteeing success?
- Can one player trivially lock the other out in the first round?
- Can both objectives succeed in at least one plausible trajectory?
- Can neither objective succeed in at least one plausible trajectory?
- Does Fate create pressure without secretly changing objective rules?
- Can a neutral reviewer calculate the result from the event log?

## 7. Current recommendation

Keep objectives independently evaluated for the first model comparison, because that permits overlap and partial compatibility without requiring a zero-sum score. Do not accept this as final until worked traces show both strategic conflict and at least one satisfying cooperative outcome. If independent goals produce a tie too often, investigate a shared consequence or graded result only after identifying the exact failure.
