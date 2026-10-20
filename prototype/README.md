# FATE/CTRL — story-first prototype

This is a bounded, browser-playable experiment for learning whether private player decisions, observable consequences, and a short deterministic story can make the core loop more understandable and engaging. It still uses the test fixture in the repository and is **not the finished game or accepted story canon**.

## Run locally

From the repository root, start a static file server with Python:

    python -m http.server 8000

Open http://localhost:8000/prototype/ in a browser. Do not open the HTML file directly from the file system; the prototype fetches the shared JSON fixture over HTTP.

## How a run works

1. Player A reads the shared scene and their private aim, chooses a move, and locks it.
2. The choice controls are removed from the visible page before the device is handed to Player B.
3. Player B reads the same public scene and their own private aim, then locks a move.
4. The rules resolve one protagonist action. The app presents a deterministic story beat based on that resolved event and resulting state.
5. A small group of meters shows the tracked state after the action. These are condition-completion indicators, not odds of success.
6. Continue for up to three moments. Earlier story beats can be reviewed in the collapsed story history.

The normal player interface never prints either raw submission and contains no ranking inspector that could expose how private inputs affected selection. Technical ranking details remain available in automated tests, not in the gameplay interface. This is a usability boundary only: pass-and-play on one browser is not secure against someone inspecting application memory or source.

## What the experience is testing

- Whether story-first consequences communicate what happened better than an objective-only report.
- Whether the three state indicators make changes legible without taking attention away from the story.
- Whether private choices plus public actions leave room to infer the other player's intentions.
- Whether the two provisional control models feel meaningfully different when presented in clear language.

Neither model has been selected. The fixture's actions, trust response, story, objectives, and deterministic policy remain experimental. This version still excludes Fate, the citywide-emergency ending, online multiplayer, accounts, persistence, and generated narration. Its authored story is a presentation of resolved rules events; it never decides state.

## Tests

Requires Node.js 20 or later; no third-party packages are needed.

Run all prototype tests from the repository root:

    node --test prototype/tests/*.test.mjs

Tests cover rule behavior, narrative branching, meter calculations, and the requirement that player submissions are not serialized into player-facing story text. Automated checks do not establish that the story is fun, fair, visually polished in every browser, or secure for online multiplayer.
