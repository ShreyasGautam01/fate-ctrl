# Project Plan and Task Ledger

**Current phase:** 0 — concept validation and rule design.  
**Completion rule:** A document existing does not mean a task is complete; exit criteria must be met.

## Phase 0 — Define the game worth building

### P0-01 — Resolve unit of play
**Status:** In progress; authored comparison artifacts exist, but no model selected and independent reconstruction/playtesting remain outstanding.  
**Deliverable:** Worked-round comparison, collision rules, recommendation, rationale.  
**Current artifacts:** CORE_LOOP_COMPARISON.md and PROTAGONIST_CONTROL.md frame the original choices; PAPER_SIMULATION_01.md is exploratory; PAPER_SIMULATION_02.md stress-tests one provisional influence model; DIRECT_INTENTION_TRACE.md gives the direct-intention candidate; MATCHED_MODEL_COMPARISON_01.md aligns the fixture and strategic profiles; MODEL_COMPARISON_SCORECARD.md defines unweighted criteria; PROTAGONIST_RESPONSE_RULES.md compares response policies; PRIORITY_TABLE_REPLAY_01.md applies one provisional priority table to both models.  
**Next:** Ask an independent reviewer to reconstruct PRIORITY_TABLE_REPLAY_01.md without coaching, recording chosen action, decisive rule, knowledge gained, objective progress, and unresolved facts. Fix any ambiguity before running human tests. Then test both models with human players in counterbalanced order. Neither model is selected.  
**Exit:** A three-round comparison has no ambiguous ordering or unexplained cancellation, and the selected model wins against explicit criteria based on independent review and observed playtest evidence.

### P0-02 — Define protagonist influence
**Status:** Analysis started in PROTAGONIST_CONTROL.md; no model selected. This task is coupled to P0-01 and must be resolved jointly rather than in isolation. Define the submitted intention/action, protagonist agency, knowledge constraints, and success/failure reasons.  
**Exit:** Actions have understandable results and meaningful costs; players can explain why an intention succeeded, changed, or failed.

### P0-03 — Define objectives and scoring
**Status:** Worksheet drafted in OBJECTIVE_AND_FAIRNESS_WORKSHEET.md; no scoring model or terminal predicates accepted. Define primary/secondary success, overlapping goals, partial outcomes, and termination.  
**Exit:** Both players have measurable goals and multiple viable strategies.

### P0-04 — Define actions and economy
**Status:** Not started. Compare minimum action set and resource model; specify targets, costs, duration, counterplay, failure.  
**Exit:** Every prototype action is fully specified and common exploits are addressed.

### P0-05 — Define Fate
**Status:** Causal-route workshop in progress; no route or intervention model accepted. The current literal citywide-emergency target may be too large for the umbrella premise. Define legal interventions, limits, signals, routes, counterplay, and alternate endings.  
**Exit:** Three routes and two credible disruptions can be simulated without arbitrary events.

### P0-06 — Simulate umbrella scenario
**Status:** Premise analysis ongoing. CAUSAL_ROUTE_TRACE_01.md supports investigating public blame for a consequential local operational failure, but does not support the literal citywide-emergency ending. No route is accepted.  
**Next:** Test whether the local-blame target creates enough dramatic escalation for the desired finale. Trace a non-Fate branch and at least two player disruptions. If the route needs coincidences or too many newly introduced facts, replace the premise or ending rather than forcing the link.  
**Exit:** Three strategy profiles yield coherent distinct trajectories and players can explain causality.

### P0-07 — Validate information/fairness
**Status:** Conceptual information model drafted in INFORMATION_MODEL.md; no runtime schema accepted. Audit public/private facts, objective difficulty, Fate power, and information leakage.  
**Exit:** Each hidden fact has an owner, discovery path, and visibility rule.

### P0-08 — Approve contracts and architecture gate
**Status:** Not started. Confirm source of truth, resolution boundary, visibility filtering, and tests.  
**Exit:** No duplicated authority; action/event contracts are testable.

### P0-09 — Prepare first playtest
**Status:** Not started. Define hypotheses, tasks, observations, and revise/stop thresholds.  
**Exit:** Protocol can distinguish confusion from a weak mechanic.

## Phase 1 — Minimal deterministic engine (only after Phase 0 approval)
Validate scenario data; represent canonical state and typed commands; implement legality and deterministic resolution; implement objectives and Fate as legal actions; add replay fixtures and automated tests; build a minimal simulation interface.

**Exit:** Tests pass, matches replay identically, and invalid actions cannot mutate state.

## Phase 2 — Playable prototype
Implement only selected interaction model and minimum action set; provide public/private views, action feedback, event history, endings, and authored/assembled narration; conduct structured playtests.

**Exit:** Players understand rules, report meaningful decisions, and can explain outcomes. Otherwise revise the design before expanding.

## Phase 3 — Product direction
Decide whether online multiplayer is essential; test session length, replay, scenario variation, accessibility, and mobile usability; evaluate optional LLM narration only if justified.

## Phase 4 — Production hardening (if justified)
Add server-authoritative online matches, persistence, reconnect, anti-cheat, privacy, monitoring, deployment, schema migrations, and operational docs. Test concurrency, duplicates, hidden information, recovery, and deployment.

## Current blockers
Turn model; protagonist influence; action economy/conflict resolution; objective compatibility/scoring; Fate power/visibility/alternate ending; independent review and first-playtest mode; scenario schema.

## Change discipline
Every task needs a narrow objective, explicit inputs/outputs, dependencies, acceptance criteria, test/review method, out-of-scope list, and rollback path. Record design changes in DECISIONS.md and update affected contracts.
