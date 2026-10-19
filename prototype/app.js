import { createInitialState, resolveRound, submissionOptions, MODEL_DIRECT, MODEL_INFLUENCE, PASS } from './rules.mjs';
import { openingStory, storyForResolution, worldMeters } from './story.mjs';

const $ = id => document.getElementById(id);

const objectiveCopy = {
  A: {
    title: 'Keep the return honest without losing trust',
    description: 'Get Jules to return the umbrella and acknowledge the tear they made worse, while keeping the relationship intact.'
  },
  B: {
    title: 'Bring the earlier nondisclosure to light',
    description: 'Use the existing message to establish that the flatmate knew about the loose rib before the loan. Do not erase Jules’s responsibility for the later tear.'
  }
};
const directChoiceCopy = {
  PASS: { title: 'Hold back for now', description: 'Add no specific proposal this moment. Jules may still act under the situation and the rules.' },
  INSPECT_SHARED_THREAD: { title: 'Inspect the phone thread', description: 'You want Jules to look for what was known about the umbrella before the loan.' },
  RETURN_HONESTLY: { title: 'Return the umbrella and acknowledge the tear', description: 'You want Jules to own the damage they made worse. This may settle their responsibility without resolving what the flatmate knew.' },
  PRESENT_EVIDENCE: { title: 'Show the message to the flatmate', description: 'You want Jules to use the message already found in the thread. The timing and circumstances may affect trust.' }
};
const influenceChoiceCopy = {
  PASS: { title: 'Leave the situation alone', description: 'Apply no targeted pressure this moment.' },
  THREAD_UP: { title: 'Bring the phone thread to Jules’s attention', description: 'Make opening the thread feel more important right now.' },
  THREAD_DOWN: { title: 'Let the phone thread fade into the background', description: 'Make opening it feel easier to put off for now.' },
  EVIDENCE_UP: { title: 'Make the inspected message hard to ignore', description: 'Once the thread is inspected, make showing it feel more pressing.' },
  EVIDENCE_DOWN: { title: 'Make raising the message feel premature', description: 'Reduce the pull to raise the evidence right now.' },
  OPEN_PRIVATE_WINDOW: { title: 'Create a private moment to talk', description: 'Give Jules a chance to raise the message away from an audience. In this test, that can protect trust.' }
};

let fixture;
let model = MODEL_DIRECT;
let state;
let phase = 'A';
let playerAInput = null;
let playerBInput = null;
let storyTrail = [];
let lastRecord = null;
let toastTimer;

async function boot() {
  try {
    const response = await fetch('../scenarios/control_model_test_fixture.json');
    if (!response.ok) throw new Error('The scenario rules could not be loaded (' + response.status + ').');
    fixture = await response.json();
    $('fixture-status').textContent = 'Loaded';
    $('fixture-id').textContent = fixture.fixtureId;
    $('model-select').value = model;

    $('model-select').addEventListener('change', updateModelDescription);
    $('restart-button').addEventListener('click', () => {
      model = $('model-select').value;
      resetSession(true);
    });
    $('submission-form').addEventListener('submit', lockCurrentChoice);
    $('handoff-button').addEventListener('click', () => {
      phase = 'B';
      render();
    });
    $('next-button').addEventListener('click', () => {
      phase = 'A';
      playerAInput = null;
      playerBInput = null;
      lastRecord = null;
      render();
    });
    $('play-again-button').addEventListener('click', () => {
      model = $('model-select').value;
      resetSession(true);
    });
    updateModelDescription();
    resetSession(false);
  } catch (error) {
    $('fixture-status').textContent = 'Unavailable';
    $('turn-heading').textContent = 'The story could not start';
    $('turn-instructions').textContent = error.message + ' Start a local web server from the repository root, then open /prototype/.';
  }
}

function resetSession(showToast) {
  state = createInitialState(fixture);
  phase = 'A';
  playerAInput = null;
  playerBInput = null;
  storyTrail = [openingStory()];
  lastRecord = null;
  render();
  updateModelDescription();
  if (showToast) toast('A new story run has started.');
}

function updateModelDescription() {
  const selected = $('model-select').value;
  $('model-description').textContent = selected === MODEL_DIRECT
    ? 'Choose the action you want Jules to take. The other player also chooses privately; then the rules decide which action Jules actually takes. You must reason about the possible consequences.'
    : 'Each player privately nudges the context around Jules. Compatible signals can reinforce one another; opposing signals can cancel.';
}

function lockCurrentChoice(event) {
  event.preventDefault();
  const selected = document.querySelector('input[name="player-choice"]:checked');
  if (!selected) {
    toast('Choose a move before locking it.');
    return;
  }

  if (phase === 'A') {
    playerAInput = selected.value;
    phase = 'handoff';
    render();
    return;
  }

  if (phase === 'B') {
    playerBInput = selected.value;
    const result = resolveRound(state, model, [playerAInput, playerBInput], fixture);
    state = result.state;
    lastRecord = result.record;
    storyTrail.push(storyForResolution(result.record));
    phase = 'result';
    render();
  }
}

function render() {
  const moment = Math.min(state.round_no, fixture.rounds);
  $('moment-label').textContent = state.remaining === 0
    ? 'AFTER THE FINAL MOMENT'
    : 'MOMENT ' + moment + ' OF ' + fixture.rounds;
  $('deadline-copy').textContent = state.remaining === 0
    ? 'The flatmate has left. This run has reached its ending.'
    : state.remaining === 1
      ? 'One moment remains before the flatmate leaves.'
      : state.remaining + ' moments remain before the flatmate leaves.';

  renderStory();
  renderMeters(state, phase === 'result' && lastRecord ? lastRecord.before : null);

  $('turn-panel').classList.toggle('hidden', phase !== 'A' && phase !== 'B');
  $('handoff-panel').classList.toggle('hidden', phase !== 'handoff');
  $('resolution-panel').classList.toggle('hidden', phase !== 'result');

  if (phase === 'A' || phase === 'B') renderSubmission(phase);
  else {
    // Remove locked controls from the visible document during handoff/results.
    // The private values remain only in the in-memory round coordinator.
    $('submission-options').replaceChildren();
    $('objective-card').replaceChildren();
  }

  if (phase === 'handoff') {
    $('handoff-heading').textContent = 'Pass the device to Player B';
    $('handoff-copy').textContent = 'Player A’s choice is locked. Player B should read the current scene and their own objective, without looking at Player A’s selection.';
  }
  if (phase === 'result') renderResolution();
}

function renderStory() {
  const current = storyTrail[storyTrail.length - 1];
  $('story-heading').textContent = current.title;
  $('story-copy').replaceChildren(...current.paragraphs.map(text => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
  }));
  $('story-kicker').textContent = storyTrail.length === 1
    ? 'THE KITCHEN · BEFORE THE FIRST MOVE'
    : state.remaining === 0
      ? 'THE DOOR CLOSES'
      : 'AFTER MOMENT ' + (state.round_no - 1);

  const archive = $('story-archive-content');
  archive.replaceChildren();
  for (const beat of storyTrail.slice(0, -1)) {
    const entry = document.createElement('article');
    entry.className = 'archive-entry';
    const heading = document.createElement('h3');
    heading.textContent = beat.title;
    entry.append(heading);
    for (const text of beat.paragraphs) {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      entry.append(paragraph);
    }
    archive.append(entry);
  }
  $('story-history').classList.toggle('hidden', storyTrail.length < 2);
}

function renderMeters(currentState, previousState) {
  const current = worldMeters(currentState);
  const previous = previousState ? Object.fromEntries(worldMeters(previousState).map(meter => [meter.id, meter])) : {};
  const root = $('state-meters');
  root.replaceChildren();

  for (const meter of current) {
    const card = document.createElement('article');
    card.className = 'meter';
    const header = document.createElement('div');
    header.className = 'meter-heading';
    const label = document.createElement('span');
    label.className = 'meter-label';
    label.textContent = meter.label;
    const value = document.createElement('strong');
    value.className = 'meter-value';
    value.textContent = meter.percent + '%';
    header.append(label, value);

    const track = document.createElement('div');
    track.className = 'meter-track';
    track.setAttribute('role', 'progressbar');
    track.setAttribute('aria-label', meter.label);
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', '100');
    track.setAttribute('aria-valuenow', String(meter.percent));
    const fill = document.createElement('div');
    fill.className = 'meter-fill';
    fill.style.width = meter.percent + '%';
    track.append(fill);

    const footer = document.createElement('div');
    footer.className = 'meter-footer';
    const detail = document.createElement('p');
    detail.textContent = meter.detail;
    footer.append(detail);
    if (previous[meter.id] && previous[meter.id].percent !== meter.percent) {
      const change = document.createElement('span');
      change.className = 'meter-change';
      const difference = meter.percent - previous[meter.id].percent;
      change.textContent = (difference > 0 ? '+' : '−') + Math.abs(difference) + ' points this moment';
      footer.append(change);
    }
    card.append(header, track, footer);
    root.append(card);
  }
}

function renderSubmission(player) {
  const objective = objectiveCopy[player];
  $('turn-eyebrow').textContent = 'PLAYER ' + player + ' · PRIVATE TURN';
  $('turn-heading').textContent = model === MODEL_DIRECT ? 'What do you want Jules to do?' : 'How will you steer the situation?';

  const turnPrivacy = player === 'A'
    ? 'Choose the action you want Jules to take, then lock it. Player B will choose privately too, and Jules may not do exactly what you proposed.'
    : 'Use the shared scene and your own aim to choose the action you want Jules to take. Player A’s locked selection stays hidden.';
  const modelExplanation = model === MODEL_DIRECT
    ? ' This is an intention, not a guarantee: Jules will choose one legal action after both moves are locked.'
    : ' Your move changes what feels important to Jules; it does not choose Jules’s action.';
  $('turn-instructions').textContent = turnPrivacy + modelExplanation;

  const title = document.createElement('strong');
  title.textContent = 'YOUR PRIVATE AIM';
  const description = document.createElement('p');
  description.textContent = objective.description;
  $('objective-card').replaceChildren(title, description);

  const available = submissionOptions(state, model, fixture);
  const choiceBook = model === MODEL_DIRECT ? directChoiceCopy : influenceChoiceCopy;
  const fieldset = $('submission-options');
  fieldset.replaceChildren();
  const legend = document.createElement('legend');
  legend.className = 'field-label';
  legend.textContent = 'Choose one move';
  fieldset.append(legend);

  for (const id of available) {
    const copy = choiceBook[id];
    if (!copy) throw new Error('No player-facing choice copy exists for ' + id + '.');
    const label = document.createElement('label');
    label.className = 'choice';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'player-choice';
    radio.value = id;
    radio.required = true;
    const content = document.createElement('span');
    const choiceTitle = document.createElement('strong');
    choiceTitle.textContent = copy.title;
    const choiceDescription = document.createElement('small');
    choiceDescription.textContent = copy.description;
    content.append(choiceTitle, choiceDescription);
    label.append(radio, content);
    fieldset.append(label);
  }

  $('lock-button').textContent = player === 'A' ? 'Lock my move' : 'Lock and resolve the moment';
  $('lock-button').disabled = false;
}

function renderResolution() {
  const record = lastRecord;
  $('resolution-heading').textContent = record.departed ? 'The deadline arrives' : 'The moment settles';
  $('resolution-summary').textContent = record.departed
    ? 'The story above is the ending of this test run. A technical objective recap is available below if you want it.'
    : 'Read the latest story beat and the state changes above. Continue when you are ready for the next moment.';
  $('next-button').classList.toggle('hidden', record.departed);
  $('play-again-button').classList.toggle('hidden', !record.departed);
  $('objective-debrief').classList.toggle('hidden', !record.departed);
  $('fixture-id').textContent = fixture.fixtureId;

  const results = $('objective-results');
  results.replaceChildren();
  if (record.departed) {
    for (const key of ['A', 'B']) {
      const item = document.createElement('li');
      const status = record.objectives[key] ? 'Achieved' : 'Not achieved';
      item.textContent = objectiveCopy[key].title + ': ' + status + '.';
      results.append(item);
    }
  }
}

function toast(message) {
  const node = $('toast');
  node.textContent = message;
  node.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.add('hidden'), 2400);
}

boot();
