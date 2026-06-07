import { test, expect, BASE_URL } from './fixtures/auth';

const PASSWORD = 'secret_sauce';

const VALID_USERS = [
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
];

for (const username of VALID_USERS) {
  test(`login and logout as ${username}`, async ({ page, auth }) => {
    await test.step('Login', async () => {
      await auth.login(username, PASSWORD);

      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('.title')).toHaveText('Products');
    });

    await test.step('Open sidebar and log out', async () => {
      await auth.openSidebar();
      await auth.logoutSidebarLink.click();

      await expect(page).toHaveURL(`${BASE_URL}/`);
      await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });
  });
}

test('locked out user sees an error on login', async ({ page, auth }) => {
  await auth.login('locked_out_user', PASSWORD);

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Sorry, this user has been locked out.',
  );
});
