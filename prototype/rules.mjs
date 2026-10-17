export const MODEL_DIRECT = "I";
export const MODEL_INFLUENCE = "W";
export const PASS = "PASS";

export function createInitialState(fixture) { return { ...fixture.initialState }; }

function actionLegal(state, actionId, fixture) {
  const facts = fixture.worldFacts;
  switch (fixture.actions[actionId].preconditionId) {
    case "always": return true;
    case "thread_uninspected": return facts.threadExists && facts.threadAccessibleFromPhone && facts.julesKnowsThreadExists && !state.inspected;
    case "evidence_ready_for_presentation": return state.inspected && !state.presented && state.remaining > 0 && facts.flatmate.reachableBeforeAction;
    case "return_possible": return !state.returned && state.remaining > 0 && facts.flatmate.reachableBeforeAction;
    default: throw new Error("Unsupported action precondition: " + fixture.actions[actionId].preconditionId);
  }
}
export function legalActions(state, fixture) { return Object.keys(fixture.actions).filter(id => actionLegal(state, id, fixture)); }

function influenceLegal(state, id, fixture) {
  const influence = fixture.influences[id], facts = fixture.worldFacts;
  switch (influence.precondition) {
    case "thread_uninspected": return facts.threadExists && facts.threadAccessibleFromPhone && facts.julesKnowsThreadExists && !state.inspected;
    case "evidence_ready_for_presentation": return state.inspected && !state.presented && state.remaining > 0 && facts.flatmate.reachableBeforeAction;
    case "private_window_available": return state.inspected && !state.presented && state.remaining > 0 && facts.flatmate.reachableBeforeAction && facts.privateConversationOptionExists;
    default: throw new Error("Unsupported influence precondition: " + influence.precondition);
  }
}
export function submissionOptions(state, model, fixture) {
  if (model === MODEL_DIRECT) {
    const legal = new Set(legalActions(state, fixture));
    return [PASS, ...Object.keys(fixture.actions).filter(id => fixture.actions[id].directProposalAllowed && legal.has(id))];
  }
  if (model === MODEL_INFLUENCE) return [PASS, ...Object.keys(fixture.influences).filter(id => influenceLegal(state, id, fixture))];
  throw new Error("Unknown model: " + model);
}

function resolveInfluences(state, inputs, fixture) {
  const allowed = new Set(submissionOptions(state, MODEL_INFLUENCE, fixture));
  if (inputs.some(input => !allowed.has(input))) throw new Error("Invalid environmental influence: " + inputs.join(", "));
  const grouped = new Map(); let privateWindow = false;
  for (const id of inputs) {
    if (id === PASS) continue;
    const def = fixture.influences[id];
    if (!grouped.has(def.targetAction)) grouped.set(def.targetAction, []);
    grouped.get(def.targetAction).push({ id, signal: Number(def.signal), privateWindow: Boolean(def.privateWindow) });
    privateWindow = privateWindow || Boolean(def.privateWindow);
  }
  const context = Object.fromEntries(Object.keys(fixture.actions).map(id => [id, 0])), effects = [];
  for (const [target, entries] of grouped) {
    const signals = entries.filter(entry => !entry.privateWindow && entry.signal !== 0).map(entry => entry.signal);
    const hasUp = signals.some(value => value > 0), hasDown = signals.some(value => value < 0);
    let signal = 0;
    if (hasUp && hasDown && fixture.composition.oppositeSignals === "cancel_to_zero") signal = 0;
    else if (hasUp) signal = Math.min(fixture.composition.sameDirectionCap, Math.max(...signals));
    else if (hasDown) signal = Math.max(-fixture.composition.sameDirectionCap, Math.min(...signals));
    signal += entries.filter(entry => entry.privateWindow).reduce((sum, entry) => sum + entry.signal, 0);
    signal = Math.max(fixture.composition.selectorSignalMin, Math.min(fixture.composition.selectorSignalMax, signal));
    context[target] = signal;
    effects.push({ targetAction: target, inputs: entries.map(entry => entry.id), signal });
  }
  if (privateWindow) effects.push({ privateWindowOpened: true });
  return { context, privateWindow, effects };
}

function rankActions(state, model, inputs, fixture) {
  const legal = legalActions(state, fixture);
  const support = Object.fromEntries(Object.keys(fixture.actions).map(id => [id, 0]));
  let context = Object.fromEntries(Object.keys(fixture.actions).map(id => [id, 0]));
  let privateWindow = false, effects = [];
  if (model === MODEL_DIRECT) {
    const allowed = new Set(submissionOptions(state, model, fixture));
    if (inputs.some(input => !allowed.has(input))) throw new Error("Invalid direct intention: " + inputs.join(", "));
    for (const input of inputs) if (input !== PASS) support[input] += 1;
  } else {
    ({ context, privateWindow, effects } = resolveInfluences(state, inputs, fixture));
  }
  const policy = fixture.selectionPolicy;
  const tieRank = Object.fromEntries(policy.tieBreakOrderHighestFirst.map((id, index, all) => [id, all.length - index]));
  const ranks = {}, rankFields = {};
  for (const id of legal) {
    const values = {
      contextSignal: model === MODEL_INFLUENCE ? context[id] : 0,
      directSupport: model === MODEL_DIRECT ? support[id] : 0,
      actionTier: Number(fixture.actions[id].actionTier),
      deadlineTier: id === policy.deadlineRule.action && state.remaining === policy.deadlineRule.remainingBoundaries ? Number(policy.deadlineRule.tier) : 0,
      tieBreakRank: tieRank[id],
    };
    ranks[id] = policy.rankOrder.map(field => values[field]);
    rankFields[id] = { ...values, tuple: ranks[id] };
  }
  const ranked = [...legal].sort((a, b) => {
    for (let i = 0; i < ranks[a].length; i++) if (ranks[a][i] !== ranks[b][i]) return ranks[b][i] - ranks[a][i];
    return 0;
  });
  const selected = ranked[0], runnerUp = ranked[1] || null;
  let decisiveField = null;
  if (runnerUp) decisiveField = policy.rankOrder.find((field, index) => ranks[selected][index] !== ranks[runnerUp][index]) || null;
  return { selected, ranked, runnerUp, decisiveField, rankFields, support, context, privateWindow, effects };
}

export function objectiveStatus(state, departed, fixture) {
  if (!departed) return { A: false, B: false };
  const status = {};
  for (const [key, definition] of Object.entries(fixture.objectives)) {
    status[key] = definition.requiredTrueFields.every(field => Boolean(state[field])) &&
      Object.entries(definition.minimumValues || {}).every(([field, minimum]) => state[field] >= minimum);
  }
  return status;
}

export function resolveRound(state, model, inputs, fixture) {
  if (state.remaining <= 0) throw new Error("Cannot resolve after departure.");
  if (!Array.isArray(inputs) || inputs.length !== 2) throw new Error("Exactly two player submissions are required.");
  const before = { ...state }, decision = rankActions(state, model, inputs, fixture), next = { ...state }, events = [];
  const effect = fixture.actions[decision.selected].effectId;
  if (effect === "inspect_thread") {
    next.inspected = true; events.push("EvidenceInspected", "JulesLearnedPhotoAndSeededMessage");
  } else if (effect === "present_evidence") {
    next.presented = true; next.prior_knowledge_acknowledged = true;
    events.push("EvidencePresented", "PriorKnowledgeAcknowledged");
    const response = fixture.relationshipResponse;
    if (!before.acknowledged_damage && !decision.privateWindow) next.trust = response.trustWhenEvidencePresentedBeforeAcknowledgementWithoutPrivateWindow;
    else if (decision.privateWindow) next.trust = response.trustWhenEvidencePresentedBeforeAcknowledgementWithPrivateWindow;
    else next.trust = response.trustWhenEvidencePresentedAfterAcknowledgement;
    events.push("TrustSetTo" + next.trust);
  } else if (effect === "return_and_acknowledge_damage") {
    next.returned = true; next.acknowledged_damage = true; events.push("HonestReturn", "OwnDamageAcknowledged");
  } else if (effect === "wait") events.push("Waited");
  else throw new Error("Unsupported action effect: " + effect);
  next.remaining -= 1;
  const departed = next.remaining === 0;
  next.round_no += 1;
  const objectives = objectiveStatus(next, departed, fixture);
  if (departed) events.push("FlatmateDeparted", "ObjectiveA:" + (objectives.A ? "complete" : "incomplete"), "ObjectiveB:" + (objectives.B ? "complete" : "incomplete"));
  return { state: next, record: {
    model, round: before.round_no, inputs: [...inputs], legalActions: legalActions(before, fixture), selected: decision.selected,
    rankedActions: decision.ranked, rankFields: decision.rankFields, runnerUp: decision.runnerUp, decisiveField: decision.decisiveField,
    support: decision.support, context: decision.context, effects: decision.effects, privateWindow: decision.privateWindow,
    events, before, after: { ...next }, objectives, departed,
  }};
}
