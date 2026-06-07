import { test, expect, BASE_URL } from './fixtures/auth';

const PASSWORD = 'secret_sauce';

const USERS = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
];

for (const username of USERS) {
  test(`login and logout as ${username}`, async ({ page, auth }) => {
    await test.step('Login', async () => {
      await auth.login(username, PASSWORD);
    });

    if (username === 'locked_out_user') {
      await test.step('Locked out user sees an error', async () => {
        await expect(page.locator('[data-test="error"]')).toContainText(
          'Sorry, this user has been locked out.',
        );
      });
      return;
    }

    await test.step('Products page is shown', async () => {
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
