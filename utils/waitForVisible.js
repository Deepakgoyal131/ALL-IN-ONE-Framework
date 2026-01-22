/**
 * Wait until element is visible on page
 *
 * @param {Page} page
 * @param {string} locator
 * @param {Object} options
 * 
    * // usage
    await waitForVisible(page, "#username");
    await waitForVisible(page, "//button[text()='Submit']", {timeout: 10000});
 */
async function waitForVisible(page, locator, options = {}) {
  const {
    timeout = 5000,
    scroll = true
  } = options;

  const element = page.locator(locator);

  await element.waitFor({
    state: "visible",
    timeout
  });

  if (scroll) {
    await element.scrollIntoViewIfNeeded();
  }

  return element;
}

export default waitForVisible;
