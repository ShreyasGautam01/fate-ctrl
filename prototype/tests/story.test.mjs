import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createInitialState, resolveRound, MODEL_DIRECT, MODEL_INFLUENCE, PASS } from '../rules.mjs';
import { openingStory, storyForResolution, worldMeters } from '../story.mjs';

const fixtureUrl = new URL('../../scenarios/control_model_test_fixture.json', import.meta.url);
const fixture = JSON.parse(await readFile(fileURLToPath(fixtureUrl), 'utf8'));

test('opening establishes a human situation rather than a rules summary', () => {
  const beat = openingStory();
  assert.match(beat.title, /goodbye/i);
  assert.ok(beat.paragraphs.length >= 2);
  assert.match(beat.paragraphs.join(' '), /umbrella/i);
  assert.match(beat.paragraphs.join(' '), /three moments/i);
});

test('inspecting the thread produces story based on the resolved event', () => {
  const state = createInitialState(fixture);
  const record = resolveRound(state, MODEL_DIRECT, ['INSPECT_SHARED_THREAD', 'INSPECT_SHARED_THREAD'], fixture).record;
  const beat = storyForResolution(record);
  assert.match(beat.title, /message/i);
  assert.match(beat.paragraphs.join(' '), /dated photo/i);
  assert.match(beat.paragraphs.join(' '), /haven’t told them/i);
});

test('story presentation never discloses raw player submissions or ranking diagnostics', () => {
  const state = createInitialState(fixture);
  const record = resolveRound(state, MODEL_DIRECT, ['INSPECT_SHARED_THREAD', 'INSPECT_SHARED_THREAD'], fixture).record;
  const renderedStory = JSON.stringify(storyForResolution(record));
  assert.equal(renderedStory.includes('INSPECT_SHARED_THREAD'), false);
  assert.equal(renderedStory.includes('inputs'), false);
  assert.equal(renderedStory.includes('rankedActions'), false);
  assert.equal(renderedStory.includes('Player A chose'), false);
  assert.equal(renderedStory.includes('Player B chose'), false);
});

test('same action can produce different story when the public context differs', () => {
  const state = { ...createInitialState(fixture), round_no: 2, remaining: 2, inspected: true };
  const ordinary = resolveRound(state, MODEL_INFLUENCE, ['EVIDENCE_UP', PASS], fixture).record;
  const privateMoment = resolveRound(state, MODEL_INFLUENCE, ['OPEN_PRIVATE_WINDOW', PASS], fixture).record;
  assert.notEqual(storyForResolution(ordinary).title, storyForResolution(privateMoment).title);
  assert.match(storyForResolution(privateMoment).paragraphs.join(' '), /alone/i);
});

test('meters reflect tracked state, not outcome probabilities', () => {
  const start = worldMeters(createInitialState(fixture));
  assert.deepEqual(start.map(meter => meter.percent), [0, 0, 100]);

  const inspectedState = { ...createInitialState(fixture), inspected: true };
  assert.deepEqual(worldMeters(inspectedState).map(meter => meter.percent), [0, 50, 100]);

  const completeState = { ...inspectedState, returned: true, acknowledged_damage: true, presented: true, prior_knowledge_acknowledged: true };
  assert.deepEqual(worldMeters(completeState).map(meter => meter.percent), [100, 100, 100]);

  const damagedTrust = { ...completeState, trust: 0 };
  assert.equal(worldMeters(damagedTrust)[2].percent, 0);
});
