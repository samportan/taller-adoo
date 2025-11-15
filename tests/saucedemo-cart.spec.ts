import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';

test.describe('SauceDemo - Carrito de Compras', () => {
  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Agregar productos al carrito
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.goToCart();
  });

  test('debería mostrar los productos agregados al carrito', async ({ page }) => {
    const cartPage = new CartPage(page);
    
    // Verificar que hay 2 productos en el carrito
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
    
    // Verificar que los productos están presentes
    const firstItem = await cartPage.getCartItemName(0);
    const secondItem = await cartPage.getCartItemName(1);
    
    expect(firstItem).toContain('Backpack');
    expect(secondItem).toContain('Bike Light');
  });

  test('debería remover un producto del carrito', async ({ page }) => {
    const cartPage = new CartPage(page);
    
    // Verificar que hay 2 productos
    expect(await cartPage.getCartItemCount()).toBe(2);
    
    // Remover un producto
    await cartPage.removeItem(0);
    
    // Verificar que ahora hay 1 producto
    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test('debería continuar comprando', async ({ page }) => {
    const cartPage = new CartPage(page);
    
    // Continuar comprando
    await cartPage.continueShopping();
    
    // Verificar que volvemos a la página de productos
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('debería proceder al checkout', async ({ page }) => {
    const cartPage = new CartPage(page);
    
    // Ir al checkout
    await cartPage.goToCheckout();
    
    // Verificar que estamos en la página de checkout
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await expect(page.locator('.title')).toContainText('Checkout: Your Information');
  });
});

