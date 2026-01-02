import { test, expect } from '@playwright/test';

test('Verify Successful Login with Valid Credentials', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  let username = page.locator('#username');
  let password = page.locator('#password');

  await username.fill('practice');
  await password.fill('SuperSecretPassword!');

  await page.locator('#submit-login').click();

  await page.waitForURL('**/secure*');

  await expect(page.locator('#flash b')).toHaveText('You logged into a secure area!');

  await expect(page.locator('a[href="/logout"]')).toBeVisible();

});

test('Verify Login Failure with Invalid Username', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  let username = page.locator('#username');
  let password = page.locator('#password');

  await username.fill('invaliduser123');
  await password.fill('SuperSecretPassword!');

  await page.locator('#submit-login').click();

  await expect(page.locator('#flash b')).toHaveText('Your username is invalid!');
});


