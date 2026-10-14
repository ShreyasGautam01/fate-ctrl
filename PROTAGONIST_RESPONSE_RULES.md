# Protagonist Response Rules — Candidate Models

**Status:** Analysis of alternatives; no runtime behavior accepted.  
**Purpose:** Define how Jules selects an action so player influence does not become arbitrary and player intention does not become absolute control.

## 1. Why this decision is central

Both candidate control models rely on the same protagonist question: when more than one action is possible, why does Jules do one rather than another?

If an LLM or narrator decides this freely, the core game becomes difficult to reproduce, test, and explain. If a fixed rule always chooses the same kind of action, Jules becomes a predictable machine. The design needs bounded, legible autonomy.

The response rule must also avoid a common comparison error: do not give the direct-intention model a favorable protagonist preference and the environmental-influence model an unfavorable one. Both candidates must share the same response rule during the comparison.

## 2. Four response-model candidates

### R1 — Static weighted utility

Each legal action receives a score from factors such as urgency, character preferences, relationship effects, information value, and prior commitments. Jules selects the highest score.

**Advantages**
- Flexible across changing states.
- Can express trade-offs and gradual changes in priorities.
- Easy to run deterministically if all factors are explicit.

**Risks**
- Weights are hard to justify and can create false precision.
- A small score change may produce a surprising action switch.
- Players may reverse-engineer the scoring formula rather than reason about Jules.
- Adding factors can create hidden interactions and balance work.

**Use only if:** ordinal rules cannot express the desired behavior and playtesting demonstrates the need for graded trade-offs.

### R2 — Lexicographic priorities

Evaluate legal actions by a fixed priority order. For example: respect capability/knowledge; prevent an immediate irreversible consequence; honor an imminent commitment; follow current character priorities; then apply a stable tie-break.

**Advantages**
- Easy to explain and test.
- Avoids invented numeric weights.
- Makes precedence explicit.

**Risks**
- The first applicable rule can dominate everything else.
- Players may exploit predictable precedence.
- A rigid ordering may fail to express a nuanced trade-off.

**Use if:** the number of meaningful priority classes is small and stable.

### R3 — Scenario-authored decision table

Each scenario defines a small set of state conditions and ranked actions, with an explicit fallback. The table is validated for unreachable conditions, contradictory rankings, and missing cases.

**Advantages**
- Can express scenario-specific human motives without a general-purpose AI.
- Deterministic and inspectable.
- Keeps narrative-specific logic in scenario data rather than the engine.

**Risks**
- Rules can proliferate as exceptions accumulate.
- A scenario can accidentally script the protagonist along one route.
- A second scenario may reveal that the vocabulary is too narrow.

**Use if:** the game is scenario-driven and a small, auditable table covers the first playable slice.

### R4 — LLM-selected action

A language model receives the state and chooses what Jules does.

**Advantages**
- Can produce flexible, characterful responses.
- May reduce the amount of manually authored behavior.

**Risks**
- Outcomes can vary with prompts/model versions and are difficult to replay exactly.
- Hidden reasoning makes fairness and player-facing explanations hard to guarantee.
- It may use facts the character does not know unless carefully constrained.
- It adds latency, cost, availability, and safety/quality failure modes.
- It can silently become the true rules engine.

**Current assessment:** Do not use an LLM as the authoritative action selector in the core game. It may later generate candidate flavor or a non-authoritative suggestion, but only after deterministic rules select the outcome.

## 3. Candidate prototype policy

For analysis only, investigate R2 or a small R3 table before weighted utility. The goal is not to simulate a complete human psyche. The goal is to give Jules a small number of consistent, understandable priorities that make both player influence and character agency matter.

Any candidate policy must have these hard gates:
1. **Legality:** Jules cannot select an action whose preconditions, knowledge, access, or capability requirements are false.
2. **State relevance:** The action must address a real opportunity, current goal, commitment, or consequence in canonical state.
3. **Declared precedence:** If urgency overrides a preference, that precedence is documented.
4. **No hidden information:** Player-only knowledge cannot be used by Jules unless a defined event transfers it.
5. **Stable tie behavior:** Ties resolve by a documented rule, not randomness or narration.
6. **Explainability:** The engine records the applicable rule IDs and safe reason codes.
7. **Bounded authoring:** The first scenario should not require dozens of exception rules.

## 4. Illustrative rule skeleton — not yet approved

This is a candidate structure, not a final ranking:
- **Gate A — Legal and known:** Remove actions Jules cannot perform or does not have enough information to attempt.
- **Gate B — Immediate irreversible consequence:** Prefer an action that prevents a clearly established, imminent consequence when doing nothing would make it irreversible.
- **Gate C — Explicit commitment/deadline:** Consider a prior commitment or deadline only if the action actually advances it.
- **Gate D — Character priorities:** Compare remaining actions using scenario-authored priorities such as honesty, preserving trust, avoiding confrontation, or resolving uncertainty.
- **Gate E — Stable tie-break:** If the actions remain equivalent, use a visible deterministic tie rule.

The ordering between Gate B and Gate C is a real design decision. A deadline can be less important than avoiding harm, but that should not be silently assumed in every scenario. Each priority must have a definition and counterexample.

## 5. Avoid using the objective itself as protagonist motivation

Player objectives and Jules's own priorities must not be conflated.

- Player A may want trust preserved.
- Player B may want accountability established.
- Jules may want to return the umbrella honestly while avoiding a confrontation.
- Fate may want a public attribution event.

If Jules automatically acts to satisfy the highest-progress player objective, that player effectively controls the protagonist. If Jules ignores both player objectives in favor of a scripted character arc, player agency becomes cosmetic. The response policy should represent Jules's own short list of priorities; player submissions or world influences affect the available options, not the truth of those priorities.

## 6. Candidate trace requirements

For each round, record:
- all legal candidate actions and why they are legal;
- actions removed by knowledge/capability constraints;
- active deadlines and commitments;
- applicable protagonist preference rules;
- selected action and the decisive rule;
- unselected requests/opportunities and their consequences;
- resulting events and knowledge updates;
- player-visible explanation that does not leak private information.

Do not report only the selected action. Without the rejected alternatives and decision reason, the model cannot be audited.

## 7. Failure tests

Reject or revise the policy if:
- Jules uses a fact not yet known;
- the same state and inputs produce different actions;
- a minor score/priority tweak changes outcomes unpredictably;
- the policy always chooses the same action class regardless of state;
- the player cannot predict what information would make a request eligible;
- the rules require a narrative exception for a dramatic moment;
- a scenario author can write contradictory priorities without validation;
- the policy favors one player's goal because that objective is coded as a character trait;
- the explanation reveals the opponent's hidden objective or private evidence.

## 8. Recommendation and next gate

Do not finalize protagonist behavior yet. First specify a small scenario-authored priority table for the umbrella test, including at least one A-favoring and one B-favoring state, then replay both control models using that exact same table. A neutral reviewer should be able to identify the decisive rule from the event log. If the table grows into a story script, revisit whether Jules needs autonomous action selection at all.
