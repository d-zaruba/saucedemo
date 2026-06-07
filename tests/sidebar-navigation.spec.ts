import { test, expect } from './fixtures/pages';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.beforeEach(async ({ auth }) => {
  await auth.login(USERNAME, PASSWORD);
});

test('sidebar can be opened and closed', async ({ sidebar }) => {
  await sidebar.open();
  await expect(sidebar.allItemsLink).toBeVisible();

  await sidebar.close();
  await expect(sidebar.allItemsLink).toBeHidden();
});

test('All Items link returns to the inventory page', async ({ page, inventory, sidebar }) => {
  await inventory.addToCart('Sauce Labs Backpack');
  await inventory.openCart();
  await expect(page).toHaveURL(/cart\.html/);

  await sidebar.open();
  await sidebar.allItemsLink.click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});

test('About link navigates to the Sauce Labs website', async ({ page, sidebar }) => {
  await sidebar.open();
  await sidebar.aboutLink.click();

  await expect(page).toHaveURL(/saucelabs\.com/);
});

test('Reset App State clears the cart', async ({ inventory, sidebar }) => {
  await inventory.addToCart('Sauce Labs Backpack');
  await expect(inventory.cartBadge).toHaveText('1');

  await sidebar.open();
  await sidebar.resetAppStateLink.click();

  await expect(inventory.cartBadge).toBeHidden();
});
