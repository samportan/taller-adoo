import { defineConfig, devices } from '@playwright/test';

/**
 * Configuración de Playwright
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Ejecutar tests en paralelo */
  fullyParallel: true,
  /* Fallar el build si accidentalmente dejaste test.only en el código fuente */
  forbidOnly: !!process.env.CI,
  /* Reintentar en CI si los tests fallan */
  retries: process.env.CI ? 2 : 0,
  /* Opciones para ejecutar tests en modo headless */
  workers: process.env.CI ? 1 : undefined,
  /* Configuración de reporter */
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  /* Configuración compartida para todos los proyectos */
  use: {
    /* Recopilar trace cuando se reintenta el test fallido. Ver https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    /* Timeout para acciones */
    actionTimeout: 10000,
    /* Timeout para navegación */
    navigationTimeout: 30000,
  },

  /* Configurar proyectos para navegadores principales */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test en dispositivos móviles */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Ejecutar el servidor de desarrollo local antes de iniciar los tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

