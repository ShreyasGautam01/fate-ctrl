const MESSAGE = '“The rib is still loose—I noticed it yesterday. Jules is borrowing the umbrella, and I haven’t told them about it.”';

export function openingStory() {
  return {
    title: 'A debt before goodbye',
    paragraphs: [
      'The red umbrella lies open on the kitchen table. One rib is bent, and a fresh tear marks the fabric. Jules knows they made that tear worse.',
      'Their flatmate wants the umbrella back before leaving. The shared phone thread might clarify what was known about the older damage, but nobody has opened it tonight. Three moments remain before the conversation is cut short.'
    ]
  };
}

/**
 * Converts already-resolved state/events into deterministic story prose.
 * It must never inspect or reveal player submissions, choose an outcome, or
 * mutate authoritative state. The rules engine remains the source of truth.
 */
export function storyForResolution(record) {
  let title;
  let paragraphs;

  switch (record.selected) {
    case 'INSPECT_SHARED_THREAD':
      title = 'The message changes the argument';
      paragraphs = [
        'Jules opens the shared phone thread. A dated photo shows the rib was already loose before the loan. Beneath it is a message from the flatmate: ' + MESSAGE,
        'The older damage was not disclosed. Jules now has something concrete to bring into the conversation—but what they do with it is still an open question.'
      ];
      break;

    case 'RETURN_HONESTLY':
      title = 'Jules owns the tear';
      paragraphs = [
        'Jules holds the red umbrella out by its handle. “I made the tear worse,” they say. It is the clearest part of the story they have taken responsibility for.',
        'The umbrella has been returned honestly. That settles Jules’s part in the damage; it does not automatically settle every question about the older, loose rib.'
      ];
      break;

    case 'PRESENT_EVIDENCE':
      if (record.privateWindow) {
        title = 'A quieter truth';
        paragraphs = [
          'Jules waits until the two of them are alone, then turns the phone toward the flatmate. The dated message is unmistakable. The flatmate recognizes it and acknowledges they knew about the loose rib before the loan.',
          'The admission lands without an audience. The facts are now in the conversation, and the relationship has not taken the same immediate hit.'
        ];
      } else if (record.before.acknowledged_damage) {
        title = 'Two responsibilities, side by side';
        paragraphs = [
          'After admitting they made the tear worse, Jules places the phone on the table. The flatmate reads the old message and acknowledges it was never disclosed.',
          'One responsibility does not cancel the other: Jules caused new damage, and the flatmate withheld what they knew. For the first time, both parts of the argument are out in the open.'
        ];
      } else {
        title = 'The truth comes out the hard way';
        paragraphs = [
          'Jules holds the phone out while the argument is still raw. The flatmate confirms they knew about the loose rib before the loan—but the reveal feels like an accusation, not a conversation.',
          'The message settles one question. The way it was brought forward damages trust; proving a point has not made the relationship easier to repair.'
        ];
      }
      break;

    case 'WAIT':
      title = 'Another moment slips away';
      if (record.before.inspected && !record.before.presented) {
        paragraphs = [
          'Jules looks at the message again but keeps the phone to themself. No accusation, no explanation—just a truth that has not yet been shared.',
          'The umbrella remains between them. The time available for a useful conversation is shrinking.'
        ];
      } else {
        paragraphs = [
          'Jules says nothing. The phone stays where it is, the umbrella remains between them, and a few seconds drain from the conversation.',
          'Doing nothing avoids a new confrontation, but the existing problem has not moved closer to a resolution.'
        ];
      }
      break;

    default:
      throw new Error('No story presentation exists for the resolved action.');
  }

  if (record.before.trust !== record.after.trust && record.after.trust === 0) {
    paragraphs.push('The flatmate’s willingness to give Jules the benefit of the doubt has been damaged. That state will not quietly repair itself before they leave.');
  }

  if (record.departed) {
    paragraphs.push(endingParagraph(record.after));
  } else if (record.after.remaining === 1) {
    paragraphs.push('The deadline is now close: only one moment remains before the flatmate leaves.');
  } else {
    paragraphs.push('There is still time to act, but the next move will have to work with what has already been said—and what has not.');
  }

  return { title, paragraphs };
}

function endingParagraph(state) {
  const honestReturn = state.returned && state.acknowledged_damage;
  const evidenceEstablished = state.inspected && state.presented && state.prior_knowledge_acknowledged;

  if (honestReturn && evidenceEstablished && state.trust > 0) {
    return 'The flatmate leaves with the umbrella returned, Jules’s part in the tear acknowledged, and the earlier nondisclosure faced. Both parts of the truth are finally in view. Trust has held—for now.';
  }
  if (honestReturn && evidenceEstablished) {
    return 'The umbrella is returned and the earlier nondisclosure is acknowledged, but the way the evidence surfaced damaged trust. The facts are clearer; the relationship is not repaired.';
  }
  if (honestReturn) {
    return 'The umbrella goes back, with Jules’s admission. But the message never became part of the conversation; what the flatmate knew about the older damage remains unresolved between them.';
  }
  if (evidenceEstablished) {
    return 'The flatmate leaves with the message acknowledged, but the umbrella is still with Jules. Accountability arrived; repair did not.';
  }
  return 'The flatmate leaves. The umbrella is still with Jules, and the old message never became part of the conversation. Neither the practical problem nor the disagreement about what happened was settled before the deadline.';
}

/** Objective contributors shown as state, never as odds of winning. */
export function worldMeters(state) {
  const honestReturn = state.returned && state.acknowledged_damage;
  const evidencePercent = state.presented && state.prior_knowledge_acknowledged ? 100 : state.inspected ? 50 : 0;
  return [
    {
      id: 'honesty',
      label: 'Honest return',
      percent: honestReturn ? 100 : 0,
      detail: honestReturn ? 'Returned; Jules acknowledged the later tear.' : 'The return and acknowledgement are not both complete.'
    },
    {
      id: 'evidence',
      label: 'Evidence discovered / shared',
      percent: evidencePercent,
      detail: evidencePercent === 100 ? 'The message was shown and the prior knowledge acknowledged.' : evidencePercent === 50 ? 'Jules has inspected the thread; the message has not yet been put to the flatmate.' : 'The thread has not been inspected.'
    },
    {
      id: 'trust',
      label: 'Relationship trust',
      percent: state.trust > 0 ? 100 : 0,
      detail: state.trust > 0 ? 'Trust is intact under this test’s current rules.' : 'Trust has been damaged and cannot recover in this test.'
    }
  ];
}
