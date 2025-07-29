import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000'; // Change if needed

test('Register a new user', async ({ page }) => {
    await page.goto(baseUrl);

    // Click on the register  
    await page.click('text=Register here'); 

    await page.fill('input[placeholder="Username"]', 'newUser1');
    await page.fill('input[placeholder="Password"]', 'newPass');
    await page.getByRole('button', { name: 'Register' }).click(); 
    await page.click('button:has-text("Login here")');
    await page.getByRole('button', { name: 'Login' }).click(); 
    await expect(page.locator('h2', { hasText: 'Your Items' })).toBeVisible();
  });

// Test cases for Add new item 
  test('Create a new item', async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill('input[placeholder="Username"]', 'newUser1');
    await page.fill('input[placeholder="Password"]', 'newPass');
    await page.click('button:has-text("Login")');
    await expect(page.locator('h2', { hasText: 'Your Items' })).toBeVisible();
    await page.fill('input[placeholder="New item text"]', 'Test Item');
    await page.click('button:has-text("Add")');
    await expect(page.locator('text=Test Item')).toBeVisible();
  });
// Test cases for Edit functionality
  test('Edit an existing item', async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill('input[placeholder="Username"]', 'newUser1');
    await page.fill('input[placeholder="Password"]', 'newPass');
    await page.click('button:has-text("Login")');
    await expect(page.locator('h2', { hasText: 'Your Items' })).toBeVisible();
    await page.click('button:has-text("Edit")', { force: true });
    const inputBox = page.locator('input[value="Test Item"]');
    await inputBox.fill('Updated Item');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Updated Item')).toBeVisible();
  });

  test('Delete an item', async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill('input[placeholder="Username"]', 'newUser1');
    await page.fill('input[placeholder="Password"]', 'newPass');
    await page.click('button:has-text("Login")');
    await expect(page.locator('h2', { hasText: 'Your Items' })).toBeVisible();

    // Assume item "Updated Item" exists
    await expect(page.locator('text=Updated Item')).toBeVisible();
    await page.click('button:has-text("Delete")', { force: true });
    await expect(page.locator('text=Updated Item')).not.toBeVisible();
  });
 // Login tests invalid
  test('Login with valid credentials', async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill('input[placeholder="Username"]', 'newUser1');
    await page.fill('input[placeholder="Password"]', 'newPass');
    await page.click('button:has-text("Login")');
    await expect(page.locator('h2', { hasText: 'Your Items' })).toBeVisible();
  });

  test('Login with invalid credentials', async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill('input[placeholder="Username"]', 'invalidUser');
    await page.fill('input[placeholder="Password"]', 'wrongPass');
    await page.click('button:has-text("Login")');
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

