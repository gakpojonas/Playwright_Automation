import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  let username = page.locator('#username');
  let password = page.locator('#password');

  await username.fill('practice');
  await password.fill('SuperSecretPassword!');

  await page.locator('#submit-login').click();

  await page.waitForURL('**/secure*');

  await expect(page.locator('#flash b')).toHaveText('You logged into a secure area!');

  await expect(page.locator('a[href="/logout"]')).toBeVisible();

  await page.locator('a[href="/logout"]').waitFor({state: 'visible', timeout: 10000});

});


