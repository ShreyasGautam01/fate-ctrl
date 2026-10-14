# Protagonist Control Model Review — Draft 0.1

**Status:** Open design analysis. No control model is accepted.  
**Why this comes before a credible round simulation:** the timing model cannot be judged independently of what a player is actually allowed to control. A simultaneous round of direct commands is a different game from a simultaneous round of competing intentions.

## 1. Design problem

The central fantasy is that two players steer one protagonist toward different goals. If both can freely command separate world actions, the shared-protagonist fantasy disappears. If every intention is decided by an opaque personality simulation, players lose agency. If the stronger bid always wins, the game may become an abstract auction rather than a narrative strategy game.

A good model must answer four separate questions:
1. **What does the player choose?** An action, an intention, a motivation, a resource investment, or a change to the world?
2. **What does Jules actually do?** The action directly chosen, a compromise, a constrained alternative, or no action?
3. **Why did it happen?** A deterministic rule and a reason that can be shown to players.
4. **What survives a losing choice?** Information gained, a cost imposed, a delayed effect, a relationship change, or nothing?

These questions affect the turn model, action economy, objective balance, Fate's powers, narrative quality, user interface, and testing.

## 2. Candidate models

### A. Direct action selection with a conflict rule
Each player submits a desired action for Jules. If both choices are compatible, both can contribute; if incompatible, a declared rule chooses or combines them.

**Benefits**
- Easy to explain what a player is trying to do.
- Clear action vocabulary and straightforward tests.
- Strong, immediate sense of control.

**Costs and risks**
- Jules can feel like a puppet or a shared cursor rather than a character.
- Winner-take-all conflict can make the losing player's turn feel wasted.
- Tie-breaks and priority can dominate strategy more than the narrative.
- Fate needs a comparable, explicit way to influence the result.

**Best fit if:** playtests prioritize tactical clarity and direct competition over protagonist autonomy.

### B. Competing intentions resolved by transparent character constraints
Each player proposes an intention. A deterministic rule resolves the contest using explicit factors such as available time, knowledge, resources, commitments, and a small set of established protagonist priorities. The engine explains which constraints mattered.

**Benefits**
- Supports indirect control while preserving character plausibility.
- The same intention can succeed in one state and fail in another for understandable reasons.
- World changes, discoveries, and commitments can matter without being extra action types.

**Costs and risks**
- Too many factors create a hidden scoring formula and cognitive burden.
- If weights are visible and stable, players may solve the formula instead of engaging with the story.
- If weights are hidden or narratively improvised, failure feels arbitrary.
- Balancing character priorities across scenarios is expensive.

**Best fit if:** a small, legible set of constraints can produce meaningful variation without opaque calculations.

### C. Influence bidding or resource contest
Players choose an intention and spend a limited influence resource. The higher effective influence determines the main action, or changes its likelihood/strength.

**Benefits**
- Makes commitment and opportunity cost explicit.
- Creates bluffing around scarce resources.
- A losing intention may still matter if partial effects are deliberately supported.

**Costs and risks**
- Adds economy, arithmetic, and balance work.
- Can create a dominant strategy: always bid high on the most important moment, or conserve until the end.
- Resource starvation can remove a player's agency.
- A simple “highest number wins” rule may feel detached from character and world facts.

**Best fit if:** the resource contest itself is intended to be a major strategic layer, not merely a patch for action conflicts.

### D. Environmental manipulation rather than direct protagonist orders
Players change or exploit facts, evidence, relationships, opportunities, and obstacles. Jules then acts within the resulting world according to explicit constraints and known information.

**Benefits**
- Strongest potential for indirect control and emergent causality.
- Players can cooperate temporarily by changing the same world conditions.
- Actions can remain meaningful even when Jules chooses a different immediate path.
- Fits a story where small ordinary details later enable or prevent large events.

**Costs and risks**
- The connection between a player's action and the outcome may feel too indirect.
- Players may not know which world facts are strategically important.
- It can drift into a general puzzle about manipulating state rather than steering a character.
- Scenario authoring and causal explanations become central quality bottlenecks.

**Best fit if:** players enjoy planning chains of consequences and the interface makes causal dependencies legible.

### E. One primary steering action plus one narrow interference action
Each player submits a primary intention. Each may also select a limited interference action from a small, explicit set. The engine resolves the primary contest and applies interference only under specified conditions.

**Benefits**
- Preserves active steering and sabotage in every round.
- Can make the losing player's choice consequential.
- Supports the fantasy of two competing forces influencing one person.

**Costs and risks**
- Two choices per player per round can double decision complexity.
- Interference may become mandatory rather than situational.
- The order between steering, interference, protagonist constraints, and Fate becomes intricate.
- More action types mean more collision cases and balance problems.

**Best fit if:** a simpler single-intention model repeatedly leaves one player with no meaningful counterplay.

## 3. Comparative assessment

| Criterion | A: Direct choice | B: Constrained intention | C: Influence bid | D: World manipulation | E: Steering + interference |
|---|---|---|---|---|---|
| Immediate agency | High | Medium-high if legible | High but resource-dependent | Indirect | High |
| Protagonist plausibility | Low-medium | Potentially high | Depends on rules | Potentially high | Depends on resolution |
| Ease to teach | High | Medium | Medium | Medium-low | Low-medium |
| Strategic opportunity cost | Depends on action limit | Inherent in constraints | Strong, explicit | Emerges from setup | Strong but potentially dense |
| Meaningful losing action | Needs design | Possible through partial effects | Must be designed | Often possible indirectly | Likely, but costly |
| Risk of opaque outcomes | Low if conflict rules clear | High if constraints are too complex | Low-medium | Medium-high | Medium-high |
| Scenario authoring burden | Low-medium | Medium-high | Medium | High | High |
| Collision/test burden | Medium | High | High | High | Very high |
| Current evidence | None | None | None | None | None |

This is a hypothesis table, not a scoring result. The values depend on the final rules.

## 4. Required separation of concepts

The implementation must not collapse these concepts into one vague “action”:

- **Intention:** what a player wants Jules to attempt.
- **Capability:** whether Jules can do it with current resources and access.
- **Knowledge:** whether Jules knows enough to choose or perform it.
- **Motivation/constraint:** established priorities, commitments, fears, or social costs that may affect the choice.
- **Interference:** a legal change to an intention's feasibility, cost, target, or consequence.
- **Outcome:** the authoritative result produced by rules.
- **Interpretation:** what a player believes the outcome means.
- **Narration:** text that communicates the outcome without changing it.

If the design includes motivation weights, they must be few, understandable, testable, and connected to visible character facts. Avoid a large simulated-psychology system unless the core game demonstrably needs it.

## 5. Cross-system implications

### Objectives
Objectives should reward outcomes and meaningful causal contributions, not only the number of times a player's preferred action wins. Otherwise the losing player is incentivized to spam the same intention or sabotage every turn.

### Fate
Fate should operate through the same world constraints and a documented action budget. If player intentions are constrained by knowledge, access, time, or commitments, Fate's routes should be constrained by prerequisites too. Fate must not gain unrestricted authority simply because it is automated.

### Information
A player may know a fact that Jules does not. The player should not be able to issue an action that assumes Jules knows it unless the action explicitly reveals, communicates, or otherwise transfers that knowledge. The UI should distinguish player-visible information from protagonist-available knowledge.

### Pacing
If each player selects several sub-actions, resolution and explanations may take longer than the story itself. Count meaningful decisions per round, not just clicks. More choices are useful only if they create different, understandable trade-offs.

### Replayability
Replayability should come from different strategies, state-dependent constraints, and alternative causal routes—not arbitrary hidden action outcomes. If deterministic rules make a scenario solvable after one play, consider whether hidden information or branching setup adds strategic uncertainty without breaking fairness.

### Testing
For every model, test the same intention in at least three states: clearly feasible, feasible with a cost, and infeasible. Also test two competing intentions, missing character knowledge, changed targets, and Fate/player conflict. Each result needs a stable reason code.

## 6. Shortlist for the next paper simulation

Do not simulate all five models in full. First shortlist the two least-complex candidates that best preserve the product thesis:

- **Candidate B:** competing intentions resolved through a small set of transparent protagonist/world constraints.
- **Candidate D:** environmental manipulation with a tightly limited set of explicit world-state actions.

Use Candidate A as a clarity baseline. Consider bidding or separate interference only if the shortlist reveals a concrete need for a resource contest or a way to preserve losing actions.

This shortlist is provisional. It is not a decision to implement B or D.

## 7. Evaluation protocol

Use the same starting facts and objective criteria for each candidate. For each of at least three rounds, record:
1. each player's available information;
2. legal options and their opportunity costs;
3. the submitted intention/action and why it was chosen;
4. any constraints, interference, or Fate action;
5. deterministic resolution and reason codes;
6. resulting state and objective progress;
7. the explanation each player receives;
8. whether a different choice was plausibly viable.

Reject or revise a model if outcomes feel arbitrary, a player repeatedly has no meaningful choice, character knowledge is bypassed, one action dominates, or a major consequence cannot be reconstructed from the event chain.

## 8. Current conclusion

The most important unresolved design decision is not simply “simultaneous or alternating turns.” It is **what unit of control each player receives over the protagonist**. Timing, action economy, conflict resolution, Fate, and the interface should be evaluated around that unit of control. The next paper simulation should compare complete combinations rather than select turn timing in isolation.
