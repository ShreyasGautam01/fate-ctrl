# Paper Simulation 01 — Control, Timing, and Consequence

**Status:** Exploratory test; no mechanic selected.  
**Scenario:** Red Umbrella, with a temporary consistency repair stated below.  
**Purpose:** Find where candidate loops create strategic agency, wasted actions, opaque resolution, or implementation burden before writing gameplay code.

This is a falsification exercise, not evidence from human playtesting. The simulated choices are authored by the design process and can expose contradictions, but cannot establish that the game is fun.

## 1. Temporary facts required to make the test coherent

For this simulation only:
- The umbrella had a loose rib before Jules borrowed it.
- The flatmate knew about the loose rib and did not mention it.
- Jules later worsened a tear while using the umbrella.
- Jules knows about the tear Jules caused, but does not know the flatmate knew about the loose rib.
- A timestamped photo exists in a private message thread between the flatmate and a friend. It is not initially known to Jules or either player unless scenario setup grants player knowledge.
- The flatmate leaves after three resolution boundaries.
- Jules and the flatmate have a relationship worth preserving; its numeric representation is not yet defined.

These facts are a test fixture, not accepted canon. They reconcile two damage events without pretending that a contradiction is already resolved.

### Objective drafts used
- **Player A:** Return the umbrella and preserve the flatmate's trust.
- **Player B:** Expose the flatmate's prior knowledge of the defect and failure to disclose it.
- **Fate:** Eventually make Jules a publicly blamed figure in a citywide emergency, visually associated with the red umbrella.

No objective has a final score or terminal predicate. This test examines early causal choices, not final balance.

## 2. Two complete candidate loops to compare

The candidates deliberately differ in what players control. Both use simultaneous private commitment in this first comparison so that control is not confounded with turn order. If simultaneous commitment proves unsuitable, timing should be tested separately afterward.

### Candidate I — Competing protagonist intentions
- Each player privately submits one intention for Jules.
- Jules has one primary action opportunity per round.
- If intentions are compatible, they can both contribute only if the time/capability model explicitly permits it.
- If incompatible, a deterministic conflict policy must choose a result or defined partial outcome.
- For this paper test only, **no exact conflict policy is assumed**. Any point where the result depends on an unspecified tie-break is recorded as a design failure, not improvised.

This candidate maximizes direct clarity about what each player wants Jules to do, but risks making the loser irrelevant.

### Candidate W — Environmental influence
- Each player privately submits one legal change to a world condition: evidence access, an object's availability/condition, a relationship condition, or an opportunity.
- Compatible changes can both resolve.
- Conflicting changes require a declared deterministic policy.
- Jules does not receive magical knowledge. A world change can influence Jules only through facts, opportunities, or consequences Jules can perceive.
- The model needs an explicit rule for how Jules chooses among available opportunities; that rule is not yet designed.

This candidate creates more room for both players' actions to matter, but may make causality indirect and the protagonist's behavior opaque.

## 3. Round-by-round test

The following is a trace of questions and conditional outcomes, not a fabricated playtest result.

### Round 1 — The departure deadline begins to matter

**Shared state:** Jules has the umbrella; the flatmate leaves in three boundaries; the existing defect and Jules's later damage are separate events. Jules knows only about the damage Jules caused.

**Candidate I submissions**
- A: Jules asks the flatmate for a private inspection and admits to worsening the tear.
- B: Jules searches for evidence that the umbrella was defective before borrowing.

**Conflict:** Both intentions consume Jules's primary action opportunity if the round is modeled as one action per round. They are incompatible under that time model.

**Required resolution questions**
1. Is admitting responsibility a social action that can include inspecting the umbrella, or are those distinct action costs?
2. Does searching the message thread require Jules to know which thread to search?
3. Can the player know the relevant thread while Jules does not? If so, the search action must not smuggle player knowledge into character knowledge.
4. What does the losing intention contribute, if anything?
5. What visible reason explains the selected outcome?

**Candidate W submissions**
- A: create a private repair opportunity by locating an available repair kit or suitable repair contact.
- B: make the relevant message thread discoverable to Jules without revealing its contents automatically.

These actions may be compatible. If both resolve, each changes a different opportunity. Neither objective should score merely because an opportunity was created; progress should require a meaningful later consequence. The next question becomes whether Jules's available time and knowledge make either opportunity usable.

**Round-1 observation:** Environmental influence offers a natural way for both actions to matter, but it needs careful limits on what constitutes a legal world change. “Create an opportunity” cannot mean inventing an object or fact without scenario support.

### Round 2 — Evidence and trust collide

Assume for analysis that the repair opportunity exists and the message thread is discoverable, but Jules has not yet acted on either.

**Candidate I submissions**
- A: Jules tells the flatmate about the tear and offers a repair plan.
- B: Jules opens the thread and inspects the timestamped photo.

If the action slot remains exclusive, the conflict policy decides whether honesty or evidence discovery happens first. The model risks turning a nuanced situation into an arbitrary winner-take-all contest. If both can happen, the one-action-per-round assumption was too restrictive and must be revised explicitly.

**Candidate W submissions**
- A: reduce the practical cost of repair by making the repair opportunity accessible before departure.
- B: surface a verifiable clue from the message thread, without automatically making it public or forcing Jules to inspect it.

These are only legal if the scenario supports the relevant state changes. The design must distinguish:
- evidence exists;
- evidence is accessible;
- a player knows evidence exists;
- Jules knows evidence exists;
- Jules has inspected it;
- the flatmate or another character knows Jules inspected it;
- the evidence has been disclosed to another person.

If those are represented as one Boolean such as `photoFound`, later story logic will become unreliable.

**Round-2 observation:** Evidence discovery, character knowledge, and disclosure are distinct events. This distinction is mandatory regardless of the control model.

### Round 3 — Deadline pressure

The flatmate leaves at the end of this boundary unless a defined rule changes that deadline. The simulation does not allow an action to pause the deadline merely because the story would benefit from more time.

**Candidate I submissions**
- A: Jules completes a repair/return conversation before the flatmate leaves.
- B: Jules shows the photo to the flatmate and asks for acknowledgment of the earlier defect.

The two goals may be compatible: a candid conversation could both preserve trust and expose responsibility. If the action system forces the players to choose between them, it may be manufacturing conflict rather than creating it from the objectives. This is a key design risk.

**Candidate W submissions**
- A: preserve access to the flatmate long enough for an honest return, using only a supported social or practical opportunity.
- B: ensure the evidence can be presented before departure without automatically deciding how the flatmate reacts.

Again, both influences may be compatible. The actual outcome should depend on explicit conditions—time, access, knowledge, trust baseline, and evidence—not narrative improvisation.

**Deadline edge case:** If the flatmate leaves on the same boundary that the evidence becomes accessible, the rules must define the ordering. For example, either effects resolve before deadline checks or deadline checks occur first. The game cannot choose the order case-by-case.

## 4. What this test reveals so far

| Finding | Evidence from the paper trace | Design consequence |
|---|---|---|
| A shared protagonist action slot can manufacture conflict | Repair/return and evidence search compete even though the goals can be compatible | Do not restrict the protagonist to one action per round without a strong pacing/strategy reason |
| Environmental changes can allow parallel contribution | Repair access and evidence access can both change without commanding Jules twice | Investigate world influence, but guard against arbitrary opportunity creation |
| Knowledge needs more than one Boolean | Evidence existence, access, discovery, belief, and disclosure differ | Define a knowledge/evidence model before scenario scripting |
| Objectives need not be mutually exclusive | Honest return and disclosure may coexist | Score each objective independently, then test whether incentives remain strategically interesting |
| Deadlines need global ordering | Evidence access can coincide with departure | Specify resolution phases and expiry order once, not per effect |
| Fate is not yet integrated | No supported causal path from the umbrella to a city emergency has been established | Do not add a Fate action to this simulation by inventing an event; resolve the causal scenario design first |

## 5. Preliminary assessment — explicitly not a decision

Candidate I is easier to explain at the point of choice, but its one-action-per-round version creates artificial zero-sum conflicts and makes the conflict policy central to the game. Allowing multiple actions may fix this while introducing an action economy that still needs justification.

Candidate W naturally allows simultaneous contributions and supports causal setup, but can make the result feel remote from the player's choice. It needs a small, legible action vocabulary and an explicit protagonist-response rule.

**Current lean for further investigation:** a constrained environmental-influence model, possibly with an explicit way to propose or encourage a protagonist intention. This is a research direction only—not an approved hybrid. The extra control channel should be added only if testing shows environmental influence alone lacks immediate agency.

## 6. Next simulation needed

Run a second test with:
1. the same state and objectives;
2. an exact, provisional rule for protagonist response;
3. at least one truly conflicting action pair;
4. one compatible action pair;
5. one stale-target action;
6. one deadline/effect collision;
7. a Fate milestone that is eligible only if a supported prerequisite occurs;
8. a non-Fate ending;
9. a full event trace and separate player-facing explanations.

For every action, capture: intent, target, preconditions, cost, time, knowledge requirements, resolution, reason code, resulting event, objective effect, Fate effect, visibility, and counterplay.

Do not score the candidates numerically until the criteria and their relative importance are agreed. A numerical matrix with invented weights would create false precision.
