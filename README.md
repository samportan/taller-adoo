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
├── tests/              # Tests de Playwright
├── playwright.config.ts # Configuración de Playwright
├── package.json        # Dependencias del proyecto
├── .github/
│   └── workflows/      # Workflows de GitHub Actions
└── README.md          # Este archivo
```

## 🔄 CI/CD con GitHub Actions

Los tests se ejecutan automáticamente en cada push y pull request gracias a GitHub Actions. El workflow está configurado en `.github/workflows/playwright.yml`.

### 📘 Guías Disponibles

- **[GUIA_GITHUB_PASO_A_PASO.md](GUIA_GITHUB_PASO_A_PASO.md)** - Guía completa paso a paso para configurar GitHub
- **[GUIA_PIPELINES.md](GUIA_PIPELINES.md)** - Cómo ver pipelines exitosas y fallidas
- **[INSTRUCCIONES_GITHUB.md](INSTRUCCIONES_GITHUB.md)** - Instrucciones rápidas para subir a GitHub

### 🚀 Configuración Rápida

**Opción 1: Script automatizado (Windows PowerShell)**
```powershell
.\setup-git.ps1
```

**Opción 2: Manual**
```bash
git init
git add .
git commit -m "Initial commit: Configuración de Playwright con CI/CD"
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

### Ver Pipelines Exitosas y Fallidas

**Resumen rápido:**
- ✅ **Pipeline exitosa (actual):** Todos los tests pasan
- ❌ **Pipeline fallida:** Renombra `tests/failing-tests.spec.skip.ts` a `failing-tests.spec.ts`

Para más detalles, consulta **[GUIA_PIPELINES.md](GUIA_PIPELINES.md)**

## 📚 Recursos

- [Documentación de Playwright](https://playwright.dev/)
- [GitHub Actions](https://docs.github.com/en/actions)

