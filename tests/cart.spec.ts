import { test, expect } from './fixtures/pages';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const ITEM_NAME = 'Sauce Labs Backpack';

test.beforeEach(async ({ auth }) => {
  await auth.login(USERNAME, PASSWORD);
});

test.describe('Adding items to the cart', () => {
  test('adding an item updates the cart badge and appears in the cart', async ({
    page,
    inventory,
    cart,
  }) => {
    await test.step('Add item to cart from the inventory page', async () => {
      await inventory.addToCart(ITEM_NAME);

      await expect(inventory.cartBadge).toHaveText('1');
    });

    await test.step('Cart page shows the added item', async () => {
      await inventory.openCart();

      await expect(page).toHaveURL(/cart\.html/);
      await expect(cart.item(ITEM_NAME)).toBeVisible();
    });
  });

  test('adding multiple items increments the cart badge', async ({ page, inventory, cart }) => {
    await inventory.addToCart('Sauce Labs Backpack');
    await inventory.addToCart('Sauce Labs Bike Light');

    await expect(inventory.cartBadge).toHaveText('2');

    await inventory.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cart.item('Sauce Labs Backpack')).toBeVisible();
    await expect(cart.item('Sauce Labs Bike Light')).toBeVisible();
  });
});

test.describe('Removing items from the cart', () => {
  test.beforeEach(async ({ inventory }) => {
    await inventory.addToCart(ITEM_NAME);

    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('removing an item from the inventory page clears the cart badge', async ({ inventory }) => {
    await inventory.removeFromCart(ITEM_NAME);

    await expect(inventory.cartBadge).toBeHidden();
  });

  test('removing an item from the cart page removes it from the list', async ({
    page,
    inventory,
    cart,
  }) => {
    await inventory.openCart();
    await expect(page).toHaveURL(/cart\.html/);

    await cart.removeFromCart(ITEM_NAME);

    await expect(cart.item(ITEM_NAME)).toBeHidden();
    await expect(inventory.cartBadge).toBeHidden();
  });
});
