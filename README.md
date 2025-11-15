# Taller de Playwright con CI/CD

Este proyecto es un taller práctico sobre cómo usar Playwright para pruebas automatizadas y configurar CI/CD con GitHub Actions.

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Git

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd taller-adoo
```

2. Instalar dependencias:
```bash
npm install
```

3. Instalar los navegadores de Playwright:
```bash
npx playwright install
```

## 🧪 Ejecutar Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo UI (interfaz gráfica)
```bash
npm run test:ui
```

### Ejecutar tests en modo headed (con navegador visible)
```bash
npm run test:headed
```

### Ejecutar tests en modo debug
```bash
npm run test:debug
```

### Ver reporte de tests
```bash
npm run test:report
```

## 📁 Estructura del Proyecto

```
taller-adoo/
├── tests/
│   ├── pages/                    # Page Object Models (POM)
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── CheckoutOverviewPage.ts
│   │   └── CheckoutCompletePage.ts
│   ├── saucedemo-login.spec.ts   # Tests de login
│   ├── saucedemo-products.spec.ts # Tests de productos
│   ├── saucedemo-cart.spec.ts    # Tests de carrito
│   ├── saucedemo-checkout.spec.ts # Tests de checkout
│   ├── saucedemo-logout.spec.ts  # Tests de logout
│   └── failing-tests.spec.skip.ts # Tests que fallan (deshabilitados)
├── playwright.config.ts          # Configuración de Playwright
├── package.json                  # Dependencias del proyecto
├── .github/
│   └── workflows/                # Workflows de GitHub Actions
└── README.md                     # Este archivo
```

## 🎯 Tests Implementados

Este proyecto contiene tests automatizados para **SauceDemo** usando el patrón **Page Object Model (POM)**:

### ✅ Tests de Login
- Login exitoso con credenciales válidas
- Validación de credenciales inválidas
- Usuario bloqueado
- Usuarios especiales (problem_user, performance_glitch_user)
- Validación de campos requeridos

### ✅ Tests de Productos
- Visualización de lista de productos
- Agregar productos al carrito
- Remover productos del carrito
- Ordenar productos (precio, nombre)
- Navegación al carrito

### ✅ Tests de Carrito
- Visualización de productos en el carrito
- Remover productos del carrito
- Continuar comprando
- Proceder al checkout

### ✅ Tests de Checkout
- Completar checkout exitosamente
- Validación de información requerida
- Cancelar checkout
- Ver resumen del pedido
- Navegación después del checkout

### ✅ Tests de Logout
- Logout exitoso
- Validación de acceso después del logout

## 🔄 CI/CD con GitHub Actions

Los tests se ejecutan automáticamente en cada push y pull request gracias a GitHub Actions. El workflow está configurado en `.github/workflows/playwright.yml`.

### Ver Pipelines Exitosas y Fallidas

- ✅ **Pipeline exitosa (actual):** Todos los tests pasan
- ❌ **Pipeline fallida:** Renombra `tests/failing-tests.spec.skip.ts` a `failing-tests.spec.ts`

## 📚 Recursos

- [Documentación de Playwright](https://playwright.dev/)
- [GitHub Actions](https://docs.github.com/en/actions)

