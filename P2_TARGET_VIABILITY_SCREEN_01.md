# P2 Target Viability Screen 01 — After First-Pass Reconstruction

**Date:** 2026-10-23  
**Inputs:** `P2_RECONSTRUCTION_PACKET.md` v0.1; `P2_RECONSTRUCTION_REVIEW_01.md` (Claude AI first pass, with possible priming disclosed); `SCENARIO_CAUSALITY_REVIEW.md` §§15.1–15.8  
**Status:** Design analysis only. No Fate target, scenario, objective, or rule is accepted by this document.

## 1. Decision question

Can the current borrowed-radio premise support a measurable, counterable Fate objective using facts and sources already defined, while creating meaningful tension between the players' objectives and serving the intended short narrative strategy game?

The review does not support further implementation work yet. The current T0 target lacks operator attribution; T1 is measurable but too weak/overlapping as a standalone Fate goal; T2-F2 has a sign-off timing defect and a hidden-action leakage risk. The question is therefore whether a revised *local consequence* target can justify retaining P2 as a scenario candidate, or whether P2 should be demoted to a mechanics micro-test while the game premise is reconsidered.

## 2. Minimum acceptance criteria

A candidate Fate target must satisfy all of these—not merely be expressible as a boolean predicate.

1. **State measurability:** success is determined by authoritative state and timed events, not by an unmodelled audience belief or vague narrative judgement.
2. **Causal integrity:** the tracked outcome follows from explicit facts and resolved actions. Independent causes (the weather closure, radio malfunction, protagonist contribution and record outcome) remain distinct.
3. **Evidence integrity:** every public/in-world claim uses a source that proves it. The resolver's private action record is not evidence available to characters.
4. **Player coupling:** Fate's goal intersects both players' goals in a meaningful way rather than duplicating one player's objective or relying on a coincidence.
5. **Counterplay before evaluation:** a legal player action can defeat the target before its evaluation point. An action occurring after the target is evaluated is not counterplay to that target.
6. **Distinct route gate:** at least three routes must differ in their causal hinge, not merely share the same queue consequence or change the channel used to display the same stale direction.
7. **Terminal coherence:** success and failure lead to explicit, credible next states. A local delay alone is not the full 10–15-minute game's escalating finale.
8. **Low invention burden:** the candidate does not require silently adding a custody log, authenticated call-sign, certain witness, forced audience belief, arbitrary cutoff, or unseeded source.

## 3. Candidate comparison

| Candidate | What is measured | Assessment after reconstruction | Current disposition |
|---|---|---|---|
| **T0 — Jules-specific transmission attribution** | First signed note links the queue to Jules as the R4 operator while omitting the prior warning | The defined sources do not identify who operated R4. A selected action known to the resolver is not an in-world source. R3 is a physical paddle action, not a radio transmission. | **Reject under current source contract.** Reconsider only if a credible source and retrieval path already belong in the premise and survive review; do not invent them to save T0. |
| **T1 — Warning absent from the first note** | The note is signed without the existing Facilities warning | The predicate is easy to measure, but it overlaps B's stated evidence-inclusion goal and A's preference to keep the message out of the first note. Absence alone does not establish that Jules was blamed, that the warning was inaccessible, or that anyone believed anything. | **Too weak as a standalone Fate goal.** It may be a state component of a larger target, but is not a sufficient dramatic outcome by itself. |
| **T2-F2 — Failed source access plus no private follow-up** | A queue/delay exists; the first note omits the warning; Jules has not asked Ren privately; F2 actually intercepts a selected Review/attach attempt | More coupled than T1, but the 18:24 sign-off evaluates the first-note target before the proposed Beat 4. The intercepted attempt has no retry before evaluation; calling the effect temporary does not make it counterable in the relevant window. Interception can also reveal a hidden proposal by elimination. | **Fails as currently timed and projected.** It needs a coherent redefined evaluation horizon and a visibility-safe resolution, not simply a later addendum label. |
| **T3 — Pre-correction operational delay** (redesign candidate only) | Before the scheduled arrivals are safely routed, an incomplete or wrong authoritative cue results in a recorded hold/delay; a subsequent correction may clear the active queue while delay remains | This avoids falsely attributing the independent weather closure or making a public-blame claim. It is measurable from the cue and queue state. However, the present candidate acts do not yet prove three distinct causal hinges, and a hold can arise from the default no-cue rule without a Jules-caused error. A local delay does not by itself deliver a compelling Fate objective or full-game finale. | **Possible micro-scenario target, not a validated Fate goal.** Must define what contribution is being tested and demonstrate three distinct routes and counterplay without overclaiming. |
| **T4 — New premise built around a better-supported Fate goal** (strategic alternative) | To be defined from pre-existing world facts and a Fate objective that can be observed and defeated | Allows the game to retain its intended narrative escalation without forcing the borrowed-radio facts to prove unsupported attribution. Requires new premise discovery and a fresh packet; it must not be treated as permission to introduce arbitrary facts. | **Recommended path if P2 cannot pass T3's route/objective gate.** P2 can remain a mechanics stress test rather than the production opening. |

## 4. Route distinctness audit

The current candidates are not three established routes to one Fate target.

- **Stale display relay:** the complete stale EAST destination becomes the authoritative radio cue; attendees approach the barrier and stop.
- **Truncated verified instruction:** the destination is absent, the paddle is HOLD, and Mina follows the hold fallback at East Intake.
- **Physical paddle EAST:** the paddle can direct the group toward the barrier only if no complete radio destination exists.

These outcomes are not interchangeable just because they can produce a delay. The stale relay and paddle action both rely on the same stale EAST direction and may be two channels for the same causal hinge. The truncated instruction relies on the radio's deterministic segment failure and the absence of another complete cue. The current packet does not establish a third materially distinct viable route to T0 or to a broader Fate milestone.

**Required test:** describe each proposed route as (a) initiating event, (b) causal mechanism, (c) observed consequence, (d) source chain, (e) legal counterplay, and (f) defeat condition. If two routes rely on the same causal hinge, collapse them into one. Do not promote a route to "viable" solely to reach a count of three.

## 5. Objective structure must be settled independently of the target

### Player A

A1 is direct R4 handover by 18:24. A2 is a private question to Ren after the beep, with the Facilities message absent from the first note. Under the single-task, three-beat contract, A2's required sequence consumes route verification, the long transmission, and the private question. A1 needs a fourth action and its deadline is the same 18:24 boundary.

Before another trace, the owner-facing product contract must choose one of these structures:

- **Competing subgoals:** A1 and A2 are separately scored opportunities, and the player is expected to trade one against the other. Neither is a prerequisite for the other's completion.
- **Conjunctive objective:** A must achieve both. In the current time/action model, this is infeasible and requires changing the schedule/action economy or objective content.
- **Alternative routes to one broader goal:** either a successful handover or a private disclosure may contribute to a separately defined broader predicate. That broader predicate and how the evidence proves it would need to be specified before use.

No option is selected here. Simply labelling them "two separately tracked aims" does not define overall success or partial outcome semantics.

### Player B

B's goal must state separately whether it requires (1) the Facilities warning in the first signed note, (2) Ren's acknowledgement in that same note, and (3) a truthful record that a radio event occurred. The present sources cannot prove that Jules was the operator. "Preserving Jules's transmission" cannot quietly be interpreted as identifying Jules in the note.

Source reading and record attachment also need explicit information rules. In the packet, RA reads and attaches in one action, making source access inseparable from public disclosure. Changing that contract could create a new action and an action-economy consequence; it cannot be silently done in this screen.

## 6. Timing and Fate-intervention boundary

The same state cannot have contradictory evaluation moments. A signed-first-note objective is evaluated when the note is signed. If sign-off is 18:24, a later addendum cannot retroactively change the first-note predicate. If the design intends source-access delay to be temporarily counterable, it must define a real legal access action before the relevant target evaluation, or explicitly choose a target whose state is evaluated later.

A fourth beat may be valid in a redesigned scenario, but it cannot be added only as a cosmetic recovery window. A complete timing contract must specify:
- when the first note is signed;
- when A, B and Fate predicates are evaluated;
- whether the private conversation window ends at Ren's handover;
- whether the held group remains in the scene and what actions can resolve it;
- the legal proposals and selector policy in any additional beat;
- whether later evidence is appended, who receives it and which original predicates remain immutable;
- Fate's activation decision, available budget, cost/refund rules, progress metric, visible signal and expiry.

Do not claim a delayed attempt is meaningfully temporary if no relevant objective can still be affected after the delay expires.

## 7. Recommendation

**Recommended:** do not advance P2 as the production scenario or add more detailed priority tables yet.

First use the current evidence to reject T0, retain T1 only as a possible state component, and test whether T3 (a local operational-delay objective without an unsupported blame claim) has enough objective coupling and three genuinely distinct routes to justify continuing P2. If it does not, retain the radio trace only as a small mechanics stress test and return to premise discovery for T4.

This is a recommendation for the next design experiment, not an accepted product decision. P2 remains non-canon; all current route classifications and objective priorities remain provisional.

## 8. Explicit non-goals

This screen does not:
- select a final Fate target or story premise;
- add sources, witnesses, public belief, logs, deadlines or actions;
- define a full-game terminal condition;
- implement an action resolver or player-view projection;
- change `scenarios/umbrella.json` or `scenarios/control_model_test_fixture.json`;
- claim human playtest evidence, balance, fairness, or fun.
