import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createInitialState, resolveRound, MODEL_DIRECT, MODEL_INFLUENCE, PASS } from '../rules.mjs';
import { openingStory, storyForResolution, worldMeters, momentLabel } from '../story.mjs';

const fixtureUrl = new URL('../../scenarios/control_model_test_fixture.json', import.meta.url);
const fixture = JSON.parse(await readFile(fileURLToPath(fixtureUrl), 'utf8'));
const appSource = await readFile(new URL('../app.js', import.meta.url), 'utf8');
const htmlSource = await readFile(new URL('../index.html', import.meta.url), 'utf8');

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


test('every canonical protagonist action has a narrative beat', () => {
  const opening = createInitialState(fixture);
  const inspect = resolveRound(opening, MODEL_DIRECT, ['INSPECT_SHARED_THREAD', 'INSPECT_SHARED_THREAD'], fixture).record;
  const honestReturn = resolveRound(opening, MODEL_DIRECT, ['RETURN_HONESTLY', PASS], fixture).record;
  const afterInspection = { ...opening, round_no: 2, remaining: 2, inspected: true };
  const present = resolveRound(afterInspection, MODEL_DIRECT, ['PRESENT_EVIDENCE', 'PRESENT_EVIDENCE'], fixture).record;
  const afterReturnAndInspection = { ...afterInspection, returned: true, acknowledged_damage: true };
  const wait = resolveRound(afterReturnAndInspection, MODEL_DIRECT, [PASS, PASS], fixture).record;

  for (const record of [inspect, honestReturn, present, wait]) {
    assert.ok(['INSPECT_SHARED_THREAD', 'RETURN_HONESTLY', 'PRESENT_EVIDENCE', 'WAIT'].includes(record.selected));
    const beat = storyForResolution(record);
    assert.equal(typeof beat.title, 'string');
    assert.ok(beat.title.length > 0);
    assert.ok(beat.paragraphs.length >= 2);
  }
  assert.equal(inspect.selected, 'INSPECT_SHARED_THREAD');
  assert.equal(honestReturn.selected, 'RETURN_HONESTLY');
  assert.equal(present.selected, 'PRESENT_EVIDENCE');
  assert.equal(wait.selected, 'WAIT');
});

test('story explicitly reflects the trust consequence of a public early reveal', () => {
  const afterInspection = { ...createInitialState(fixture), round_no: 2, remaining: 2, inspected: true };
  const record = resolveRound(afterInspection, MODEL_INFLUENCE, ['EVIDENCE_UP', PASS], fixture).record;
  const prose = storyForResolution(record).paragraphs.join(' ');
  assert.equal(record.after.trust, 0);
  assert.match(prose, /damaged trust|willingness.*damaged/i);
});


test('player-facing UI does not expose input-derived ranking diagnostics', () => {
  assert.equal(appSource.includes('record.inputs'), false);
  assert.equal(appSource.includes('record.rankFields'), false);
  assert.equal(appSource.includes('record.rankedActions'), false);
  assert.equal(htmlSource.includes('ranked-actions'), false);
  assert.equal(htmlSource.includes('Optional rules inspector'), false);
});


test('timeline label distinguishes a decision moment from its resolved aftermath', () => {
  assert.equal(momentLabel('A', createInitialState(fixture), 3), 'MOMENT 1 OF 3');

  const first = resolveRound(createInitialState(fixture), MODEL_DIRECT, ['INSPECT_SHARED_THREAD', PASS], fixture);
  assert.equal(momentLabel('result', first.state, 3, first.record), 'AFTER MOMENT 1 OF 3');
  assert.equal(momentLabel('A', first.state, 3), 'MOMENT 2 OF 3');

  let state = first.state;
  const second = resolveRound(state, MODEL_DIRECT, ['RETURN_HONESTLY', PASS], fixture);
  assert.equal(momentLabel('result', second.state, 3, second.record), 'AFTER MOMENT 2 OF 3');

  const afterFinal = { ...second.state, round_no: 4, remaining: 0 };
  assert.equal(momentLabel('result', afterFinal, 3, { round: 3 }), 'AFTER THE FINAL MOMENT');
});
