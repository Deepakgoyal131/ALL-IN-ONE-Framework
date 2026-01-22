/**
 * Safe click utility for Playwright
 * Handles:
 *  - wait for visible & enabled
 *  - auto scroll
 *  - retry on failure
 *  - JS click fallback
 *
 * @param {Page} page
 * @param {string} locator
 * @param {Object} options
 * 
 * //usage 
  await safeClick(page, "#submitBtn");
  await safeClick(page, "#saveBtn", { force: true });

 */
export default async function safeClick(page, locator, options = {}) {
  const {
    timeout = 5000,
    retries = 2,
    force = false
  } = options;

  const element = page.locator(locator);

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      await element.waitFor({ state: "visible", timeout });
      await element.scrollIntoViewIfNeeded();

      if (force) {
        await element.click({ force: true });
      } else {
        await element.click();
      }
      return;
    } catch (error) {
      if (attempt > retries) {
        throw new Error(
          `SafeClick failed after ${retries + 1} attempts for locator: ${locator}\n${error}`
        );
      }

      // small wait before retry
      await page.waitForTimeout(300);
    }
  }
}


