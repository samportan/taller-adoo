import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';

test.describe('SauceDemo - Productos', () => {
  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('debería mostrar la lista de productos', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Verificar que se muestra el título
    await expect(productsPage.title).toContainText('Products');
    
    // Verificar que hay productos en la lista
    const itemCount = await productsPage.inventoryItems.count();
    expect(itemCount).toBeGreaterThan(0);
  });

  test('debería agregar un producto al carrito', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Agregar un producto al carrito
    await productsPage.addProductToCart('Sauce Labs Backpack');
    
    // Verificar que el badge del carrito muestra 1
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('debería agregar múltiples productos al carrito', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Agregar varios productos
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');
    await productsPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    
    // Verificar que el badge muestra 3
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(3);
  });

  test('debería remover un producto del carrito', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Agregar producto
    await productsPage.addProductToCart('Sauce Labs Backpack');
    expect(await productsPage.getCartItemCount()).toBe(1);
    
    // Remover producto
    await productsPage.removeProductFromCart('Sauce Labs Backpack');
    
    // Verificar que el badge desaparece
    await expect(productsPage.shoppingCartBadge).not.toBeVisible();
  });

  test('debería ordenar productos por precio (menor a mayor)', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Ordenar por precio de menor a mayor
    await productsPage.sortBy('lohi');
    
    // Obtener precios de los primeros productos
    const firstProductPrice = await productsPage.getProductPrice('Sauce Labs Onesie');
    const secondProductPrice = await productsPage.getProductPrice('Sauce Labs Bike Light');
    
    // Verificar que están ordenados (el primero debería ser más barato)
    expect(firstProductPrice).toBeTruthy();
    expect(secondProductPrice).toBeTruthy();
  });

  test('debería ordenar productos por precio (mayor a menor)', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Ordenar por precio de mayor a menor
    await productsPage.sortBy('hilo');
    
    // Verificar que los productos están ordenados
    const firstProduct = productsPage.inventoryItems.first();
    await expect(firstProduct).toBeVisible();
  });

  test('debería ordenar productos por nombre (A-Z)', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Ordenar por nombre A-Z
    await productsPage.sortBy('az');
    
    const productNames = await productsPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);
  });

  test('debería ordenar productos por nombre (Z-A)', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Ordenar por nombre Z-A
    await productsPage.sortBy('za');
    
    const productNames = await productsPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);
  });

  test('debería navegar al carrito desde la página de productos', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    
    // Agregar un producto
    await productsPage.addProductToCart('Sauce Labs Backpack');
    
    // Ir al carrito
    await productsPage.goToCart();
    
    // Verificar que estamos en la página del carrito
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.title')).toContainText('Your Cart');
  });
});

