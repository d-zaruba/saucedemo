import { test, expect } from './fixtures/pages';

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const ITEM_NAME = 'Sauce Labs Backpack';

test.beforeEach(async ({ page, auth, inventory, cart }) => {
  await auth.login(USERNAME, PASSWORD);
  await inventory.addToCart(ITEM_NAME);
  await inventory.openCart();
  await cart.checkoutButton.click();

  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

test('completing checkout with valid information places the order', async ({ page, checkout }) => {
  await test.step('Fill in valid customer information', async () => {
    await checkout.fillInfo('John', 'Doe', '12345');
    await checkout.continueButton.click();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  await test.step('Finish the order', async () => {
    await checkout.finishButton.click();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  });
});

test('checkout requires a first name', async ({ checkout }) => {
  await checkout.fillInfo('', 'Doe', '12345');
  await checkout.continueButton.click();

  await expect(checkout.errorMessage).toContainText('Error: First Name is required');
});

test('checkout requires a last name', async ({ checkout }) => {
  await checkout.fillInfo('John', '', '12345');
  await checkout.continueButton.click();

  await expect(checkout.errorMessage).toContainText('Error: Last Name is required');
});

test('checkout requires a postal code', async ({ checkout }) => {
  await checkout.fillInfo('John', 'Doe', '');
  await checkout.continueButton.click();

  await expect(checkout.errorMessage).toContainText('Error: Postal Code is required');
});
