# P2 Reconstruction Packet — Borrowed Radio

**Version:** 0.1  
**Prepared:** 2026-10-23  
**Status:** Review aid only. This is not scenario canon, an approved ruleset, or independent-review evidence.

## Instructions to the reviewer

This packet is intended for a first-pass, uncoached reconstruction. Please read only this packet until you have recorded your first answers; do not consult the larger scenario review or ask the author what an outcome was meant to be. The author’s preferred trace is deliberately not included here.

Your task is to reconstruct the rules as written, not to rescue the premise. A plausible result is not the same thing as a result forced by the stated rules. Mark a missing rule as missing rather than silently inventing one. You may conclude that a route, priority, objective, or premise should be rejected.

For each disputed result, record:
1. The starting state and facts that matter.
2. Which proposed actions are legal, and the exact precondition for each.
3. Which action resolves, and the exact priority/tie-break rule that determines it.
4. State changes, time changes, facts learned, evidence acquired, and who can see them.
5. Objective progress and completion separately.
6. Whether the conclusion is mechanically established, merely plausible, or unsupported.

Classify each problem as one or more of: **rule gap**, **contradiction**, **illegal action accepted**, **legal action incorrectly rejected**, **knowledge/visibility leak**, **objective ambiguity**, **causal overclaim**, **priority/fairness concern**, or **unresolved terminal condition**. Quote the relevant sentence or table row. Please return your first-pass trace before discussing possible improvements.

## 1. Scenario facts for this paper test

### Setting, route and timing

The scene takes place at Riverside Community Hall during a heavy-rain disruption that already exists. Water has entered the East Passage steps, and venue staff closed that passage at 18:11. Jules did not cause the weather or the closure.

At the Main Hall junction where Jules starts, a wall display still reads “EAST PASSAGE OPEN,” last updated at 18:05. An official closure notice is posted at the East Passage threshold, but a queue blocks Jules’s view of it from the starting position. The venue steward at the information desk can confirm the closure and the approved alternate route: the passable West Main Hall entrance.

Four attendees are due at East Intake at 18:20. Mina, a volunteer assigned around a blind corner, cannot see the wall display or official notice from her station.

Mina follows this deterministic rule for this group-window:
1. Follow the latest complete radio destination received for this group.
2. If no complete radio destination has been received, follow an explicit EAST or WEST MAIN HALL direction on the route paddle.
3. If neither cue exists, hold the attendees at East Intake until a destination is confirmed.

A complete radio destination replaces an earlier complete destination, even when the destination changes. A later complete radio correction supersedes an earlier radio destination. A transmission missing its destination does not replace or erase an earlier complete radio destination. A paddle can guide the group only while there is no complete radio destination for this group-window; it cannot override one. A staffed barrier stops anyone directed toward the closed East Passage. If a cue changes, Mina can redirect attendees who are still stopped outside the closed steps. That clears the active queue but does not erase the recorded delay. No attendee enters the closed passage, and nobody is injured.

### Locations and action economy

Jules starts at the Main Hall junction beside the display. The information desk, East Intake/paddle, and operations desk each lie within a one-minute walk of the junction on open interior routes. Any two of those three destinations are therefore at most two minutes apart via the junction. Every interaction takes less than one minute.

A scene action lasts four minutes, including travel and **one declared task**. There are no travel-only actions, and an action cannot combine two independent tasks. The display-to-paddle trip, return of R4, and question to the steward fit inside one action from any scene node. The East Passage closure blocks only that route; it does not close interior routes. Phone/thread/report access is available at any scene location, and a radio transmission can be made from any location while Jules holds R4.

The wall-display relay ends at the display. Setting the paddle ends at East Intake. Asking the steward ends at the information desk. Returning R4 ends at the operations desk. These are simplifying assumptions for this paper test, not established production-world facts. They intentionally do not model differentiated travel costs.

### Paddle, radio and source records

The route paddle at East Intake starts at HOLD FOR CONFIRMATION. Jules can set it to EAST or WEST MAIN HALL. Mina can read its public face, but the operator-side handle is hidden behind an intake screen. The direction therefore does not, by itself, identify who changed it. A fixed camera records the public face and operator-side handling without audio. Footage is not attached to the incident note automatically.

Jules is assisting the venue team and holds R4, a handheld radio lent by flatmate Ren, the outgoing shift coordinator. Ren remains at the operations desk until the 18:24 handover. Jules promised to hand R4 directly to Ren by then. A secured equipment rack is available later, but placing R4 there after 18:24 does not meet the direct-handover promise.

The existing Operations thread contains a Facilities message timestamped 18:02:

> R4 drops the second part of any instruction that runs beyond ten seconds. Do not use it for multi-part public routing until checked.

Ren replied at 18:04:

> Acknowledged; I will replace it at handover.

Ren later lent R4 to Jules without passing on the warning. Jules has not opened the message at the start. Player B knows that the message exists, but that knowledge does not transfer to Jules. Start with Jules unaware of the cutoff and with no private follow-up raised with Ren.

R4 behaves deterministically. A transmission has two fixed segments. If both are sent as one instruction, R4 always sends Segment A and drops Segment B. A short instruction that fits entirely within Segment A transmits completely. R4 emits a double beep at release. The fault is not random and does not make every radio use fail. The warning concerns multi-part instructions, not every public use. Once Jules has learned the cutoff, the long two-part instruction is not a legal action in this test; the short instruction remains legal. No separate “radio test” action is defined.

For the long verified instruction, Segment A says: “East Passage closed; keep the next four arrivals clear of the threshold.” Segment B says: “send them to the West Main Hall entrance.” For the short correction, the complete destination “West Main Hall” fits within Segment A. The stale display message, “East Passage open; direct arrivals to East Passage,” also fits within Segment A and transmits completely.

### Incident note and information provenance

A preliminary incident note is opened when staff log the closure at 18:11. It is seeded to contain the closure, dispatch events and Mina’s queue report. It does **not** automatically import Operations-thread messages or camera footage.

Mina’s report records the cue she personally received or observed and her response: a complete radio destination if one was received, the portion heard if a transmission was truncated, or the paddle direction she followed. The report alone does not identify who operated R4 or who turned the paddle. The dispatch log records radio device and time but not message content or operator. Camera footage has no audio. Relevant thread messages or footage must be retrieved and attached explicitly; the source must say no more than it actually establishes.

Under the proposed outgoing-shift checklist, the open incident note and loaned equipment are both reviewed at the 18:24 handover. This is one shared operational checkpoint. Ren signs the first version of the note as outgoing coordinator, and twelve Operations volunteers receive that version. Evidence attached before sign-off appears in the first version. Evidence added after sign-off can be appended with its actual later timestamp but cannot rewrite the signed first version. This process is an assumption under review, not accepted canon.

## 2. Objectives and candidate intervention

### Player A’s private objective

A has two separately tracked aims:
- Hand R4 directly to Ren by 18:24.
- After Jules hears the double beep, have Jules privately ask Ren whether he knew about a transmit fault before lending R4, while keeping the Facilities message out of the first incident note.

The second aim requires an explicit private question; omission from the report alone does not satisfy it. Jules may acknowledge Jules’s own actions and may not fabricate or deny facts. The effect of Ren’s response on trust is not defined yet.

### Player B’s private objective

B wants the first signed incident note to contain the existing Facilities warning and Ren’s acknowledgement, while preserving the fact that Jules transmitted the incomplete instruction. The fault does not erase Jules’s contribution.

### Candidate local Fate pressure

One proposed target is that, at sign-off, the note links the queue to Jules’s transmission while the prior warning is absent. Whether the existing evidence could establish that attribution is an open question: the dispatch log has no operator or message content, and Mina’s report records the cue rather than the operator. A private resolver cannot turn its knowledge of the submitted action into public evidence.

A bounded intervention candidate is also under review. Fate may spend one provisional leverage unit and announce a generic public signal before the third action beat. If the selected action is an eligible attempt to review and attach the Operations-thread warning during that beat, Fate intercepts that source-access attempt: Jules receives no content and nothing is attached. The effect does not name the source, reveal its contents, expose either player’s proposal, or choose Jules’s action. It lasts for that beat only and never triggers an automatic retry. If another action resolves, or no eligible access attempt is intercepted, the intervention expires without progress even though the provisional unit was spent. It is eligible only after the queue/delay has been recorded, while the first report remains open, and while Jules has neither learned the warning through another channel nor raised the private follow-up with Ren.

For this intervention to be meaningfully temporary, a proposed fourth beat runs from 18:24 to 18:28. A fresh action can review available Operations-thread items and append a relevant existing item to a signed-record addendum with its true timestamp. This is a generic source-search action: it does not presume that the warning is present. It is not an automatic retry and cannot change the first signed note. If no real fourth action window exists, the intervention’s expiry/counterplay contract is not satisfied.

## 3. Action contracts

Use the following proposed actions and preconditions. Do not add unlisted actions or facts without marking them as design changes.

| Action | Preconditions | Effects and limits |
|---|---|---|
| Ask the steward to confirm the route | Route not yet verified; the information desk is reachable within the beat | Jules learns the closure and approved West Main Hall alternate. It does not reveal the Operations warning or correct the queue by itself. |
| Set the paddle to EAST using the display | Route not verified; paddle is at HOLD; display/paddle trip fits the action | Jules reads the stale display and sets the paddle. EAST affects Mina’s direction only if no complete radio destination exists. |
| Set the paddle to WEST MAIN HALL | Jules has verified this is the approved alternate; East Intake is reachable | Paddle changes to WEST. It cannot override a complete radio destination. It can resolve the active queue only when the paddle is the current authoritative cue; the recorded delay remains. |
| Relay the route shown on the display over R4 | Route not verified; Jules holds usable R4 | The stale EAST message transmits completely, replacing the current complete radio destination with EAST. It can direct arrivals toward the barrier and create a queue. Once the route is verified, this action is not legal unless a separate deliberate-misinformation action is explicitly designed. |
| Send the long verified closure instruction on R4 | Route verified; Jules holds usable R4; Jules has not learned the cutoff | Segment A is sent; Segment B’s destination is dropped. The latest complete radio destination is unchanged. Jules hears the double beep after transmission. |
| Send the short verified instruction on R4 | Destination is known; Jules holds usable R4 | The complete WEST MAIN HALL destination becomes the latest complete radio destination, replacing any earlier radio destination or superseding the paddle. The active queue can clear; the recorded delay remains. |
| Review and attach the Operations-thread warning to the open report | Jules has phone/thread access; first report remains open | Without an eligible intervention, Jules reads and attaches the existing message. If the intervention is active and this action resolves during its eligible beat, the attempt is intercepted; no source content is returned and no attachment occurs, though time advances. If the source is absent, no warning may be invented. |
| Ask Ren privately about R4’s reliability | After the double beep, Jules observed the missing destination and resulting hold; Ren is reachable before 18:24 | The proposed response rule is that Ren truthfully admits the prior Facilities warning, reusing the seeded facts. The event marks the private follow-up as raised, but does not attach the message or change R4. No trust consequence is defined; challenge whether this response is too convenient. |
| Return R4 directly to Ren | Jules holds R4 and can reach the operations desk in the beat | Direct handover is achieved if completed by 18:24. A later rack return does not meet the promise. |
| WAIT fallback | Neither proposed action is legal | No protagonist state changes, but time and scheduled events still advance. |
| Review and append an available Operations-thread item to the signed-record addendum | First note has been signed; proposed fourth beat is open; thread access is available | Search the available items. If a relevant existing source is found, append it with its actual timestamp. Do not invent missing evidence or rewrite the first signed note. The private-conversation window has passed. |

### Proposed priority hypotheses (not approved rules)

A few situations have provisional preferences, but there is no complete general protagonist priority policy:
- At the first beat, with the route unverified, asking the steward is proposed to outrank relaying the stale display.
- At the second beat, after route verification and before the 18:20 arrival, sending the long verified instruction is proposed to outrank reviewing/attaching the warning.
- In the third-beat state where the route is verified, there is no complete radio destination, the paddle remains on HOLD, the group is being held after a long instruction, and four minutes remain until sign-off, the current candidate ordering is: send a short verified instruction > set the paddle to WEST MAIN HALL > ask Ren privately > review/attach the warning > return R4.

These are hypotheses to test, not rules accepted by the owner. Do not extrapolate the last ordering to every other state. For any action pair where no priority is stated, record a rule gap instead of choosing the result by intuition. When both players submit the same legal action, it executes once. If both submitted actions are invalid, WAIT executes. The direct-action selector must not favor an action because of which player proposed it; role-swapping the same pair must preserve the result unless an explicitly stated rule says otherwise.

## 4. Resolution order and requested reconstructions

Every main beat covers four minutes. Resolve the selected action’s effects first, then process the scheduled 18:20 arrival if it is due, then process the 18:24 report sign-off and R4 handover checks if they are due. An attachment action that resolves at 18:24 is included before sign-off. A direct R4 handover completed at 18:24 counts as on time. The 18:24 personal deadline does not, by itself, establish an overall game-ending rule.

Please reconstruct each case below independently. Show the full action legality and resulting state; do not provide only the apparent winner of the exchange.

### Case A — Initial uncertainty

At 18:12: Jules is at the Main Hall junction; route is unverified; paddle is HOLD; there is no complete radio destination; R4 is held; the warning is unread.

1. Compare **Ask the steward** versus **Relay the stale display on R4**.
2. State what becomes known to Jules and what is merely observed by Mina.
3. Explain what each action would do to the route cue and any queue, without assuming an attendee has arrived before 18:20.

### Case B — Verified route before arrival

After the first action, assume Jules has verified the West Main Hall route. The warning remains unread; Jules holds R4; there is no complete radio destination; paddle remains HOLD. The next four attendees are due at 18:20.

1. Compare **Send the long verified instruction** versus **Review and attach the warning**.
2. Record the selected action under the stated priority hypothesis, then record what remains undefined or contestable about that priority.
3. Trace the 18:20 arrival using only the actual complete radio destination, paddle state, and Mina’s rule.

### Case C — Third beat after a long instruction

Assume the long instruction was transmitted during Case B. At 18:20, the destination was not delivered and Mina is holding the four attendees at East Intake. The queue/delay is recorded. Route is verified; latest complete radio destination is NONE; paddle is HOLD; warning is unread; R4 is held; first report is still open; Ren remains available until 18:24; private follow-up has not been raised.

Reconstruct these pairs, both in the stated orientation and with the players’ proposals swapped:
1. Review/attach the warning versus return R4.
2. Send the short instruction versus review/attach.
3. Ask Ren privately versus review/attach.
4. Send the short instruction versus return R4.
5. Set paddle to WEST MAIN HALL versus send the short instruction.
6. Both players propose review/attach.
7. Both players propose return R4.

For each, show whether the candidate priority decides the result, the route/queue state afterward, which personal-objective predicates are satisfied or missed at sign-off, and whether Fate’s candidate intervention is eligible, triggers, expires unused, or cannot be evaluated from current rules.

### Case D — Earlier destination and a truncated later message

Begin with a complete radio destination of EAST, then suppose a later long message is truncated and contains no destination; the paddle has meanwhile been set to WEST MAIN HALL. Reconstruct which cue Mina follows and why. Then send a complete short WEST MAIN HALL correction and reconstruct the cue again. Keep the recorded delay separate from the active queue.

### Case E — Knowledge makes an action illegal

Suppose Jules reads the Facilities warning before proposing the long verified two-part instruction. Is the long action legal? What alternative actions remain available in this state? If both competing proposals are invalid, state exactly what changes when WAIT resolves and what scheduled events still fire.

### Case F — Bounded Fate intervention

Start with the third-beat state from Case C, with the intervention activated and all listed eligibility conditions satisfied. Compare review/attach versus (a) asking Ren privately, (b) sending the short instruction, and (c) returning R4.

For each pair, establish whether the intervention actually intercepts an eligible selected action, whether it selects or changes Jules’s action, whether it returns source content, whether any evidence is attached, whether its one-beat effect expires, whether it earns progress, and what happens to the provisionally spent unit. Distinguish the visibility of the public generic signal from the private source content.

### Case G — After sign-off

At 18:24, the first report has been signed without the warning and R4 has not been returned directly. The proposed fourth beat is available.

1. Reconstruct a fresh “review and append an available Operations-thread item” action.
2. State what can be discovered and appended, what cannot be rewritten, and which first-note predicate cannot be retroactively satisfied.
3. Decide whether this is a real counterplay window or merely a label for an unimplemented future phase. List the additional terminal/phase rule needed to settle it.

### Case H — Evidence and attribution

For each of the following, say exactly what it proves and what it does not prove: Mina’s report; the dispatch log; the existing Operations thread; the fixed camera footage; the public wall display; the player’s private knowledge of a proposal; the resolver’s record of which action was selected.

Can the first-note evidence contract, as stated, establish that Jules operated R4 during the transmission? Can it establish that the warning was available to Jules before the transmission? Can it establish that all twelve volunteers believe Jules caused the closure? Give a source-chain explanation, not an intuition-based answer.

### Case I — Candidate routes and the target

Compare three different protagonist acts: relaying the stale display before verification; sending the long verified instruction after verification; and changing the physical paddle direction. For each, trace cause, contribution, cue, recorded consequence, evidence provenance, attribution, counterplay, and dependence on Fate. Decide whether these are materially distinct routes to the same stated Fate target, routes to a different target, conditional routes, or a premise/target mismatch. A shared queue consequence does not automatically mean distinct causal routes. Do not invent a witness, log, source, public belief, or camera-retrieval action to rescue a route.

## 5. Reviewer worksheet and exit criteria

Please return:
- A completed transition table for Cases A–G with starting state, legal proposals, selected action, rule/priority citation, state/evidence/knowledge deltas, time, queue, objective progress, visibility, and Fate eligibility.
- An evidence-provenance table for Case H: source, timestamp/content available, operator identity established or not, character who knows it, player view allowed, and legal action needed to retrieve/attach it.
- Independent classifications and supporting reasons for each route in Case I.
- At least one counterfactual that defeats each route, plus the non-Fate outcome that remains when no Fate intervention is activated.
- A list of all rule gaps, contradictions, unsupported assumptions, priority concerns, and undefined terminal/phase conditions. Include negative findings; do not assume the design needs to pass.

The reconstruction passes only if the reviewer can derive each claimed outcome from explicit facts, legality and resolution rules without author explanation; role swaps preserve action selection; Jules acts only on acquired knowledge; the report and narration claim no more than the evidence supports; the Fate intervention is bounded and counterable; and any claimed route is supported by an evidence chain and a distinct causal mechanism. The broader scenario gate still requires a credible objective conflict, at least three materially distinct viable routes to an explicitly chosen target, meaningful counterplay, and a credible non-Fate ending. Passing this packet alone does not approve scenario canon, production rules, or the full game.
