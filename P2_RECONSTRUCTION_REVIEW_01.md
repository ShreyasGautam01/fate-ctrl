# P2 Reconstruction Review 01 — Borrowed Radio

**Review date:** 2026-10-23  
**Packet reviewed:** \`P2_RECONSTRUCTION_PACKET.md\` v0.1, branch \`docs/p2-reconstruction-packet-01\`, packet-era head \`c48a19e\`  
**Reviewer:** Claude (AI reviewer; not a human playtester)  
**Review type:** First-pass desk reconstruction with an external throwaway model used for selected reachability, legality, pair-coverage and objective-feasibility checks  
**Disposition:** **FAIL / PARTIAL RECONSTRUCTION. Do not advance P2 to implementation.**  
**Canon status:** None. This review records findings; it does not approve any story fact, Fate target, or rule.

## 1. Executive result

The reviewer reports that the packet did **not** pass its reconstruction exit criteria. The result is more useful than a simple fail: it identifies several root-level design problems that cannot be resolved by adding isolated edge-case rules.

The review says:

- Cases A and B are reconstructable only for the two action pairs with explicitly stated hypotheses H1 and H2. Case C's seven requested pairs are reconstructable under H3 or the same-action rule, and those outcomes are role-swap invariant. Case D's cue-precedence transitions are deterministic as a *stipulated state test*, but its full sequence is not reachable within the three pre-sign-off beats.
- Much of the action selector remains undefined. At B1 and B2, each stated hypothesis ranks only one of ten legal distinct-action pairs. At B3, H3 ranks pairs among five actions but leaves every pair involving the still-legal long instruction unresolved.
- Player A's two aims cannot both be completed in three beats if A2 is conjunctive with A1: route verification, the long instruction that enables the private follow-up, the private conversation, and direct handover require four separate actions.
- Player B's first-note objective is narrowly contingent on the competing proposal in Beat 3; its acknowledgement and transmission-preservation components are not operationally defined.
- The proposed Beat 4 begins after the 18:24 evaluation boundary for the first signed note and the stated Fate target. Therefore it cannot counter those already-evaluated predicates.
- The available in-world sources do not establish that Jules operated R4 during the transmission. No candidate route currently earns the stated Jules-specific attribution target; at most one route is conditional, and that route still lacks an attribution source.
- The Fate intervention's generic signal can leak the selected hidden action by elimination. Its activation, budget, progress metric, and some visibility rules are undefined.
- A queue/hold can arise simply because Mina's default rule is to hold attendees when no cue exists. This can occur without a Jules error, so the existence of a delay is not sufficient evidence of Jules's causal contribution.
- The review identifies 25 findings: incomplete priorities; knowledge, evidence and visibility gaps; infeasible or unclear objectives; unsupported attribution; and missing terminal/phase rules.

**Interpretation:** This is not a request to implement 25 local patches. The first decision is whether the P2 target and objective structure are worth retaining at all. The strongest recommendation is to stop trying to prove a Jules-specific transmission-blame target with sources that were expressly defined not to identify the operator.

## 2. Review independence and limits

The reviewer reports that they derived their answers from the reconstruction packet and did not open \`SCENARIO_CAUSALITY_REVIEW.md\` §15, the author's worked traces, reports, or prototype code. They used a throwaway model outside the repository to check selected mechanical claims. The model is review evidence reported by the reviewer; it has not been committed or independently rerun in this repository.

The reviewer disclosed one source of possible priming: they consulted the \`PLAYTEST_PLAN.md\` diff to find the requested response format. That diff contained a sentence stating that F2 must be rejected if the game ends at 18:24 or Beat 4 is not a real legal phase. The reviewer says their Case G conclusion also follows from the packet's timing/evaluation rules, but conservatively flags possible priming. This therefore should be labelled an **AI first-pass with disclosed possible priming**, not a perfectly isolated blind review.

It is not a human playtest, evidence of enjoyment, or proof that real players understand the rules. A human independent reconstruction can still be useful after the root design is revised; repeating this same packet without correction is not the immediate next step.

## 3. Findings that reproduced

### 3.1 Deterministic mechanics that held up

The review reports these positive results:

- The latest complete radio destination outranks the paddle; the paddle applies only when no complete radio destination exists; otherwise Mina holds. A truncated message does not erase an earlier complete destination.
- The action-then-arrival-then-sign-off ordering is explicit enough to derive the scheduled 18:20 and 18:24 events.
- Role-swapping the seven Case C action pairs and the three tested Fate-intervention pairs does not change action selection under H3. That demonstrates proposer-blindness for those tested rows, not objective fairness or completeness of the selector.
- The cutoff precondition makes the long two-part instruction illegal once Jules has actually learned the warning.
- The distinction between an active queue and a recorded delay can be reasoned about; the recorded delay may remain after a cue clears the current queue.
- The packet's individual source descriptions are mostly careful about what each source can and cannot establish. The main attribution overclaim is in the Fate target, not in the evidence table itself.

These results validate narrow rule properties only. They do not establish a coherent game loop.

### 3.2 Major structural failures

**A. A's objective bundle is infeasible as a conjunction.** A2 needs a verified route, the long transmission and its double beep, then a private follow-up with Ren; A1 separately needs a direct R4 handover. The packet permits one declared task per beat and only three beats through sign-off. Four tasks cannot fit in three beats. If these aims are intended as a deliberate trade-off rather than a joint success condition, that relationship and the scoring/terminal semantics are not stated.

**B. B's evidence objective has a narrow and unresolved route.** Under the stated H3 order, Review/attach wins at Beat 3 only when opposed by Return R4 (or the same Review/attach action is submitted twice). Route repair and the private conversation outrank evidence attachment. B-2 (Ren's acknowledgement) and B-3 (preservation of Jules's transmission) are not tied to explicit source/attachment semantics. The record has no source that identifies Jules as the radio operator.

**C. Fate's intervention is temporally disconnected from its target.** The target and first-note predicate are assessed at the 18:24 sign-off. The proposed fourth beat starts after that point. A later addendum cannot rewrite the first signed note or retroactively satisfy a predicate concerning that note. A delayed source-access attempt can still be an interesting bounded effect in some design, but it is not counterplay to the stated sign-off target.

**D. The target is not supported by the source model.** The dispatch log records only radio device/time; Mina's report describes the cue received, not its operator; the thread establishes the warning and Ren's acknowledgement, not who used R4 during a later transmission; the camera records paddle handling, not radio use, and has no retrieval/attachment action. The resolver's record of a private submitted action is not in-world evidence. The current seeded source chain cannot prove the claim that the signed note links Jules to the transmission.

**E. The queue is not by itself causal proof.** When no complete radio destination and no explicit paddle cue exist, Mina's stated fallback is to hold attendees at East Intake. This can generate a hold and recorded delay even when Jules did not cause it. Any Fate milestone must distinguish the independently caused water closure, the reason the group is held, Jules's actual contribution if any, the evidence of that contribution, and any later belief or attribution.

**F. The game timeline is incomplete.** The packet says 18:24 is not automatically the overall end of the game, but defines no complete legal-action and objective-evaluation phase beyond sign-off. Fate's evaluation time, the group's state at sign-off, whether sign-off occurs when Jules is absent, the existence and action policy of Beat 4, the audience for an addendum, and the final terminal condition all remain open.

## 4. Finding register

The IDs below preserve the reviewer's finding labels. "Needed" records the specification decision or definition required to make the area reviewable; it does **not** authorize a new story fact or silently approve a fix.

| ID | Classification | Finding | Needed before another test |
|---|---|---|---|
| F-01 | Rule gap; priority/fairness | The stated selector hypotheses rank only a small subset of legal proposal pairs at B1/B2. Most legal pairs lack a result. | Define a complete state/action-pair policy or a principled fail-closed rule for uncovered pairs. |
| F-02 | Rule gap | RL remains legal after the beep if Jules has not learned the cutoff, but H3 leaves pairs involving RL unrated. | Decide whether the beep teaches the cutoff; otherwise cover RL in the selector contract. |
| F-03 | Rule gap; knowledge/visibility | AR requires Jules to observe the missing destination and resulting hold, but the event/location/view that supplies that observation is unspecified. | Define an observable acquisition event, without assuming a character knows what the resolver knows. |
| F-04 | Contradiction | R4 is described as emitting a double beep at release, while action rows do not consistently establish which releases beep. | Specify exactly which radio actions produce the beep and what, if anything, it reveals. |
| F-05 | Objective ambiguity; priority/fairness | A1 and A2 cannot both be completed in three single-task beats; completion semantics for the two aims are unstated. | Decide whether these are conjunctive, competing subgoals, or alternatives; redesign the task budget or the objectives accordingly. |
| F-06 | Objective ambiguity | The private objective's question to Ren differs from the AR action wording. | Align the action and objective predicates exactly. |
| F-07 | Objective ambiguity; rule gap | B's aim mixes warning inclusion, Ren's acknowledgement, and preserving Jules's transmission, but attachment scope and the meaning of "preserving" are undefined. | Define exactly which source items must be attached and how the recorded transmission is represented, without inventing operator attribution. |
| F-08 | Unsupported assumption | Ren's guaranteed admission and the handover/checklist procedure are assumptions, not validated facts. | Keep these provisional; test whether they are credible before adopting them. |
| F-09 | Rule gap; terminology/timing contradiction | The report is said to contain a queue report at 18:11 even though the queue is scheduled to arise at 18:20; "report" and "note" are also conflated. | Define the note lifecycle, event updates, and distinct names for Mina's report versus the incident note. |
| F-10 | Rule gap; knowledge/visibility | RA combines reading and attaching the warning, so source inspection cannot be separated from public disclosure; this blocks A2. | Decide whether source access and evidence disclosure are separate tasks and specify information visibility. |
| F-11 | Priority/fairness | H3 is proposer-blind in tested swaps, but its ordering can structurally privilege route correction over both personal objectives, and B's goal depends on what A proposes. | Define and test objective-fairness criteria; do not infer fairness from role-swap invariance alone. |
| F-12 | Rule gap; character response | Ren's truthful admission is guaranteed; the effects on trust and Jules's knowledge of the cutoff are unspecified. | Define a credible response policy and separate spoken knowledge from source access; do not assume a favorable answer just to make a route work. |
| F-13 | Rule gap | Fate's activation authority, resource budget/refund, progress metric, and signal perception are unspecified. | Define legal intervention timing, cost, selection, progress and observation before evaluating F2. |
| F-14 | Causal overclaim; unresolved terminal condition | Beat 4 opens after the first-note/Fate predicates are evaluated at sign-off, so it cannot counter the stated target. | Choose a coherent evaluation/terminal boundary and ensure intervention counterplay can affect the predicate it is meant to contest. |
| F-15 | Unresolved terminal condition | The overall ending and legal play after 18:24 are undefined; the full Case D sequence is not reachable in three beats. | Define terminal/phase rules. Keep Case D explicitly labelled as an isolated state-invariant test if it is not intended as a reachable scenario trace. |
| F-16 | Rule gap | The bounds of the "group-window" and the status of radio messages sent before the group exists are undefined. | Define when a destination becomes associated with the relevant group. |
| F-17 | Rule gap; causal overclaim risk | Queue, hold, and delay are conflated; a hold/delay can arise by fallback without a Jules-caused error. | Define state terms and the delay measure, and distinguish absence of a cue from a player-caused event. |
| F-18 | Rule gap | Several actions do not define Jules's resulting location, leaving reachability and AR's availability ambiguous. | Specify location/state effects consistently for every action that uses location or access. |
| F-19 | Rule gap | PW can be legal while having no effect under a complete radio destination; repeated evidence attachment has no idempotency rule. | Define no-op/void actions, repeat submissions and whether duplicate effects are allowed. |
| F-20 | Knowledge/visibility leak | An interception result can reveal the selected hidden action by elimination, exposing the opponent's proposal despite the generic signal. | Specify player-view projection and ensure post-resolution feedback does not reveal hidden submissions by inference. |
| F-21 | Unsupported target / causal overclaim | No seeded source establishes Jules as R4 operator; a physical paddle action does not meet a transmission-specific target; no source establishes that all volunteers believe Jules caused the closure. | Reconsider the target from available evidence. Do not add a convenient log, witness, or audience belief without separately redesigning and reviewing the scenario. |
| F-22 | Rule gap | "Actual timestamp" for the addendum is ambiguous; "relevant" and audience delivery are undefined. | Define source time versus append time, relevance criteria and who receives an addendum. |
| F-23 | Rule gap | The warning's ten-second wording does not clearly map to the two-segment mechanism or specify all safe/unsafe instructions. | Make the known warning and deterministic failure contract unambiguous and consistent. |
| F-24 | Rule gap | The camera/display/loan chain cannot be used as evidence where no legal retrieval/attachment path exists. | Either keep those sources out of the claim or separately define and test their acquisition actions; do not assume a retrieval mechanic. |
| F-25 | Unresolved terminal condition | Sign-off behavior is unspecified if Jules is absent, the queue remains held, or the handover is missed. | Define whether sign-off is time-driven, who/what makes it occur, and the state consequences. |

## 5. Route classification from this review

The reviewer classifies the three proposed mechanisms as follows:

| Candidate act | Local mechanism | Does the current evidence prove Jules operated the source? | Finding against the current Fate target |
|---|---|---|---|
| Relay the stale display over R4 before verification | A complete EAST destination can direct attendees toward the closed passage and cause a queue at the barrier. | No. Dispatch plus Mina's cue report does not identify the operator. | **Different target.** A complete stale relay is not the same mechanism as the truncated correction with an absent prior warning. |
| Send the long verified two-part instruction | Segment A arrives without Segment B's destination; if no earlier complete destination or paddle cue exists, Mina holds attendees and delay may result. | No. The current note sources do not tie this transmission to Jules. | **Conditional only.** This is the only candidate shaped like the stated transmission-plus-warning target, but it lacks an attribution source and depends on keeping the warning out of the first note. |
| Set the paddle to EAST | A physical EAST cue can direct the group toward the barrier when no complete radio destination exists. | The camera could identify paddle handling in principle, but no retrieval/attachment action is defined; it does not prove radio operation. | **Target mismatch.** It is not a transmission route. |

The reviewer therefore finds **no three materially distinct routes to the same stated Fate target**. The common queue consequence does not make the causes equivalent or prove an attribution. R1 can be defeated by verifying the route first or sending a corrective WEST cue; R2 can be defeated by a complete short instruction or a WEST paddle while no complete destination exists; R3 can be defeated by verifying first or using a complete radio destination that takes precedence over the paddle. The current non-Fate path is a local queue that can be cleared, a recorded delay that remains, and a first note containing only sources actually attached; there is no supported Jules-specific attribution.

## 6. Recommended triage order (proposed, not approved rules)

Do not solve the review by adding 25 unrelated exceptions. Resolve the underlying design decisions in this order:

1. **Target viability first.** Reconsider T0 (Jules-specific transmission attribution). The current evidence model cannot support it. The packet's F2 intervention changes source access; it cannot provide missing operator evidence. A different measurable target or a different premise must be evaluated against the existing facts before any new source or audience rule is invented.
2. **Objective structure second.** Decide what Player A is supposed to optimize: direct R4 handover, raising the private question, or a deliberate trade-off between them. As written, both cannot complete before sign-off. Define whether the aims are conjunctive or alternatives and what partial outcomes mean. Define B's predicates as explicit record contents and decide whether the packet's proposed source action legitimately exposes Ren's acknowledgement.
3. **Timeline and terminal horizon third.** Define what happens at 18:24, when objective/Fate predicates are evaluated, whether play continues, the status of a still-held group, and whether Beat 4 is a genuine phase. A later addendum must not be counted as satisfying an immutable first-note predicate.
4. **Resolution policy fourth.** Specify a complete direct-action selector contract for every legal pair/state, not a growing hand-authored patch list. Define invalid submissions, same-action consensus, no-op/void actions, actor identity invariance, and what the protagonist is known to observe.
5. **Information and source model fifth.** Separate source access, reading, disclosure/attachment, public projection, the resolver's private record, and character knowledge. Prevent an intervention outcome from leaking an opponent's proposal by elimination.
6. **Only then re-run the paper test.** Update a versioned packet and obtain a new first-pass reconstruction. Reopen the larger scenario gate only if the redesigned target is measurable, at least three routes have distinct causes and evidence chains, counterplay is credible, and a non-Fate ending is coherent.

No step here approves a particular alternative. In particular, this review does **not** authorize inventing a custody log, authenticated speaker system, certain witness, hard public deadline, or audience belief to rescue P2.

## 7. Status and evidence boundary

- **P2 first-pass reconstruction:** completed by an AI reviewer, with disclosed possible priming; result is fail/partial.
- **Human independent reconstruction:** not yet performed.
- **Human playtest:** not performed.
- **Production gameplay / Fate:** not started.
- **Scenario canon:** not established.
- **Executable fixtures and scenario JSON:** must remain unchanged through this triage.
- **Automated code tests:** this is documentation and desk analysis; no code-test result is claimed from this review update.

The review is evidence of unresolved specification and design problems, not permission to implement proposed fixes.
