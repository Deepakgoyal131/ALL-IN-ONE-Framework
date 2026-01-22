/**
 * Universal dropdown selector for Playwright
 * Supports:
 *  - <select> dropdown
 *  - Custom div dropdowns (Angular/React/ng-select)
 *  - ARIA combobox
 *  - Keyboard-based selection
 *
 * @param {Page} page
 * @param {string} dropdownLocator
 * @param {string|number} valueToSelect
 * @param {Object} options
 */

/*

// Simple Dropdown 
await selectFromDropdown(page, "#country", "India");
await selectFromDropdown(page, "#country", "IN", { by: "value" });
await selectFromDropdown(page, "#country", 2, { by: "index" });

//Custom Dropdown with Keyboard
await selectFromDropdown(
  page,
  "(//div[@role='combobox'])[4]",
  "1/1"
);
*/

export default async function selectFromDropdown(
  page,
  dropdownLocator,
  valueToSelect,
  options = {}
) {
  const {
    by = "text",        // text | value | index
    useKeyboard = true,
    timeout = 5000
  } = options;

  const dropdown = page.locator(dropdownLocator);
  await dropdown.waitFor({ state: "visible", timeout });

  /* ---------- STEP 1: Check if <select> ---------- */
  const tagName = await dropdown.evaluate(el => el.tagName.toLowerCase());

  if (tagName === "select") {
    if (by === "value") {
      await dropdown.selectOption({ value: String(valueToSelect) });
    } else if (by === "index") {
      await dropdown.selectOption({ index: Number(valueToSelect) });
    } else {
      await dropdown.selectOption({ label: String(valueToSelect) });
    }
    return;
  }

  /* ---------- STEP 2: Custom dropdown ---------- */
  await dropdown.scrollIntoViewIfNeeded();
  await dropdown.click();

  /* ---------- STEP 3: Keyboard based selection ---------- */
  if (useKeyboard) {
    await page.keyboard.type(String(valueToSelect), { delay: 50 });
    await page.keyboard.press("Enter");
    return;
  }

  /* ---------- STEP 4: Mouse based fallback ---------- */
  const option = page.locator(`text="${valueToSelect}"`).first();
  await option.waitFor({ state: "visible", timeout });
  await option.click();
}

