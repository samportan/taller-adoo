import { Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader;
  readonly completeText;
  readonly backHomeButton;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async getCompleteMessage() {
    return await this.completeHeader.textContent();
  }

  async backToProducts() {
    await this.backHomeButton.click();
  }
}

