export default async function runWithRetry(testFn, retries = 1) {
  let lastError;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      console.log(`Attempt ${attempt}`);
      await testFn();
      return; // ✅ success
    } catch (error) {
      lastError = error;
      if (attempt > retries) break;
    }
  }

  throw lastError; // ❌ final fail
}

/*
Usage with flow
import { test, expect } from '@playwright/test';

let flowBroken = false;
let applicationNo;

test.describe.serial('End-to-End Workflow', () => {

  test('Step 1: Create Application', async ({ page }) => {
    if (flowBroken) test.skip();

    try {
      await runWithRetry(async () => {
        await page.goto('/create');
        await page.fill('#name', 'Deepak');
        await page.click('#submit');

        applicationNo = await page.textContent('#appNo');
        expect(applicationNo).toBeTruthy();
      }, 1); // 👈 retry count
    } catch (e) {
      flowBroken = true;
      throw e;
    }
  });

  test('Step 2: Patwari Action', async ({ page }) => {
    if (flowBroken) test.skip();

    try {
      await runWithRetry(async () => {
        await page.goto('/patwari');
        await page.fill('#appNo', applicationNo);
        await page.click('#approve');
        await expect(page.locator('#status')).toHaveText('Approved');
      }, 1);
    } catch (e) {
      flowBroken = true;
      throw e;
    }
  });

  test('Step 3: Tehsildar Action', async ({ page }) => {
    if (flowBroken) test.skip();

    await runWithRetry(async () => {
      await page.goto('/tehsildar');
      await page.fill('#appNo', applicationNo);
      await page.click('#finalApprove');
    }, 1);
  });

});

*/