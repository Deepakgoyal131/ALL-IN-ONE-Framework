/**
 * Get row locator which contains specific text
 *
 * @param {Page} page
 * @param {string} tableLocator
 * @param {string} searchText
 * 
   //usage
   1. Click action (Approve / View / Edit) by Case No
   await clickActionInRow(page, "#caseTable", caseNo, "Approve");

   2. Click icon/button using locator
   await clickActionInRow(page,"#caseTable", caseNo,".btn-view");

   3. Read Status column by header name
   const status = await getCellValueByHeader(page,"#caseTable", caseNo, "Status");

   4. Read value by column index
   const applicantName = await getCellValueByIndex(page,"#caseTable", caseNo, 3);
 */
async function getRowByText(page, tableLocator, searchText) {
  const table = page.locator(tableLocator);
  await table.waitFor({ state: "visible" });

  const row = table.locator("tr", {
    hasText: searchText
  }).first();

  await row.waitFor({ state: "visible" });
  return row;
}

/**
 * Click button/link inside a row
 *
 * @param {Page} page
 * @param {string} tableLocator
 * @param {string} searchText
 * @param {string} actionTextOrLocator
 */
async function clickActionInRow(
  page,
  tableLocator,
  searchText,
  actionTextOrLocator
) {
  const row = await getRowByText(page, tableLocator, searchText);

  const action =
    actionTextOrLocator.startsWith("//") ||
    actionTextOrLocator.startsWith(".") ||
    actionTextOrLocator.startsWith("#")
      ? row.locator(actionTextOrLocator)
      : row.locator(`text="${actionTextOrLocator}"`);

  await action.first().click();
}

/**
 * Read cell value by column index
 *
 * @param {Page} page
 * @param {string} tableLocator
 * @param {string} searchText
 * @param {number} columnIndex (1-based)
 */
async function getCellValueByIndex(
  page,
  tableLocator,
  searchText,
  columnIndex
) {
  const row = await getRowByText(page, tableLocator, searchText);
  const cell = row.locator("td").nth(columnIndex - 1);
  return (await cell.textContent())?.trim();
}

/**
 * Read cell value by column header name
 *
 * @param {Page} page
 * @param {string} tableLocator
 * @param {string} searchText
 * @param {string} headerName
 */
async function getCellValueByHeader(
  page,
  tableLocator,
  searchText,
  headerName
) {
  const table = page.locator(tableLocator);
  const headers = table.locator("th");

  const count = await headers.count();
  let columnIndex = -1;

  for (let i = 0; i < count; i++) {
    const text = (await headers.nth(i).textContent())?.trim();
    if (text === headerName) {
      columnIndex = i + 1;
      break;
    }
  }

  if (columnIndex === -1) {
    throw new Error(`Header not found: ${headerName}`);
  }

  return await getCellValueByIndex(
    page,
    tableLocator,
    searchText,
    columnIndex
  );
}

export {
  getRowByText,
  clickActionInRow,
  getCellValueByIndex,
  getCellValueByHeader
};
