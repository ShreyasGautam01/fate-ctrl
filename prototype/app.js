import { createInitialState, resolveRound, submissionOptions, MODEL_DIRECT, MODEL_INFLUENCE, PASS } from './rules.mjs';

const $ = id => document.getElementById(id);
const actionCopy = {
  PASS: { title: 'Pass', description: 'Do not add a targeted move this round.' },
  INSPECT_SHARED_THREAD: { title: 'Inspect the shared thread', description: 'Propose that Jules checks the photo and message on the phone.' },
  PRESENT_EVIDENCE: { title: 'Present the evidence', description: 'Propose that Jules shows the inspected message to the flatmate.' },
  RETURN_HONESTLY: { title: 'Return the umbrella honestly', description: 'Propose that Jules returns it and acknowledges making the tear worse.' },
  THREAD_UP: { title: 'Raise the thread’s salience', description: 'Make inspecting the thread more likely to win Jules’s decision this round.' },
  THREAD_DOWN: { title: 'Lower the thread’s salience', description: 'Make inspecting the thread less likely to win Jules’s decision this round.' },
  EVIDENCE_UP: { title: 'Raise evidence-presentation salience', description: 'Make presenting inspected evidence more likely to win this round.' },
  EVIDENCE_DOWN: { title: 'Lower evidence-presentation salience', description: 'Make presenting inspected evidence less likely to win this round.' },
  OPEN_PRIVATE_WINDOW: { title: 'Open a private-conversation window', description: 'Create a private opportunity that can preserve trust if evidence is presented now.' }
};
const objectiveCopy = {
  A: { title: 'Player A objective', description: 'Get Jules to return the umbrella honestly while preserving trust.' },
  B: { title: 'Player B objective', description: 'Use evidence to establish that the flatmate knew about the loose rib before the loan.' }
};
const fieldCopy = {
  contextSignal: 'Environmental signal', directSupport: 'Direct proposal support', actionTier: 'Action priority',
  deadlineTier: 'Deadline priority', tieBreakRank: 'Character tie-break'
};
let fixture, model = MODEL_DIRECT, state, phase = 'A', playerAInput = null, playerBInput = null, history = [], lastRecord = null, toastTimer;

async function boot() {
  try {
    const response = await fetch('../scenarios/control_model_test_fixture.json');
    if (!response.ok) throw new Error('Rules fixture request failed (' + response.status + ').');
    fixture = await response.json();
    $('fixture-status').textContent = 'Rules loaded';
    $('fixture-id').textContent = fixture.fixtureId;
    $('model-select').value = model;
    resetSession(false);
    $('model-select').addEventListener('change', updateModelDescription);
    $('restart-button').addEventListener('click', () => { model = $('model-select').value; resetSession(true); });
    $('submission-form').addEventListener('submit', lockCurrentChoice);
    $('handoff-button').addEventListener('click', () => { phase = 'B'; render(); });
    $('next-button').addEventListener('click', () => { phase = 'A'; playerAInput = null; playerBInput = null; lastRecord = null; render(); });
    $('play-again-button').addEventListener('click', () => resetSession(true));
    updateModelDescription();
  } catch (error) {
    $('fixture-status').textContent = 'Rules failed to load';
    $('turn-heading').textContent = 'Could not load the game rules';
    $('turn-instructions').textContent = error.message + ' Start a local web server from the repository root (see prototype/README.md), then open the prototype URL.';
  }
}
function resetSession(showToast) {
  state = createInitialState(fixture); phase = 'A'; playerAInput = null; playerBInput = null; history = []; lastRecord = null;
  render(); updateModelDescription();
  if (showToast) toast('A new three-round test has started.');
}
function updateModelDescription() {
  const selected = $('model-select').value;
  $('model-description').textContent = selected === MODEL_DIRECT
    ? 'Each player nominates an action Jules could take. Nominations add support; they do not command Jules.'
    : 'Each player changes a temporary signal around an action or opens a private window. Jules still chooses using the same ranking policy.';
}
function lockCurrentChoice(event) {
  event.preventDefault();
  const selected = document.querySelector('input[name="player-choice"]:checked');
  if (!selected) { toast('Choose an option first.'); return; }
  if (phase === 'A') {
    playerAInput = selected.value; phase = 'handoff'; render();
  } else if (phase === 'B') {
    playerBInput = selected.value;
    const result = resolveRound(state, model, [playerAInput, playerBInput], fixture);
    state = result.state; lastRecord = result.record; history.push(result.record); phase = 'result'; render();
  }
}
function render() {
  $('round-number').textContent = String(phase === 'result' && lastRecord ? lastRecord.round : Math.min(state.round_no, fixture.rounds));
  $('deadline-copy').textContent = state.remaining === 0 ? 'The flatmate has left. This test session is complete.'
    : state.remaining === 1 ? 'This is the final action boundary. The flatmate leaves after this action.'
    : state.remaining + ' action boundaries remain before the flatmate leaves.';
  renderFacts(); renderHistory();
  $('turn-panel').classList.toggle('hidden', !['A', 'B'].includes(phase));
  $('handoff-panel').classList.toggle('hidden', phase !== 'handoff');
  $('result-panel').classList.toggle('hidden', phase !== 'result');
  if (phase === 'A' || phase === 'B') renderSubmission(phase);
  if (phase === 'handoff') {
    $('handoff-heading').textContent = 'Pass the device to Player B';
    $('handoff-copy').textContent = 'Player A’s selection is locked and hidden. Player B should now make a choice without viewing Player A’s submission.';
  }
  if (phase === 'result') renderResult();
}
function renderFacts() {
  const facts = [
    ['Umbrella returned', state.returned ? 'Yes' : 'Not yet'],
    ['Jules acknowledged damage', state.acknowledged_damage ? 'Yes' : 'Not yet'],
    ['Phone thread inspected', state.inspected ? 'Yes' : 'No'],
    ['Evidence presented', state.presented ? 'Yes' : 'No'],
    ['Prior knowledge acknowledged', state.prior_knowledge_acknowledged ? 'Yes' : 'Not yet'],
    ['Relationship trust', state.trust > 0 ? 'Preserved for now' : 'Damaged']
  ];
  $('state-facts').replaceChildren(...facts.map(([label, value]) => {
    const card = document.createElement('div'); card.className = 'fact';
    const name = document.createElement('span'); name.textContent = label;
    const val = document.createElement('strong'); val.textContent = value;
    card.append(name, val); return card;
  }));
}
function renderSubmission(player) {
  const objective = objectiveCopy[player];
  $('turn-eyebrow').textContent = 'PLAYER ' + player + ' · PRIVATE CHOICE';
  $('turn-heading').textContent = player === 'A' ? 'What should Jules do?' : 'How will you influence Jules?';
  $('turn-instructions').textContent = player === 'A'
    ? 'Choose one move and lock it. Player B will not see your selection before making theirs.'
    : 'Choose one move and lock it. Player A’s selection stays hidden until the round resolves.';
  $('objective-card').replaceChildren();
  const strong = document.createElement('strong'); strong.textContent = objective.title;
  const p = document.createElement('p'); p.textContent = objective.description;
  $('objective-card').append(strong, p);
  const options = submissionOptions(state, model, fixture), fieldset = $('submission-options');
  fieldset.replaceChildren();
  const legend = document.createElement('legend'); legend.className = 'field-label'; legend.textContent = 'Choose one move'; fieldset.append(legend);
  for (const id of options) {
    const label = document.createElement('label'); label.className = 'choice';
    const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'player-choice'; radio.value = id; radio.required = true;
    const content = document.createElement('span');
    const title = document.createElement('strong'); title.textContent = (actionCopy[id] || {}).title || id;
    const description = document.createElement('small'); description.textContent = (actionCopy[id] || {}).description || 'Apply this test-fixture input.';
    content.append(title, description); label.append(radio, content); fieldset.append(label);
  }
  $('lock-button').textContent = player === 'A' ? 'Lock Player A’s choice' : 'Lock Player B’s choice and resolve';
  $('lock-button').disabled = false;
}
function renderResult() {
  const record = lastRecord;
  $('result-heading').textContent = (actionCopy[record.selected] || {}).title || record.selected;
  $('result-summary').textContent = resultSentence(record);
  $('decisive-rule').textContent = fieldCopy[record.decisiveField] || 'Only legal action / tie';
  $('trust-result').textContent = record.after.trust > 0 ? 'Preserved' : 'Damaged';
  const ranked = $('ranked-actions'); ranked.replaceChildren();
  for (const id of record.rankedActions) {
    const li = document.createElement('li'), fields = record.rankFields[id];
    li.textContent = ((actionCopy[id] || {}).title || id) + ' — ' + fields.tuple.join(' / ') + (id === record.selected ? ' · SELECTED' : '');
    ranked.append(li);
  }
  $('input-reveal').textContent = 'Player A chose: ' + ((actionCopy[record.inputs[0]] || {}).title || record.inputs[0]) + '. Player B chose: ' + ((actionCopy[record.inputs[1]] || {}).title || record.inputs[1]) + '.';
  const results = $('objective-results'); results.replaceChildren(); results.classList.toggle('hidden', !record.departed);
  if (record.departed) {
    for (const key of ['A', 'B']) {
      const item = document.createElement('div'); item.className = 'objective-result ' + (record.objectives[key] ? 'complete' : 'incomplete');
      const title = document.createElement('strong'); title.textContent = objectiveCopy[key].title + ': ' + (record.objectives[key] ? 'COMPLETE' : 'NOT COMPLETE');
      const desc = document.createElement('span'); desc.textContent = objectiveCopy[key].description;
      item.append(title, desc); results.append(item);
    }
    $('next-button').classList.add('hidden'); $('play-again-button').classList.remove('hidden'); $('play-again-button').textContent = 'Play this model again';
  } else {
    $('next-button').classList.remove('hidden'); $('next-button').textContent = 'Continue to round ' + state.round_no; $('play-again-button').classList.add('hidden');
  }
}
function resultSentence(record) {
  const selected = (actionCopy[record.selected] || {}).title || record.selected;
  const why = fieldCopy[record.decisiveField] || 'the available legal choices';
  const eventCopy = {
    EvidenceInspected: 'Jules inspected the thread.',
    JulesLearnedPhotoAndSeededMessage: 'Jules learned what the photo and message said.',
    EvidencePresented: 'Jules presented the evidence.',
    PriorKnowledgeAcknowledged: 'The flatmate acknowledged prior knowledge.',
    HonestReturn: 'Jules returned the umbrella.',
    OwnDamageAcknowledged: 'Jules acknowledged making the tear worse.',
    TrustSetTo0: 'Trust fell.', TrustSetTo1: 'Trust was preserved.',
    Waited: 'Jules waited.', FlatmateDeparted: 'The flatmate left.'
  };
  const events = record.events.map(event => eventCopy[event] || '').filter(Boolean);
  return 'Jules selected “' + selected + '”. The decisive ranking factor was ' + why.toLowerCase() + '. ' + events.join(' ');
}
function renderHistory() {
  const list = $('history-list'); list.replaceChildren();
  $('history-count').textContent = history.length + (history.length === 1 ? ' round' : ' rounds');
  if (!history.length) {
    const li = document.createElement('li'); li.className = 'empty-history'; li.textContent = 'No actions resolved yet.'; list.append(li); return;
  }
  for (const record of [...history].reverse()) {
    const li = document.createElement('li'), strong = document.createElement('strong'), p = document.createElement('p');
    strong.textContent = 'Round ' + record.round + ': ' + ((actionCopy[record.selected] || {}).title || record.selected);
    p.textContent = 'Decisive factor: ' + (fieldCopy[record.decisiveField] || 'only legal option') + '. Trust: ' + (record.after.trust > 0 ? 'preserved' : 'damaged') + '.';
    li.append(strong, p); list.append(li);
  }
}
function toast(message) {
  const node = $('toast'); node.textContent = message; node.classList.remove('hidden');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.add('hidden'), 2400);
}
boot();
