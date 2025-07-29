import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:3000'); // Replace with your actual login URL
  }

  async login(username: string, password: string) {
    await this.page.locator('input[placeholder="Username"]').fill("creatingnew");
    await this.page.locator('input[placeholder="Password"]').fill("1234");
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async verifyLandingPage() {
    await expect(this.page.locator('h2')).toHaveText('Your Items');
  }
}