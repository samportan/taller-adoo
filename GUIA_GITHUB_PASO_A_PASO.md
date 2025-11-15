# 📘 Guía Completa: Configuración en GitHub - Paso a Paso

Esta guía te lleva paso a paso por todo el proceso de configuración en GitHub según las mejores prácticas de CI/CD.

## 🎯 Objetivo

Configurar un repositorio en GitHub con GitHub Actions para ejecutar tests de Playwright automáticamente y ver pipelines exitosas y fallidas.

---

## 📋 PASO 1: Preparar el Proyecto Localmente

### 1.1 Verificar que tienes todos los archivos

Asegúrate de tener estos archivos en tu proyecto:
- ✅ `package.json`
- ✅ `playwright.config.ts`
- ✅ `tests/` (con tus tests)
- ✅ `.github/workflows/playwright.yml`
- ✅ `.gitignore`

### 1.2 Instalar dependencias (si aún no lo has hecho)

```powershell
npm install
npx playwright install
```

### 1.3 Probar los tests localmente

```powershell
npm test
```

**Importante:** Asegúrate de que los tests pasen antes de subirlos a GitHub.

---

## 📋 PASO 2: Inicializar Git Localmente

### 2.1 Inicializar el repositorio Git

```powershell
git init
```

### 2.2 Configurar tu identidad (si es la primera vez)

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
```

### 2.3 Agregar todos los archivos

```powershell
git add .
```

### 2.4 Hacer el primer commit

```powershell
git commit -m "Initial commit: Configuración de Playwright con CI/CD"
```

---

## 📋 PASO 3: Crear el Repositorio en GitHub

### 3.1 Ir a GitHub

1. Abre tu navegador y ve a: **https://github.com**
2. Inicia sesión con tu cuenta de GitHub

### 3.2 Crear un nuevo repositorio

1. Haz clic en el botón **"+"** en la esquina superior derecha
2. Selecciona **"New repository"**

### 3.3 Configurar el repositorio

**Configuración recomendada:**
- **Repository name:** `taller-playwright-cicd` (o el nombre que prefieras)
- **Description:** "Taller de Playwright con CI/CD usando GitHub Actions"
- **Visibility:** 
  - ✅ **Public** (si quieres que otros lo vean)
  - ✅ **Private** (si quieres mantenerlo privado)
- ⚠️ **IMPORTANTE:** 
  - ❌ **NO** marques "Add a README file" (ya tenemos uno)
  - ❌ **NO** marques "Add .gitignore" (ya tenemos uno)
  - ❌ **NO** marques "Choose a license" (a menos que quieras agregar uno)

### 3.4 Crear el repositorio

Haz clic en el botón verde **"Create repository"**

---

## 📋 PASO 4: Conectar el Repositorio Local con GitHub

### 4.1 Copiar la URL del repositorio

Después de crear el repositorio, GitHub te mostrará una página con instrucciones. 
**Copia la URL HTTPS** (se verá algo como: `https://github.com/TU_USUARIO/taller-playwright-cicd.git`)

### 4.2 Agregar el remote

En tu terminal PowerShell, ejecuta:

```powershell
git remote add origin https://github.com/TU_USUARIO/taller-playwright-cicd.git
```

**Reemplaza `TU_USUARIO` y `taller-playwright-cicd` con tus valores reales.**

### 4.3 Verificar que se agregó correctamente

```powershell
git remote -v
```

Deberías ver algo como:
```
origin  https://github.com/TU_USUARIO/taller-playwright-cicd.git (fetch)
origin  https://github.com/TU_USUARIO/taller-playwright-cicd.git (push)
```

---

## 📋 PASO 5: Subir el Código a GitHub

### 5.1 Cambiar a la rama main (si es necesario)

```powershell
git branch -M main
```

### 5.2 Subir el código

```powershell
git push -u origin main
```

**Nota:** Si es la primera vez, GitHub te pedirá autenticarte. Sigue las instrucciones en pantalla.

---

## 📋 PASO 6: Verificar GitHub Actions

### 6.1 Ir a la pestaña Actions

1. En tu repositorio de GitHub, haz clic en la pestaña **"Actions"** (arriba del repositorio)

### 6.2 Ver el workflow ejecutándose

Deberías ver:
- ✅ Un workflow llamado **"Playwright Tests"** en ejecución
- ✅ Un indicador amarillo 🟡 que dice "In progress" o "Running"

### 6.3 Esperar a que termine

- La primera vez puede tardar **3-5 minutos** (instala dependencias y navegadores)
- Verás los pasos ejecutándose en tiempo real:
  1. ✅ Checkout code
  2. ✅ Setup Node.js
  3. ✅ Install dependencies
  4. ✅ Install Playwright Browsers
  5. ✅ Run Playwright tests

### 6.4 Ver el resultado

**Si todo salió bien:**
- ✅ Verás una marca verde ✓
- ✅ Estado: **"Success"**
- ✅ Puedes hacer clic para ver los detalles

**Si algo falló:**
- ❌ Verás una X roja
- ❌ Estado: **"Failure"**
- ✅ Haz clic para ver qué falló en los logs

---

## 📋 PASO 7: Ver los Reportes y Artifacts

### 7.1 Acceder a los artifacts

1. Ve a la pestaña **"Actions"**
2. Haz clic en el workflow que se ejecutó
3. Haz clic en el job **"test"**
4. Desplázate hacia abajo hasta la sección **"Artifacts"**

### 7.2 Descargar el reporte

Verás dos artifacts disponibles:
- 📊 **playwright-report** - Reporte HTML completo de los tests
- 📁 **test-results** - Screenshots, videos y traces de los tests

**Para descargar:**
1. Haz clic en el artifact que quieras
2. Se descargará un archivo ZIP
3. Descomprime el ZIP
4. Abre `index.html` en el navegador (para el reporte)

---

## 📋 PASO 8: Probar Pipeline Fallida (Opcional)

Para ver cómo se ve una pipeline fallida:

### 8.1 Activar los tests que fallan

```powershell
Rename-Item tests\failing-tests.spec.skip.ts failing-tests.spec.ts
```

### 8.2 Hacer commit y push

```powershell
git add .
git commit -m "Activar tests que fallan para demostración"
git push
```

### 8.3 Ver la pipeline fallida

1. Ve a **Actions** en GitHub
2. Verás un nuevo workflow ejecutándose
3. Esta vez verás ❌ **Failure** (rojo)
4. Haz clic para ver qué tests fallaron y por qué

### 8.4 Ver screenshots y videos de los fallos

En los artifacts de la pipeline fallida encontrarás:
- 📸 Screenshots de los momentos en que fallaron los tests
- 🎥 Videos de los tests que fallaron
- 📋 Traces detallados para debugging

### 8.5 Volver a pipeline exitosa

```powershell
Rename-Item tests\failing-tests.spec.ts failing-tests.spec.skip.ts
git add .
git commit -m "Corregir tests - pipeline exitosa"
git push
```

---

## 📋 PASO 9: Configuraciones Adicionales en GitHub

### 9.1 Agregar descripción al repositorio

1. Ve a la página principal de tu repositorio
2. Haz clic en el ícono de engranaje ⚙️ junto a "About"
3. Agrega una descripción: "Taller de Playwright con CI/CD"
4. Agrega temas (opcional): `playwright`, `testing`, `cicd`, `github-actions`

### 9.2 Configurar branch protection (Opcional)

Para proteger la rama main:
1. Ve a **Settings** → **Branches**
2. Haz clic en **"Add branch protection rule"**
3. Escribe `main` en el campo
4. Marca **"Require status checks to pass before merging"**
5. Selecciona el workflow de Playwright
6. Haz clic en **"Create"**

### 9.3 Agregar badge de estado (Opcional)

En tu README.md, puedes agregar un badge que muestre el estado de los tests:

```markdown
![Playwright Tests](https://github.com/TU_USUARIO/taller-playwright-cicd/actions/workflows/playwright.yml/badge.svg)
```

---

## 🎯 Resumen de Comandos Rápidos

```powershell
# 1. Inicializar Git
git init
git add .
git commit -m "Initial commit: Configuración de Playwright con CI/CD"

# 2. Conectar con GitHub (reemplaza la URL)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 3. Subir código
git branch -M main
git push -u origin main

# 4. Para futuros cambios
git add .
git commit -m "Descripción del cambio"
git push
```

---

## ❓ Solución de Problemas Comunes

### Problema: "fatal: not a git repository"
**Solución:** Ejecuta `git init` primero

### Problema: "remote origin already exists"
**Solución:** 
```powershell
git remote remove origin
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

### Problema: "Permission denied" al hacer push
**Solución:** 
- Verifica que estés autenticado en GitHub
- Usa un Personal Access Token si es necesario
- Verifica que tengas permisos de escritura en el repositorio

### Problema: El workflow no se ejecuta
**Solución:**
- Verifica que el archivo `.github/workflows/playwright.yml` existe
- Verifica que el archivo esté en la rama `main` o `master`
- Verifica la sintaxis YAML del workflow

### Problema: Tests fallan en GitHub pero pasan localmente
**Solución:**
- Verifica que las URLs en los tests sean accesibles públicamente
- Revisa los logs en GitHub Actions para ver el error específico
- Asegúrate de que todas las dependencias estén en `package.json`

---

## ✅ Checklist Final

Antes de considerar que todo está listo, verifica:

- [ ] Repositorio creado en GitHub
- [ ] Código subido exitosamente
- [ ] Workflow de GitHub Actions se ejecuta automáticamente
- [ ] Pipeline exitosa (verde ✓) se muestra en Actions
- [ ] Puedes descargar y ver los reportes HTML
- [ ] Has probado activar/desactivar tests que fallan
- [ ] Has visto una pipeline fallida (rojo ✗)
- [ ] README.md está actualizado

---

¡Felicidades! 🎉 Ya tienes tu proyecto de Playwright configurado con CI/CD en GitHub Actions.

