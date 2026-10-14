# Core-Loop Comparison — Draft 0.1

**Status:** Analysis in progress; no model selected.  
**Purpose:** Compare interaction models against the same state, objectives, and action intent before committing to architecture.

## 1. First, correct a scenario contradiction

The current premise says Jules damaged the borrowed umbrella, while Player B's objective assumes the flatmate knowingly lent an already-damaged umbrella. These claims can coexist only if there were two distinct damage events, or if one statement changes. This affects objective fairness, evidence, character knowledge, and whether Jules can honestly take responsibility.

**Working hypothesis for this comparison only:** the umbrella had a loose rib before borrowing; Jules later worsened a tear. The flatmate knew about the loose rib but did not warn Jules. Jules knows they worsened the tear but does not know what the flatmate knew. A timestamped photo in the flatmate's message history could establish the earlier defect. This is not accepted scenario canon.

## 2. Shared starting state

This is a deliberately small first-round situation. It does not yet model the city emergency.

- Jules borrowed the red umbrella.
- The umbrella had a loose rib before borrowing; Jules later worsened a tear.
- The flatmate leaves in two resolution cycles.
- The flatmate is in the kitchen; Jules is in the hallway with the umbrella.
- Jules knows they worsened the tear, but does not know the flatmate's prior knowledge.
- Player A wants the umbrella returned without damaging trust.
- Player B wants the flatmate's prior knowledge and failure to warn exposed.
- Fate's long-term goal is to associate Jules, the umbrella, and a later public emergency. Fate's next step and legal powers are not specified here; this comparison does not grant Fate arbitrary action.

### Candidate action intent
- **A:** ask for a private inspection, acknowledge the tear Jules caused, and offer to repair it.
- **B:** search the shared message history for a timestamped photo before making an accusation.

These are intents, not yet fully specified legal actions. The final design must decide whether a player chooses an action directly, proposes an intention for Jules, or spends a resource to influence what Jules does.

## 3. Model A — Simultaneous commitment

### Candidate round sequence
1. Both players receive their authorized view of the same starting state.
2. Each privately commits one legal action and any required target.
3. The coordinator closes commitment when both have submitted or a deadline expires.
4. Both actions are revealed.
5. The resolver validates them against a defined resolution snapshot and applies the documented conflict policy.
6. Objective progress and Fate eligibility are evaluated at a declared boundary.
7. Each player receives a filtered explanation of the result.

### Worked outcome under a provisional policy
Suppose A's action creates a private inspection request and B's action searches the message history. The actions target different things, so both may succeed: the request is made and the photo is found by B. B does not automatically publish the photo, and discovering it does not automatically mean Jules or the flatmate knows it exists.

The design must distinguish finding evidence, a player learning it, a character learning it, and making it public. If the engine collapses these into one event, hidden-information play becomes incoherent.

If both actions instead require the same limited opportunity—for example, Jules can perform only one time-consuming action before the flatmate leaves—the rules need an explicit conflict policy. Options include action priority, cost/strength comparison, or a defined partial outcome. “Resolve whichever action feels natural” is not acceptable for a strategic game.

### Strengths
- Supports bluffing and planning without giving the second mover automatic information advantage.
- Makes simultaneous intention part of the tension.
- Can produce outcomes where both players partially succeed.
- Avoids a simple action-then-cancellation rhythm.

### Risks
- Players may struggle to predict interactions before commitment.
- Shared-resource conflicts need careful rules.
- Players may feel an action was wasted if its target changes or another action pre-empts it.
- Timeouts and disconnected players require fair defaults.
- The interface must communicate commitment state without leaking the opponent's selection.

## 4. Model B — Alternating influence and response

### Candidate round sequence
1. The designated first player receives the current view and acts.
2. The second player sees the permitted consequences, then responds or interferes.
3. The coordinator validates the response against the updated state.
4. The world resolves; objectives and Fate are evaluated at a declared boundary.
5. Both players receive authorized explanations.

### Worked outcome under a provisional policy
A acts first and requests a private inspection while admitting Jules worsened the tear. B then sees that request and searches the message history. If searching is still available, both actions may succeed. If B instead has a reaction that can stop the conversation, B's response advantage may turn the round into direct cancellation.

If B acts first in a later round, the advantage may reverse. Rotating the first player can distribute initiative, but it does not eliminate the structural benefit of acting with more information. Reactions therefore need narrow scope and cost; otherwise the second player effectively gets to veto the first player's meaningful decision.

### Strengths
- Easier to teach, narrate, and debug.
- The responder can make informed choices based on an actual change.
- Clear action-feedback cycles can help new players understand causality.

### Risks
- Second-player information advantage may be strong.
- Broad reaction mechanics can collapse into counterspell/cancellation loops.
- The first action may become forced setup rather than a meaningful decision.
- Sequential pauses can reduce pace, especially online.
- Initiative rotation may add bookkeeping without fixing the core issue.

## 5. Model C — Hybrid simultaneous intent with bounded reaction

Both players commit a primary intent simultaneously, followed by a limited reaction only when a defined trigger occurs. It must not grant a free universal veto.

For example, each player commits one primary action. If the opponent's resolved action changes a named target or crosses a public threshold, a player may spend a scarce reaction resource on one of a small set of legal responses. Trigger, timing, eligible targets, cost, and conflict rules must be exact.

This could preserve simultaneous planning while allowing a response to meaningful developments. However, it adds a second decision window, more phase states, and a resource economy. It is justified only if the simpler simultaneous model cannot provide enough counterplay.

## 6. Cross-system comparison

| Criterion | Simultaneous | Alternating | Hybrid |
|---|---|---|---|
| Bluffing and hidden intent | Strong natural fit | Weaker; later player sees more | Strong, with limited reaction |
| Ease of first explanation | Moderate | Strong | Weakest |
| Resolution complexity | Higher at collisions | Lower to moderate | Highest |
| Risk of cancellation loops | Moderate if rules are clear | High if reactions are broad | High unless reaction scope is narrow |
| Second-mover advantage | Low by default; resolution priority still matters | Structural risk | Depends on reaction timing |
| Online waiting/timeout handling | Both need deadlines | Sequential pauses can accumulate | Most phase complexity |
| State/version handling | Commitments refer to a shared snapshot | Responses refer to updated state | Both snapshot and reaction state |
| Readability of causality | Requires explicit resolution report | Often easier locally | Requires explaining both phases |
| Strategic potential | Planning, prediction, commitment | Adaptation, response, initiative | Potentially both, at extra cost |
| Current evidence | Not tested | Not tested | Not tested |

No column is a winner yet. This table expresses likely trade-offs, not playtest results.

## 7. Invariants any model must satisfy

1. A command is legal only under a defined state/phase and visibility policy.
2. The design states whether legality is checked at commitment time, resolution time, or both.
3. If a target changes after commitment, the result is explicit: reject, retarget under a declared rule, or apply a documented fallback.
4. No player may silently rewrite another player's accepted action.
5. Simultaneous conflicts have deterministic tie-breaks and player-facing reason codes.
6. Hidden facts do not leak through errors, event order, or timing.
7. A rejected or stale action cannot mutate state or spend resources unless a deliberate rule says otherwise.
8. Objective and Fate evaluation occur at named resolution boundaries.
9. Every consequence is traceable to an accepted action, rule, or scenario trigger.
10. Fixed state and fixed accepted inputs yield the same result.

## 8. Collision cases to specify before implementation

These are test prompts, not decisions about their results.

1. Two players influence Jules to take incompatible actions.
2. One action protects the umbrella while another suppresses its availability.
3. One action reveals the photo while another attempts to keep the message private.
4. A delay action and the flatmate's departure deadline expire on the same boundary.
5. A player commits to an object that another action removes or moves.
6. A prerequisite action fails while a dependent action was also committed.
7. Both player objectives complete in the same resolution.
8. A player disconnects after committing while the other has not committed.
9. The same command is submitted twice after a network retry.
10. Fate's next milestone becomes eligible only because of a player's action in the current resolution.
11. A protective effect expires at the same boundary as a harmful action.
12. Two actions compete for one limited resource or one protagonist opportunity.

For each case, document initial state, accepted commands, resolution order, resulting state, emitted events, costs, objective progress, and the exact explanation shown to each player.

## 9. Recommendation status and next experiment

**No interaction model is selected yet.** The next task is a paper simulation with at least three rounds for each leading candidate. Use the same initial facts, objectives, Fate pressure, and strategy profiles. Record:
- meaningful choices per player;
- whether players can predict or explain outcomes;
- action cancellation and wasted-action frequency;
- resolution ambiguities;
- perceived agency and fairness;
- decision time and round pacing;
- complexity added to state, UI, and testing.

A provisional recommendation should follow from that comparison. If evidence is inconclusive, build two tiny simulation harnesses rather than prematurely choosing a full application architecture.
