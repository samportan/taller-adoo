import { Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly title;
  readonly items;
  readonly subtotal;
  readonly tax;
  readonly total;
  readonly finishButton;
  readonly cancelButton;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.items = page.locator('.cart_item');
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async getItemCount() {
    return await this.items.count();
  }

  async getSubtotal() {
    const text = await this.subtotal.textContent();
    return text;
  }

  async getTotal() {
    const text = await this.total.textContent();
    return text;
  }

  async finish() {
    await this.finishButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}

