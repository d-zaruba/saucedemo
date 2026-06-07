import { test as base, expect, Locator, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

class AuthActions {
  readonly burgerMenuButton: Locator;
  readonly logoutSidebarLink: Locator;

  constructor(private page: Page) {
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutSidebarLink = page.locator('#logout_sidebar_link');
  }

  async login(username: string, password: string) {
    await this.page.goto(BASE_URL);
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async openSidebar() {
    await this.burgerMenuButton.click();
  }

  async logout() {
    await this.openSidebar();
    await this.logoutSidebarLink.click();
  }
}

export const test = base.extend<{ auth: AuthActions }>({
  auth: async ({ page }, use) => {
    await use(new AuthActions(page));
  },
});

export { expect, BASE_URL };
