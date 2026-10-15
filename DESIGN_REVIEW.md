# Design Review — FATE/CTRL

**Status:** Open review. No design choice is accepted merely because a document describes it.

## Review standard

For every mechanic, evaluate the intended player experience, decision quality, counterplay/fairness, effects on objectives and pacing, readability, edge cases, causal coherence, implementation/testing cost, replayability, and evidence that could disprove the design claim. Remove mechanics whose strategic value does not justify their cognitive and engineering cost.

## Main unresolved design questions

### What does each player control?

Direct intention and environmental influence are the leading candidates. Do not conflate this with simultaneous versus alternating commitment; unit of control and timing are separate dimensions. CONTROL_MODEL.md is the consolidated working reference and is pending deep independent audit.

### How does Jules select an action?

The protagonist policy must respect capability, knowledge, established traits, and commitments. It must be deterministic and explainable without turning Jules into a puppet or letting a player objective masquerade as Jules's motivation. The current priority table is only a hypothesis.

### What are the minimum action and resource rules?

Compare a bounded submission per player against any resource/cooldown system only when a specific exploit or fairness problem requires it. Count meaningful options per player, especially after a proposal loses or an influence goes unused. Avoid adding bidding, reactions, or a hybrid as speculative repairs.

### How are conflicts, expiry, and information resolved?

Specify compatibility, conflicting effects, stale targets, failed prerequisites, costs/refunds, deadline boundaries, delayed effects, duplicate submissions, and objective/Fate evaluation order. Information must distinguish objective truth, evidence, character knowledge, player knowledge, belief, and disclosure.

### Can Fate create pressure without arbitrariness?

Fate needs a legal intervention set, prerequisites, limits, visible signals at the appropriate level, counterplay, and alternative routes. It cannot invent facts or undo successful actions without a supported rule.

### Is the umbrella escalation earned?

The current trace supports investigating public blame for a consequential local failure during a real emergency, but does not justify claiming Jules caused a citywide emergency. The story should be revised or replaced if it requires forced coincidences, a contrived crowd/broadcast, or an implausible public inference.

### Are objectives measurable and feasible?

“Preserve trust” needs an observable predicate. Exposing prior knowledge needs an evidence source for what the flatmate knew, not merely proof of an earlier defect. Both players need plausible routes, partial outcomes where appropriate, and counterplay.

### What experience and architecture should be tested first?

Session length, finale pacing, online versus local play, randomness, generated narration, and scenario representation remain open. Decide them only when the core loop requires a choice. Keep the first test local and deterministic unless a question specifically requires network play.

## Other open questions

- Does the game blend tactical strategy, social deduction, negotiation, or some combination?
- How much of Fate's objective and next milestone should players see?
- Should objectives be zero-sum, partially compatible, or independently scored?
- Do hidden facts create interesting inference or impossible objectives?
- Does deterministic character behavior feel authored and predictable, or over-scripted?
- Does the same control model transfer cleanly to a second tiny scenario?
- What is the smallest UI that helps players understand legal options and outcomes on a phone?

## Evidence and present assessment

All current model traces are authored desk analysis. No independent reconstruction or human playtest has been recorded.

- PAPER_SIMULATION_01.md surfaced risks around the one-action-per-round bottleneck, knowledge transfer, and deadline ordering.
- PAPER_SIMULATION_02.md stress-tested one provisional influence model but did not define a globally accepted resolution contract.
- DIRECT_INTENTION_TRACE.md, MATCHED_MODEL_COMPARISON_01.md, and PRIORITY_TABLE_REPLAY_01.md attempted to compare models. The consolidated review in CONTROL_MODEL.md identifies remaining semantic gaps: direct intentions do not clearly define the candidate-action set, and environmental “salience/friction” effects do not yet have operational values used by the protagonist policy.
- INFORMATION_MODEL.md, MODULE_CONTRACTS.md, and ARCHITECTURE.md describe proposed technical boundaries, not an accepted runtime schema.
- The causal-route files challenge the citywide ending but do not establish an accepted alternative.
- OBJECTIVE_AND_FAIRNESS_WORKSHEET.md distinguishes goals, progress signals, terminal predicates, partial outcomes, and feasibility; no scoring model is accepted.

## Next exercise

Obtain a deep independent audit of CONTROL_MODEL.md before doing another self-authored simulation. Require the reviewer to separate reproducible contradictions from legitimate design trade-offs and open product decisions. Resolve critical submission semantics, influence-effect mechanics, fixture mismatches, and objective feasibility in that file; then run a corrected matched experiment.

Only after a reviewer can independently reconstruct the outcomes should the project move to a tiny comparative local prototype. Keep the causal-finale decision as a separate gate; a control-model audit does not validate the umbrella premise.
