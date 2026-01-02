import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecureAreaPage } from '../pages/SecureAreaPage';

test('Verify Successful Login with Valid Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('practice', 'SuperSecretPassword!');

  await page.waitForURL('**/secure*');

  const secureAreaPage = new SecureAreaPage(page);

  await expect(secureAreaPage.displayedText).toHaveText('You logged into a secure area!');

  // For some reason the line below is the best practise and expected to work but it isn't
  // await expect(secureAreaPage.logoutBtn).toBeVisible();

  // So the selector is called in here directly which passes instead of the code above on line 18
  await expect(page.locator('a[href="/logout"]')).toBeVisible();

});

test('Verify Login Failure with Invalid Username', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('invaliduser123', 'SuperSecretPassword!');

  await expect(loginPage.displayedText).toHaveText('Your username is invalid!');
});


test('Verify Login Failure with Invalid Password', async ({ page }) => {
 const loginPage = new LoginPage(page);

 await loginPage.goto();
 await loginPage.login('practice', 'WrongPassword123');

 await expect(loginPage.displayedText).toHaveText('Your password is invalid!');
});


