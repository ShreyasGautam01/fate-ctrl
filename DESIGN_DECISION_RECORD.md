# Design Decision Record — Working Index

Use this index to make the difference between a hypothesis, a decision, and tested evidence explicit. DECISIONS.md remains the canonical log; this file gives each pending decision an ownerable review checklist.

## Status vocabulary
- **Open:** alternatives not sufficiently analyzed.
- **Under analysis:** options and trade-offs are being documented.
- **Proposed:** a candidate is recommended for review but not binding.
- **Accepted for prototype:** implementable for a limited experiment; not proof of final product suitability.
- **Validated:** supported by specified playtest/test evidence and still subject to revisit.
- **Rejected:** documented rationale explains why the option was declined.
- **Superseded:** replaced by a later decision with a link.

## Decision gates

| ID | Decision | Current status | Required evidence before acceptance |
|---|---|---|---|
| G-01 | What does a player control? | Under analysis | Compare direct intention and environmental influence with worked outcomes and failure cases |
| G-02 | When do players commit? | Open | Compare simultaneous/alternating timing after control unit is clear |
| G-03 | How are incompatible influences resolved? | Open | At least one deterministic rule tested against compatible, conflicting, stale-target, and deadline cases |
| G-04 | How does Jules respond to changed opportunities? | Open | Small, explicit decision rule that respects knowledge, capability, commitment, and established traits |
| G-05 | What is an objective's success condition? | Open | Measurable predicates; compatible and partial success cases |
| G-06 | What may Fate do and at what cost? | Open | Legal intervention set, prerequisites, budget/limits, warning, counterplay |
| G-07 | What makes escalation causal? | Under analysis | At least three candidate causal chains and one credible escape route |
| G-08 | What information does each audience see? | Open | Fact/knowledge/belief/evidence/disclosure model plus leakage audit |
| G-09 | How is a scenario represented? | Open | Express a complete tiny scenario and validate it; avoid general-purpose DSL prematurely |
| G-10 | Is online multiplayer required in the first prototype? | Open | Identify playtest questions that cannot be answered with local simulation/pass-and-play |
| G-11 | Is generated narration worth its risks/cost? | Open | Core loop is playable with deterministic narration; test a specific limitation first |

No gate becomes accepted merely because the related document is complete.
