# FATE/CTRL Control Model Lab (experimental prototype)

This is a browser-playable experiment comparing the two control-model candidates in `../scenarios/control_model_test_fixture.json`. It is **not** the finished game or accepted story canon. It excludes Fate, online multiplayer, accounts, persistence, and generated narration.

## Run it

From the repository root, start a static file server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/prototype/` in a browser. Do not open `index.html` directly from the file system: the browser must fetch the shared JSON fixture over HTTP.

## Play

1. Select **Direct intention** or **Environmental influence**, then click **Start new test**.
2. Player A chooses and locks a move.
3. Pass the device to Player B; the interface hides Player A’s selection until both choices are locked.
4. Read Jules’s selected action and the ranking explanation.
5. Play all three rounds, then compare objectives. Restart under the other model to compare the experience.

The pass-and-play handoff is a usability aid, not strong security: someone can still inspect browser memory or code. Do not use it for sensitive hidden information. Objective, trust, and evidence assumptions are test-only. No Fate action or citywide-emergency route is implemented.

## Tests

Requires Node.js 20 or later; no third-party packages are needed:

```bash
node --test prototype/tests/rules.test.mjs
```
