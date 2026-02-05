// ...existing code...
import { test, expect } from '@playwright/test';
import selectFromDropdown from '../utils/dropdowns.js';
import { expectText, expectTextContains } from '../utils/assertion.js';
import { getRowByText } from '../utils/table.js';
import safeClick from '../utils/safeClick.js';
import runWithRetry from '../utils/flowcontrolRetry.js';

// test.describe('Login Tests', () => {

//   test.beforeEach(async ({ page }) => {
//     await page.goto("https://practice.expandtesting.com/login");
//   });

//   test('Test Login Functionality with valid credentials', async ({ page }) => {
//     // Login
//     await page.fill('#username', 'practice');
//     await page.fill('#password', 'SuperSecretPassword!');
//     await safeClick(page, "#submit-login");

//     await expectText(page, "#flash", "You logged into a secure area!");

//     await safeClick(page, ".button.secondary.radius.btn.btn-danger");

//     await expectText(page, "#flash", "You logged out of the secure area!");
//   });

//   test('Test Login Functionality with invalid credentials', async ({ page }) => {
//     // Login
//     await page.fill('#username', 'invalidUser');
//     await page.fill('#password', 'invalidPassword');
//     await safeClick(page, "#submit-login");

//     await expectTextContains(page, "#flash", "invalid");
//   });

// });
let flowBroken = false;
test.describe.serial('Test Tables', () => {

  test('Dynamic Table', async ({ page }) => {
    if (flowBroken) test.skip();
    try {
      await runWithRetry(async () => {
        await page.goto("https://practice.expandtesting.com/dynamic-table");
        let row = await getRowByText(page, 'tbody', 'Chrome')
        console.log(await row.textContent());
        
      }, 1)
    }
    catch (e) {
      flowBroken = true;
      throw e;
    }

  })

  test('Dynamic Pagination Table', async ({ page }) => {
    if(flowBroken) test.skip();
    try {
      await runWithRetry(async () =>{
        await page.goto("https://practice.expandtesting.com/dynamic-pagination-table");

    // await page.fill("input[type='search']", 'His');
    // let row = await getRowByText(page, '#demo', 'History');
    // console.log(await row.textContent());
    await expect(page).toHaveTitle("Dynamic Tables page for Automation");
      }, 1)
    } catch (error) {
      flowBroken = true;
      throw error
    }
    
  });
  test('check working', async ({page}) =>{
    if(flowBroken) test.skip();
    console.log("This test should be skipped if previous test fails");
  })

})