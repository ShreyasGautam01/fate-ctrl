import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createInitialState, resolveRound, submissionOptions, MODEL_DIRECT, MODEL_INFLUENCE, PASS } from '../rules.mjs';

const fixturePath = new URL('../../scenarios/control_model_test_fixture.json', import.meta.url);
const fixture = JSON.parse(await readFile(fileURLToPath(fixturePath), 'utf8'));

test('both modes expose only valid opening submissions', () => {
  const state = createInitialState(fixture);
  assert.deepEqual(submissionOptions(state, MODEL_DIRECT, fixture), [PASS, 'INSPECT_SHARED_THREAD', 'RETURN_HONESTLY']);
  assert.deepEqual(submissionOptions(state, MODEL_INFLUENCE, fixture), [PASS, 'THREAD_UP', 'THREAD_DOWN']);
});
test('direct proposals can change Jules’s opening choice', () => {
  const state = createInitialState(fixture);
  assert.equal(resolveRound(state, MODEL_DIRECT, [PASS, 'INSPECT_SHARED_THREAD'], fixture).record.selected, 'INSPECT_SHARED_THREAD');
  assert.equal(resolveRound(state, MODEL_DIRECT, ['RETURN_HONESTLY', 'INSPECT_SHARED_THREAD'], fixture).record.selected, 'RETURN_HONESTLY');
});
test('environmental influence can change the default opening choice', () => {
  const state = createInitialState(fixture);
  assert.equal(resolveRound(state, MODEL_INFLUENCE, [PASS, PASS], fixture).record.selected, 'RETURN_HONESTLY');
  assert.equal(resolveRound(state, MODEL_INFLUENCE, ['THREAD_UP', PASS], fixture).record.selected, 'INSPECT_SHARED_THREAD');
});
test('opposing influence signals cancel', () => {
  const result = resolveRound(createInitialState(fixture), MODEL_INFLUENCE, ['THREAD_UP', 'THREAD_DOWN'], fixture);
  assert.equal(result.record.context.INSPECT_SHARED_THREAD, 0);
});
test('private window can preserve trust when evidence is presented early', () => {
  const state = { ...createInitialState(fixture), round_no: 2, remaining: 2, inspected: true };
  const publicResult = resolveRound(state, MODEL_INFLUENCE, ['EVIDENCE_UP', PASS], fixture);
  const privateResult = resolveRound(state, MODEL_INFLUENCE, ['OPEN_PRIVATE_WINDOW', PASS], fixture);
  assert.equal(publicResult.record.selected, 'PRESENT_EVIDENCE');
  assert.equal(publicResult.state.trust, 0);
  assert.equal(privateResult.record.selected, 'PRESENT_EVIDENCE');
  assert.equal(privateResult.state.trust, 1);
  assert.equal(privateResult.record.privateWindow, true);
});
test('selected actions are legal and replay is deterministic', () => {
  for (const model of [MODEL_DIRECT, MODEL_INFLUENCE]) {
    const state = createInitialState(fixture);
    const a = resolveRound(state, model, [PASS, PASS], fixture), b = resolveRound(state, model, [PASS, PASS], fixture);
    assert.ok(a.record.legalActions.includes(a.record.selected));
    assert.deepEqual(a, b);
  }
});
test('rejects illegal submissions and post-departure turns', () => {
  const state = createInitialState(fixture);
  assert.throws(() => resolveRound(state, MODEL_DIRECT, ['PRESENT_EVIDENCE', PASS], fixture));
  assert.throws(() => resolveRound(state, MODEL_INFLUENCE, ['EVIDENCE_UP', PASS], fixture));
  assert.throws(() => resolveRound({ ...state, remaining: 0 }, MODEL_DIRECT, [PASS, PASS], fixture));
});
test('terminal objective outcomes require three resolved boundaries', () => {
  let state = createInitialState(fixture);
  state = resolveRound(state, MODEL_DIRECT, ['INSPECT_SHARED_THREAD', 'INSPECT_SHARED_THREAD'], fixture).state;
  state = resolveRound(state, MODEL_DIRECT, ['RETURN_HONESTLY', 'RETURN_HONESTLY'], fixture).state;
  const final = resolveRound(state, MODEL_DIRECT, ['PRESENT_EVIDENCE', 'PRESENT_EVIDENCE'], fixture);
  assert.equal(final.record.departed, true);
  assert.equal(final.record.objectives.A, true);
  assert.equal(final.record.objectives.B, true);
});
