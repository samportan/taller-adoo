import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';

/**
 * ESTE ARCHIVO ESTÁ DESHABILITADO (renombrado con .skip.ts)
 * 
 * Para activar estos tests que fallan:
 * 1. Renombra este archivo a: failing-tests.spec.ts
 * 2. Esto hará que la pipeline falle en GitHub Actions
 */

test.describe.skip('Tests de SauceDemo que Fallan Intencionalmente (DESHABILITADOS)', () => {
  
  test('❌ Este test falla: credenciales incorrectas esperando éxito', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong_user', 'wrong_password');
    
    // Este test fallará porque esperamos estar en productos pero las credenciales son incorrectas
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('❌ Este test falla: elemento que no existe en SauceDemo', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Este test fallará porque el elemento no existe
    await expect(page.locator('#elemento-que-no-existe')).toBeVisible();
  });

  test('❌ Este test falla: texto incorrecto en página de productos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Este test fallará porque el texto no existe
    await expect(productsPage.title).toContainText('Texto Incorrecto');
  });

  test('❌ Este test falla: producto que no existe', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Este test fallará porque el producto no existe
    await productsPage.addProductToCart('Producto Que No Existe');
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('❌ Este test falla: URL incorrecta después del login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Este test fallará porque la URL no contiene "google"
    await expect(page).toHaveURL(/google/);
  });

  test('❌ Este test falla: carrito con productos sin agregar', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Este test fallará porque no agregamos productos pero esperamos que haya 5
    const cartCount = await productsPage.getCartItemCount();
    expect(cartCount).toBe(5);
  });
});

