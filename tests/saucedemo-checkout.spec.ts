import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutOverviewPage } from './pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from './pages/CheckoutCompletePage';

test.describe('SauceDemo - Proceso de Checkout', () => {
  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Agregar producto y ir al checkout
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    
    const cartPage = new CartPage(page);
    await cartPage.goToCheckout();
  });

  test('debería completar el checkout exitosamente', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    // Llenar información de checkout
    await checkoutPage.fillCheckoutInfo('Juan', 'Pérez', '12345');
    await checkoutPage.continue();
    
    // Verificar que estamos en la página de resumen
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(checkoutOverviewPage.title).toContainText('Checkout: Overview');
    
    // Verificar que se muestra el producto
    const itemCount = await checkoutOverviewPage.getItemCount();
    expect(itemCount).toBe(1);
    
    // Finalizar compra
    await checkoutOverviewPage.finish();
    
    // Verificar que la compra se completó
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    const completeMessage = await checkoutCompletePage.getCompleteMessage();
    expect(completeMessage).toContain('Thank you for your order!');
  });

  test('debería mostrar error si falta información en el checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    // Intentar continuar sin llenar los campos
    await checkoutPage.continue();
    
    // Verificar que se muestra mensaje de error
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('First Name is required');
  });

  test('debería cancelar el checkout y volver al carrito', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    
    // Cancelar checkout
    await checkoutPage.cancel();
    
    // Verificar que volvemos al carrito
    await expect(page).toHaveURL(/.*cart.html/);
  });

  test('debería mostrar el resumen correcto del pedido', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    
    // Llenar información y continuar
    await checkoutPage.fillCheckoutInfo('María', 'González', '54321');
    await checkoutPage.continue();
    
    // Verificar que se muestra el subtotal
    const subtotal = await checkoutOverviewPage.getSubtotal();
    expect(subtotal).toContain('Item total');
    
    // Verificar que se muestra el total
    const total = await checkoutOverviewPage.getTotal();
    expect(total).toContain('Total');
  });

  test('debería poder volver a productos desde checkout completo', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    // Completar el checkout
    await checkoutPage.fillCheckoutInfo('Carlos', 'López', '67890');
    await checkoutPage.continue();
    await checkoutOverviewPage.finish();
    
    // Volver a productos
    await checkoutCompletePage.backToProducts();
    
    // Verificar que estamos en la página de productos
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});

