import { test, expect } from '@playwright/test';

test.describe('Ejemplos de Tests con Playwright', () => {
  
  test('debería cargar la página de ejemplo', async ({ page }) => {
    // Navegar a una página de ejemplo (puedes cambiar la URL)
    await page.goto('https://example.com');
    
    // Verificar que el título contiene "Example"
    await expect(page).toHaveTitle(/Example/);
  });

  test('debería verificar el contenido de la página', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Verificar que existe un elemento con el texto "Example Domain"
    const heading = page.locator('h1');
    await expect(heading).toContainText('Example Domain');
  });

  test('debería hacer clic en un enlace', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Buscar y hacer clic en el enlace "More information..."
    const link = page.locator('a[href*="iana.org"]');
    await expect(link).toBeVisible();
    await link.click();
    
    // Verificar que se navegó a la nueva página
    await expect(page).toHaveURL(/iana/);
  });

  test('debería verificar que los elementos están visibles', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Verificar que varios elementos están presentes
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('p')).toBeVisible();
    await expect(page.locator('a')).toBeVisible();
  });

  test('debería tomar una captura de pantalla', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Tomar una captura de pantalla
    await page.screenshot({ path: 'test-results/screenshot.png', fullPage: true });
    
    // Verificar que la página se cargó correctamente
    await expect(page.locator('h1')).toBeVisible();
  });
});

