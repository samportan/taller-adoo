import { test, expect } from '@playwright/test';

/**
 * ESTE ARCHIVO ESTÁ DESHABILITADO (renombrado con .skip.ts)
 * 
 * Para activar estos tests que fallan:
 * 1. Renombra este archivo a: failing-tests.spec.ts
 * 2. Esto hará que la pipeline falle en GitHub Actions
 */

test.describe.skip('Tests que Fallan Intencionalmente (DESHABILITADOS)', () => {
  
  test('❌ Este test falla: título incorrecto', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Error/);
  });

  test('❌ Este test falla: elemento que no existe', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.locator('#no-existe')).toBeVisible();
  });

  test('❌ Este test falla: texto incorrecto', async ({ page }) => {
    await page.goto('https://example.com');
    const heading = page.locator('h1');
    await expect(heading).toContainText('Texto Incorrecto');
  });

  test('❌ Este test falla: timeout esperando elemento', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.locator('.elemento-que-nunca-existe')).toBeVisible({ timeout: 2000 });
  });

  test('❌ Este test falla: URL incorrecta', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveURL(/google/);
  });
});

