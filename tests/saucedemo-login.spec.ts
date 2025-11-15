import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test.describe('SauceDemo - Login', () => {
  
  test('debería hacer login exitoso con credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verificar que se redirige a la página de productos
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('debería mostrar error con credenciales inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    
    // Verificar que se muestra mensaje de error
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('debería mostrar error con usuario bloqueado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    // Verificar que se muestra mensaje de error
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Sorry, this user has been locked out');
  });

  test('debería hacer login con usuario problemático', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('problem_user', 'secret_sauce');
    
    // Verificar que se redirige a la página de productos
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('debería hacer login con usuario de rendimiento', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    
    // Verificar que se redirige a la página de productos
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('debería validar campos requeridos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    // Intentar login sin llenar campos
    await loginPage.loginButton.click();
    
    // Verificar que se muestra mensaje de error
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username is required');
  });
});

