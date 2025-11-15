import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title;
  readonly inventoryItems;
  readonly shoppingCartBadge;
  readonly shoppingCartLink;
  readonly sortDropdown;
  readonly menuButton;
  readonly logoutLink;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    const addToCartButton = product.locator('button').filter({ hasText: 'Add to cart' });
    await addToCartButton.click();
  }

  async removeProductFromCart(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    const removeButton = product.locator('button').filter({ hasText: 'Remove' });
    await removeButton.click();
  }

  async getProductPrice(productName: string) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    return await product.locator('.inventory_item_price').textContent();
  }

  async getCartItemCount() {
    const count = await this.shoppingCartBadge.textContent();
    return count ? parseInt(count) : 0;
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async sortBy(sortOption: string) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async getProductNames() {
    const products = this.page.locator('.inventory_item_name');
    const count = await products.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = await products.nth(i).textContent();
      if (name) names.push(name);
    }
    return names;
  }
}

