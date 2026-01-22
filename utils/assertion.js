const { expect } = require("@playwright/test");

/**
 * Assert element text
 * await expectText(page, "#status", "Approved");
 */
async function expectText(page, locator, expectedText, options = {}) {
  const { timeout = 5000 } = options;
  const element = page.locator(locator);

  await expect(element).toHaveText(expectedText, { timeout });
}

/**
 * Assert element contains text
 * await expectTextContains(page, "#message", "Success");
 */
async function expectTextContains(page, locator, expectedText, options = {}) {
  const { timeout = 5000 } = options;
  const element = page.locator(locator);

  await expect(element).toContainText(expectedText, { timeout });
}

/**
 * Assert element is visible
 * await expectVisible(page, "#status");
 */
async function expectVisible(page, locator, options = {}) {
  const { timeout = 5000 } = options;
  await expect(page.locator(locator)).toBeVisible({ timeout });
}

/**
 * Assert element is hidden
 */
async function expectHidden(page, locator, options = {}) {
  const { timeout = 5000 } = options;
  await expect(page.locator(locator)).toBeHidden({ timeout });
}

/**
 * Assert element is enabled
 */
async function expectEnabled(page, locator, options = {}) {
  const { timeout = 5000 } = options;
  await expect(page.locator(locator)).toBeEnabled({ timeout });
}

/**
 * Assert element is disabled
 */
async function expectDisabled(page, locator, options = {}) {
  const { timeout = 5000 } = options;
  await expect(page.locator(locator)).toBeDisabled({ timeout });
}

/**
 * Assert input value
 */
async function expectValue(page, locator, expectedValue, options = {}) {
  const { timeout = 5000 } = options;
  await expect(page.locator(locator)).toHaveValue(expectedValue, { timeout });
}

/**
 * Assert element attribute
 await expectAttribute(page, "#submitBtn", "disabled", "true");

 */
async function expectAttribute(
  page,
  locator,
  attribute,
  expectedValue,
  options = {}
) {
  const { timeout = 5000 } = options;
  await expect(page.locator(locator)).toHaveAttribute(
    attribute,
    expectedValue,
    { timeout }
  );
}

/**
 * Assert element count
 */
async function expectCount(page, locator, expectedCount, options = {}) {
  const { timeout = 5000 } = options;
  await expect(page.locator(locator)).toHaveCount(expectedCount, { timeout });
}

module.exports = {
  expectText,
  expectTextContains,
  expectVisible,
  expectHidden,
  expectEnabled,
  expectDisabled,
  expectValue,
  expectAttribute,
  expectCount
};
