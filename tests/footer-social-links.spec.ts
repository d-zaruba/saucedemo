import { test, expect } from './fixtures/pages';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.beforeEach(async ({ auth }) => {
  await auth.login(USERNAME, PASSWORD);
});

test('Twitter link opens the Sauce Labs Twitter page', async ({ page, footer }) => {
  const [newPage] = await Promise.all([page.waitForEvent('popup'), footer.twitterLink.click()]);
  await newPage.waitForLoadState();

  await expect(newPage).toHaveURL(/(twitter|x)\.com\/saucelabs/);
});

test('Facebook link opens the Sauce Labs Facebook page', async ({ page, footer }) => {
  const [newPage] = await Promise.all([page.waitForEvent('popup'), footer.facebookLink.click()]);
  await newPage.waitForLoadState();

  await expect(newPage).toHaveURL(/facebook\.com\/saucelabs/);
});

test('LinkedIn link opens the Sauce Labs LinkedIn page', async ({ page, footer }) => {
  const [newPage] = await Promise.all([page.waitForEvent('popup'), footer.linkedinLink.click()]);
  await newPage.waitForLoadState();

  await expect(newPage).toHaveURL(/linkedin\.com\/company\/sauce-labs/);
});
