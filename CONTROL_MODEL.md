# Control Model — Consolidated Decision Draft

**Status:** External-audit draft; not accepted rules.  
**Decision owner:** Project owner.  
**Evidence available:** Authored desk analysis only; no independent reconstruction or human playtest has been recorded.  
**Scope:** This file consolidates the active decision about what each player controls and how Jules chooses an action. It deliberately separates that question from turn timing and from the city's causal finale.

## 1. The decision we need to make

FATE/CTRL is intended to let two players with competing objectives influence one protagonist without either player owning Jules outright. Fate adds pressure through bounded, causally supported interventions. The central unresolved question is:

**What does each player submit each round, and how does that submission change what Jules actually does?**

Two candidates currently warrant comparison:

- **Direct intention:** a player proposes an action they want Jules to take.
- **Environmental influence:** a player changes a bounded world condition, opportunity, constraint, or cost; Jules then chooses an action within the resulting state.

Neither has been selected. A hybrid, bidding system, or separate interference action is not justified until a pure model has demonstrated a specific shortcoming that the alternative solves.

### Not the same decision: unit of control versus timing

The repository sometimes discusses simultaneous commitment, alternating turns, and hybrid reactions alongside the direct-intention/environmental-influence choice. These are related but distinct dimensions:

1. **Unit of control:** what a player submits.
2. **Commitment timing:** when a player submits and whether the opponent can see it.
3. **Resolution policy:** how submissions and protagonist priorities produce an outcome.
4. **Action economy:** how many submissions/actions and resources each player receives.
5. **Protagonist policy:** how Jules selects among legal actions.

For the first comparison, this document provisionally holds submission timing constant: both players submit one item privately and simultaneously. This is a comparison control, **not a decision that simultaneous timing is the final game**. Timing should be evaluated separately once the unit of control is clearer.

## 2. Non-negotiable constraints for either candidate

These are design constraints for the experiment, not evidence that either candidate already satisfies them.

- A player submission is not an unconditional command over Jules.
- Jules cannot use knowledge they do not possess.
- A player's private information does not automatically become Jules's knowledge.
- No action or influence creates an unsupported fact, witness, recording, relationship, or evidence item.
- The same canonical state and accepted inputs must produce the same authoritative outcome.
- A visible explanation must identify the rule or condition that made an action succeed, fail, become unavailable, or remain unused.
- Objective progress must derive from state/events, not from the submission merely being made.
- Fate cannot use a milestone until its stated prerequisites are true.
- Narration communicates resolved facts; it is not an outcome authority.
- Do not add a hybrid, resource contest, or extra reaction phase just to repair a weakness that has not been demonstrated.

## 3. Shared test fixture

This is an analytical fixture for comparing the models, not canonical scenario truth. It intentionally focuses on three rounds of the umbrella problem and excludes the proposed public emergency.

### World facts assumed for this test

- Jules borrowed a red umbrella from a flatmate.
- A loose rib existed before the loan; Jules later worsened a tear. These are two distinct condition changes.
- A dated photo in a message thread depicts the earlier loose rib.
- The photo establishes only what can be seen in the image. It does not by itself establish that the flatmate noticed the defect, remembered it, or deliberately failed to disclose it.
- A corroborating message about the flatmate's knowledge is **not** assumed to exist in this fixture unless scenario data explicitly adds it.
- A repair kit exists in the apartment.
- For this comparison only, the flatmate leaves after the third completed resolution boundary. In round 1 the flatmate is not reachable; in rounds 2 and 3 the flatmate is reachable; the flatmate departs after Jules's action in round 3.
- The photo's source does not expire during these three rounds.
- No public emergency or public evidence chain exists during this test. Fate's public-blame milestone is therefore ineligible.
- Jules wants to return the umbrella honestly, avoid an unnecessarily humiliating confrontation, and resolve material uncertainty when there is time.
- Jules has one major protagonist action per round in both candidate models. This is a provisional comparison constraint, not an approved final action economy.

### Character and player knowledge

At the start, Jules knows they worsened the tear and knows that the flatmate is leaving soon. Jules has not inspected the photo and does not know whether the flatmate knew about the earlier loose rib.

Player-only knowledge must be tracked separately. If Player B's private briefing says the photo exists, that fact cannot silently become part of Jules's knowledge.

### Draft player goals

- **Player A:** return the umbrella honestly and preserve trust.
- **Player B:** establish, with supportable evidence, that the flatmate knew about the earlier defect and failed to disclose it.

Neither goal has an accepted terminal predicate. “Preserve trust” requires an observable rule or state change; it cannot be inferred solely from Jules's honest intention. Player B's goal requires evidence of prior knowledge and nondisclosure, not merely proof that the umbrella had an earlier defect.

### Fixture contradictions to carry forward

- CORE_LOOP_COMPARISON.md says the flatmate leaves in two resolution cycles, while several later traces use three boundaries. This test uses three, but the fixture source has not yet been reconciled across the repository.
- DIRECT_INTENTION_TRACE.md starts with the photo inaccessible to Jules, while MATCHED_MODEL_COMPARISON_01.md and this test make the thread searchable. This test assumes the photo can be found by Jules but remains uninspected. That assumption needs to be reflected in the canonical scenario fixture before implementation.
- scenarios/umbrella.json still has undefined objective predicates, Fate milestones, intervention rules, and departure timing. It remains a design probe.
- The broader public-emergency premise is not part of this three-round test and is not thereby validated.

## 4. Candidate I — Direct intention

### Submission

Each player submits one proposed protagonist action for Jules. The proposal includes an action identifier and only the target/parameters permitted by the scenario. It is a request or candidate, not a guaranteed command.

### Candidate resolution concept

1. Validate each proposal against the same round-start state and Jules's current knowledge/capability.
2. Record each legal proposal and each ineligible proposal with a stable reason.
3. Use a declared protagonist-selection policy to choose among the legal submitted proposals.
4. Execute no more than one major protagonist action under this fixture.
5. Record the selected proposal, rejected/unselected proposal, resulting state, acquired knowledge, and objective progress separately.

**Critical unresolved point:** the prototype contract must say whether Jules chooses only among the submitted legal proposals or may choose any legal action in the scenario. These lead to different games. If Jules can ignore both submitted proposals and select any action, direct intention may have almost no causal effect. If Jules only chooses between submissions, the players' proposals define the candidate set and a fallback is needed when no proposal is legal. Do not quietly switch between these semantics within a trace.

### Potential strengths

- The player's attempted contribution is concrete and easy to phrase.
- The game can explain why a proposal was not selected.
- Costs and intent are easier to inspect in an event log.

### Risks to test

- If one proposal is selected and the other has no continuing effect, the losing player may feel denied a meaningful turn.
- If Jules's selection policy is opaque, direct requests do not guarantee perceived agency.
- If the priority policy ignores the proposals, the control input may be cosmetic.
- If proposal priority is based directly on player objective progress, Jules becomes a proxy for the scoring system rather than a character.

## 5. Candidate W — Environmental influence

### Submission

Each player submits one bounded world influence. An influence must specify a target, a supported effect, its preconditions, its magnitude or discrete outcome, its duration/expiry, and any cost. The effect must operate on an established fact, resource, relationship, opportunity, or constraint.

### Candidate resolution concept

1. Validate both influences and their targets against the same round-start snapshot.
2. Resolve compatible effects and conflicts under one explicit rule.
3. Record changes to state and active effects before Jules chooses an action.
4. Derive Jules's legal action set from the changed canonical state and current knowledge.
5. Use the same protagonist-selection policy as Candidate I.
6. Record each applied/failed influence, its measurable consequence, Jules's selected action, and objective progress separately.

An influence cannot simply say “make Jules care more,” “make the evidence convincing,” or “make an event happen.” Such effects have no testable semantics until expressed as named state changes with bounded consequences.

### Potential strengths

- A player may change future options even when Jules chooses another immediate action.
- Both players could contribute to a chain of events without both requiring the same protagonist action slot.
- Environmental setup may support counterplay and causal planning.

### Risks to test

- The connection between submission and outcome can become indirect or invisible.
- Cheap, permanent setup may dominate the game or permit unlimited stacking.
- The scenario author may introduce vague effects such as salience, friction, or opportunity without defining their mechanical consequence.
- Two influences may conflict, compose, overwrite one another, expire, or become stale; each case requires a clear rule.
- If the effect never changes legality, cost, duration, information, or another variable the protagonist policy uses, it may have no causal impact.

## 6. Protagonist policy: common candidate table

A common policy is needed so we do not favor one model by giving Jules different priorities in each trace. The following table is a provisional test policy copied into this consolidated decision for scrutiny, not an accepted game rule.

Evaluate only legal actions and Jules's current knowledge. Apply preferences in the listed order. Do not let a player objective count as a Jules preference.

| Order | Condition | Candidate preference |
|---|---|---|
| P0 — Legality | Required capability, access, knowledge, or target is missing | Exclude the action; a submission cannot make it legal |
| P1 — Immediate departure | Flatmate leaves after this action and an honest return is still possible | Prefer RETURN_HONESTLY over actions that can safely wait, unless return requires a knowingly false statement |
| P2 — Prepare before deadline | At least two boundaries remain and Jules has no credible return/repair plan | Prefer PLAN_REPAIR over INSPECT_PHOTO and WAIT unless the evidence access/source is about to disappear |
| P3 — Material uncertainty | A consequential, unresolved fact can be checked from an accessible, existing source | Prefer INSPECT_PHOTO over WAIT or repeated inspection of already-known information |
| P4 — Honest accountability | A reachable conversation can acknowledge Jules's own damage without unsupported accusation | Prefer a truthful return or knowledge question, according to deadline state |
| P5 — Avoid unnecessary confrontation | Higher priorities do not distinguish the remaining legal options | Prefer needed information or a private conversation over public accusation |
| P6 — Stable tie-break | Options remain equivalent | Use earliest deadline relevance, then a fixed scenario-authored action order |

### What this policy does not define

The table does not define a complete scoring function. It does not define how an environmental influence changes friction, salience, time, or action cost. It does not define how Jules selects when neither player's direct proposal is legal. It does not define the objective evaluator or a trust predicate. It may over-prioritize repair at the expense of evidence, and it may make Jules predictable. These are substantive open questions, not implementation details to fill in silently.

## 7. Matched three-round trace and its limits

The following is a descriptive replay of the latest desk analysis. It is **not yet a valid proof that the two models have equivalent or different strategic quality**.

| Round | Shared state and legal options | Direct-intention submissions | Provisional protagonist choice | Influence submissions as currently described | What the comparison has not established |
|---|---|---|---|---|---|
| 1 — Three boundaries remain | Jules knows about the tear. Photo is accessible but uninspected. Repair kit is available. Flatmate is unreachable. Candidate actions include PLAN_REPAIR and INSPECT_PHOTO. | A proposes PLAN_REPAIR; B proposes INSPECT_PHOTO. | P2 selects PLAN_REPAIR because no plan exists and at least two boundaries remain. | A reduces effort/makes the repair kit salient; B makes the existing thread easier to notice without revealing contents. | “Effort” and “salience” have no defined state representation or effect on policy. The selected action may be the same even if both influences have zero effect. Direct intention semantics also depend on whether Jules chooses only between proposals. |
| 2 — Two boundaries remain | Repair plan exists. Flatmate is reachable. Photo remains uninspected and available. | A proposes RETURN_HONESTLY; B proposes INSPECT_PHOTO. | P3 selects INSPECT_PHOTO because the repair plan exists and the source is available. Jules learns only that the earlier loose rib appears in the photo. | A preserves a private return opportunity; B reduces the effort of inspection. | The shared policy selects the photo even without a specified B influence, and the rules do not define whether A's opportunity persists, how it costs an action, or whether it changes an available action. Contribution from either influence is not yet demonstrated. |
| 3 — Final boundary | Flatmate is reachable and departs after Jules's action. Jules knows the rib was loose earlier but does not know what the flatmate knew. | A proposes RETURN_HONESTLY; B proposes ASK_KNOWLEDGE. | P1 selects RETURN_HONESTLY. Under this fixture, that action does not include ASK_KNOWLEDGE unless the action contract is deliberately changed. | A preserves the private return opportunity; B makes a supported knowledge question easier to ask. | It is not defined how “easier to ask” changes selection. B's goal is unresolved, but its feasibility was not established from a known evidence source. Trust preservation is also not measured. |

### Interim conclusion from the trace

The trace exposes the largest unresolved comparison defect: the influence model describes qualitative changes, but neither the effect contract nor the protagonist policy gives those changes an operational value. The current outcomes therefore do not demonstrate that both influence submissions mattered. It would be misleading to call the trace a successful matched experiment until that is fixed.

The direct-intention model has the opposite unresolved issue: it is not explicit whether Jules chooses only among the two proposals or from all scenario-legal actions. If it is the latter, the proposals may be ignored by the protagonist policy; if it is the former, a policy and fallback for illegal or duplicate proposals are required.

A fair test may conclude that these models are not fully reducible to one shared decision policy because they provide different control units. The requirement is not identical mechanics; it is matched scenario facts, action budget, timing, protagonist traits, objective predicates, and a transparent explanation of each model's distinctive causal contribution.

## 8. Comparison criteria

Do not compute a weighted score from the desk trace. Use these criteria to guide an independent audit and later a human comparison.

| Criterion | Question | Minimum evidence |
|---|---|---|
| Immediate agency | Can the player predict how a submission could affect the next meaningful decision? | Trace links submission to a real outcome without guesswork |
| Protagonist autonomy | Does Jules remain constrained by knowledge, capability, preferences, and commitments? | Illegal/uninformed actions are blocked with reasons |
| Strategic depth | Are there multiple viable options with real trade-offs for each player? | At least two plausible strategies per player |
| Compatibility | Can both players contribute without automatic erasure, and can they also genuinely conflict? | One compatible and one incompatible worked case |
| Counterplay | Can the opponent respond to a consequential threat in time? | At least one credible disruption path per major threat |
| Readability | Can an independent reviewer reconstruct why the outcome occurred? | State, accepted inputs, reason codes, and resulting events |
| Information fairness | Is player-only information kept separate from Jules's knowledge? | No unexplained knowledge transfer or hidden-target leaks |
| Pacing and cognitive load | Does the model generate meaningful decisions rather than idle setup, forced denial, or modifier bookkeeping? | Novice teach-back and observed play |
| Objective fairness | Are goals meaningfully achievable and not trivially determined by a single deadline? | Predicates, feasibility routes, and exploit audit |
| Narrative causality | Does a submission change a supported cause/opportunity rather than only its narration? | Each change is traceable to state/events |
| Implementation burden | Can legality, resolution, expiry, and replay be expressed in a bounded deterministic contract? | Explicit contracts and tests remain small enough to audit |
| Scenario generality | Does the control unit transfer beyond the umbrella example? | One second tiny scenario uses it without a bespoke exception |

No player study or independent reconstruction has yet supplied evidence against these criteria. A document's completeness is not a substitute for evidence.

## 9. Questions that must be answered before selecting a model

### Semantics and fairness
1. In Candidate I, does Jules select only among submitted legal proposals, or from all legal scenario actions? What happens when proposals duplicate, conflict, or are both illegal?
2. Does each proposal itself have a mechanical force beyond nominating an action? If so, what is it and how is it communicated?
3. In Candidate W, which effect types are permitted in the minimum prototype? Are magnitude, duration, costs, stacking, and visibility fixed per effect?
4. What measurable variable can “salience” or “friction” change? If the protagonist policy does not consult that variable, why is it a valid effect?
5. When does Jules select an action relative to influence application, information updates, deadlines, and objective evaluation?
6. Can an influence create a future opportunity that Jules never uses? What resource/cost is consumed, and when does the opportunity expire?
7. How do the two models provide counterplay without turning the game into winner-take-all request rejection or invisible environmental setup?

### Scenario and objective feasibility
8. What existing source can establish that the flatmate knew about the loose rib? If no such source is seeded, is Player B's objective impossible by design?
9. What observable state change means trust was preserved? Is it a player goal, a character belief, a relationship variable, or a terminal predicate?
10. Does the three-round deadline produce meaningful choices or make one objective automatically unattainable? What earlier route gives both players a chance?
11. Are there any Fate decisions in the test? If not, the test cannot show how the chosen control model interacts with Fate; that must be a separate test after control semantics are coherent.

### Evidence and decision quality
12. Which differences in the trace are caused by the control model, and which are caused by unspecified influence effects, missing evidence, or the protagonist policy?
13. Is the current preference table too scripted or biased? Does it produce state-dependent choices for principled reasons?
14. What is the smallest follow-up experiment that can discriminate the candidates rather than simply produce another plausible story?
15. Which conclusions are supported by the written trace, and which require an independent reviewer or human players?

## 10. Decision gate

Do not accept a model from the current paper trace. Before moving to a small comparative prototype:

- Define the candidate submission contracts for both models precisely.
- Make the canonical test fixture agree on the deadline, photo access, knowledge facts, and available evidence sources.
- Define objective progress separately from objective completion, with an explicit trust predicate and a feasible evidence route for B.
- Give influence effects a bounded, operational meaning and show at least one outcome they actually change.
- Clarify the candidate set, rejection rules, and fallback in direct intention.
- Re-run the same three-round fixture with the same player submission budget, timing convention, character traits, knowledge, objectives, and ending rules.
- Include at least one genuine conflict, one compatible pair of submissions, one unused/expired influence, and one state where each player's strategic route is favored.
- Have an independent reviewer reconstruct the trace without coaching.
- Only then decide whether either model is sufficiently defined to try in a local deterministic prototype.

After this gate, evaluate timing (simultaneous versus alternating) as a separate axis rather than assuming the answer from the chosen control unit.

## 11. Related repository material and intended authority

This is the proposed single working reference for the control-model decision while the consolidation/audit is in progress.

- SPEC.md remains the product-level draft and scope reference; it does not settle the control model.
- scenarios/umbrella.json remains a design probe, not an executable source of truth.
- INFORMATION_MODEL.md defines the required distinctions among facts, knowledge, belief, disclosure, and narration.
- MODULE_CONTRACTS.md and ARCHITECTURE.md contain engineering boundaries that must be reconciled before implementation.
- DECISIONS.md is the canonical decision log; D-013 says to compare pure models before proposing a hybrid.
- PRIORITY_TABLE_REPLAY_01.md is source analysis for the candidate table and round trace.
- MATCHED_MODEL_COMPARISON_01.md and MODEL_COMPARISON_SCORECARD.md are supporting analytical artifacts, not independent evidence.
- DIRECT_INTENTION_TRACE.md, PAPER_SIMULATION_01.md, PAPER_SIMULATION_02.md, CORE_LOOP_COMPARISON.md, and PROTAGONIST_CONTROL.md are prior exploratory analyses. They contain historical assumptions that should not be silently treated as current rules.

**Consolidation rule:** once this file passes audit and is accepted by the project owner, update the other control-related documents to link here for current assumptions, label their original traces as historical evidence, and remove or archive duplicated active summaries. Preserve the history; do not maintain multiple competing definitions of the same rule.
