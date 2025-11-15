import { test, expect } from '@playwright/test';

test.describe('Tests de Google', () => {
  
  test('debería cargar la página de Google', async ({ page }) => {
    await page.goto('https://www.google.com');
    
    // Aceptar cookies si aparece el banner
    try {
      const acceptButton = page.locator('button:has-text("Aceptar todo"), button:has-text("Accept all")').first();
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
      }
    } catch (e) {
      // Si no aparece el banner, continuar
    }
    
    // Verificar que el título contiene "Google"
    await expect(page).toHaveTitle(/Google/);
  });

  test('debería realizar una búsqueda en Google', async ({ page }) => {
    await page.goto('https://www.google.com');
    
    // Aceptar cookies si aparece
    try {
      const acceptButton = page.locator('button:has-text("Aceptar todo"), button:has-text("Accept all")').first();
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
      }
    } catch (e) {
      // Continuar si no aparece
    }
    
    // Buscar el campo de búsqueda y escribir
    const searchBox = page.locator('textarea[name="q"], input[name="q"]').first();
    await searchBox.fill('Playwright testing');
    await searchBox.press('Enter');
    
    // Verificar que se muestran resultados
    await expect(page.locator('#search')).toBeVisible({ timeout: 10000 });
    
    // Verificar que los resultados contienen "Playwright"
    const results = page.locator('h3').first();
    await expect(results).toBeVisible();
  });
});

