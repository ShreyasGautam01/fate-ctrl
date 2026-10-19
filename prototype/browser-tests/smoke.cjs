const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');

const BASE_URL = 'http://127.0.0.1:8000/prototype/';
let browser;
let page;

async function lock(page, actionId, buttonName) {
  const choice = page.locator('input[name="player-choice"][value="' + actionId + '"]');
  await choice.waitFor({ state: 'visible' });
  await choice.check();
  await page.getByRole('button', { name: buttonName }).click();
}

async function assertNoPlayerFacingSubmissionLeak(page) {
  assert.equal(
    await page.locator('input[name="player-choice"]').count(),
    0,
    'Choice inputs should be removed from the visible DOM at handoff/resolution.'
  );
  const visibleText = await page.locator('body').innerText();
  assert.doesNotMatch(
    visibleText,
    /INSPECT_SHARED_THREAD|RETURN_HONESTLY|PRESENT_EVIDENCE|Player A chose|Player B chose|Optional rules inspector|ranked-actions/,
    'Private input IDs or input-derived selector diagnostics appeared in the player interface.'
  );
}

async function main() {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'A debt before goodbye' }).waitFor();
  await page.getByText('Loaded', { exact: true }).waitFor();

  // Moment 1: both players privately intend that Jules inspect the thread.
  await lock(page, 'INSPECT_SHARED_THREAD', 'Lock my move');
  await page.getByRole('heading', { name: 'Pass the device to Player B' }).waitFor();
  await assertNoPlayerFacingSubmissionLeak(page);
  await page.getByRole('button', { name: 'Continue to Player B' }).click();

  await lock(page, 'INSPECT_SHARED_THREAD', 'Lock and resolve the moment');
  await page.getByRole('heading', { name: 'The message changes the argument' }).waitFor();
  await page.getByText('AFTER MOMENT 1 OF 3', { exact: true }).waitFor();
  assert.deepEqual(await page.locator('.meter-value').allTextContents(), ['0%', '50%', '100%']);
  await assertNoPlayerFacingSubmissionLeak(page);

  // Moment 2: a direct intention to return the umbrella competes with Player B passing.
  await page.getByRole('button', { name: 'Continue the story' }).click();
  await page.getByText('MOMENT 2 OF 3', { exact: true }).waitFor();
  await lock(page, 'RETURN_HONESTLY', 'Lock my move');
  await assertNoPlayerFacingSubmissionLeak(page);
  await page.getByRole('button', { name: 'Continue to Player B' }).click();
  await lock(page, 'PASS', 'Lock and resolve the moment');
  await page.getByRole('heading', { name: 'Jules owns the tear' }).waitFor();
  await page.getByText('AFTER MOMENT 2 OF 3', { exact: true }).waitFor();
  assert.deepEqual(await page.locator('.meter-value').allTextContents(), ['100%', '50%', '100%']);
  await assertNoPlayerFacingSubmissionLeak(page);

  // Moment 3: show the inspected evidence after Jules has acknowledged their own damage.
  await page.getByRole('button', { name: 'Continue the story' }).click();
  await page.getByText('MOMENT 3 OF 3', { exact: true }).waitFor();
  await lock(page, 'PRESENT_EVIDENCE', 'Lock my move');
  await assertNoPlayerFacingSubmissionLeak(page);
  await page.getByRole('button', { name: 'Continue to Player B' }).click();
  await lock(page, 'PRESENT_EVIDENCE', 'Lock and resolve the moment');
  await page.getByRole('heading', { name: 'Two responsibilities, side by side' }).waitFor();
  await page.getByText('AFTER THE FINAL MOMENT', { exact: true }).waitFor();
  assert.deepEqual(await page.locator('.meter-value').allTextContents(), ['100%', '100%', '100%']);
  const results = await page.locator('#objective-results li').allTextContents();
  assert.equal(results.length, 2);
  assert.ok(results.every(text => /Achieved/i.test(text)), 'Expected both objective conditions to be achieved in this authored test route.');
  await assertNoPlayerFacingSubmissionLeak(page);

  // Confirm the optional comparison mode remains available without making it the default.
  const settings = page.locator('details.experiment-settings');
  await settings.locator('summary').click();
  await page.locator('#model-select').selectOption('W');
  await page.getByRole('button', { name: 'Restart with these settings' }).click();
  await page.getByRole('heading', { name: 'A debt before goodbye' }).waitFor();
  await page.getByRole('heading', { name: 'How will you steer the situation?' }).waitFor();
  await lock(page, 'THREAD_UP', 'Lock my move');
  await assertNoPlayerFacingSubmissionLeak(page);
  await page.getByRole('button', { name: 'Continue to Player B' }).click();
  await lock(page, 'PASS', 'Lock and resolve the moment');
  await page.getByRole('heading', { name: 'The message changes the argument' }).waitFor();
  await assertNoPlayerFacingSubmissionLeak(page);

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth
  }));
  assert.ok(
    dimensions.document <= dimensions.viewport,
    'Mobile layout has horizontal overflow: ' + JSON.stringify(dimensions)
  );
  assert.deepEqual(pageErrors, [], 'Unexpected page errors: ' + pageErrors.join('; '));

  console.log('Browser smoke passed: complete direct-intention run, ending, meters, hidden submissions, timeline labels, and environmental-influence comparison.');
}

main()
  .catch(async error => {
    console.error(error);
    if (page) {
      try {
        fs.mkdirSync('artifacts', { recursive: true });
        await page.screenshot({ path: 'artifacts/prototype-smoke-failure.png', fullPage: true });
      } catch (screenshotError) {
        console.error('Could not capture failure screenshot:', screenshotError.message);
      }
    }
    process.exitCode = 1;
  })
  .finally(async () => {
    if (browser) await browser.close();
  });
