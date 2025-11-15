import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';

test.describe('SauceDemo - Logout', () => {
  
  test('debería hacer logout exitosamente', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    // Hacer login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verificar que estamos en la página de productos
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Hacer logout
    await productsPage.logout();
    
    // Verificar que volvemos a la página de login
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('debería requerir login después del logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    // Hacer login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Hacer logout
    await productsPage.logout();
    
    // Intentar acceder directamente a la página de productos
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    // Verificar que se redirige al login
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});

