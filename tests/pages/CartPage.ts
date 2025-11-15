import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title;
  readonly cartItems;
  readonly checkoutButton;
  readonly continueShoppingButton;
  readonly removeButtons;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('button:has-text("Remove")');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemName(index: number) {
    const item = this.cartItems.nth(index);
    return await item.locator('.inventory_item_name').textContent();
  }

  async removeItem(index: number) {
    const item = this.cartItems.nth(index);
    await item.locator('button').filter({ hasText: 'Remove' }).click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

