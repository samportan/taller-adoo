# Instrucciones para Subir el Proyecto a GitHub

## 📤 Pasos para Subir el Proyecto

### 1. Inicializar Git (si aún no está inicializado)

```bash
git init
```

### 2. Agregar todos los archivos al staging

```bash
git add .
```

### 3. Hacer el primer commit

```bash
git commit -m "Initial commit: Configuración de Playwright con CI/CD"
```

### 4. Crear un repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Haz clic en el botón "+" en la esquina superior derecha
3. Selecciona "New repository"
4. Dale un nombre a tu repositorio (ej: `taller-playwright-cicd`)
5. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
6. Haz clic en "Create repository"

### 5. Conectar el repositorio local con GitHub

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

Reemplaza `TU_USUARIO` y `TU_REPOSITORIO` con tus datos reales.

### 6. Subir el código a GitHub

```bash
git branch -M main
git push -u origin main
```

## ✅ Verificar que GitHub Actions Funciona

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña "Actions"
3. Deberías ver que el workflow "Playwright Tests" se está ejecutando
4. Espera a que termine (puede tardar unos minutos la primera vez)
5. Si todo está bien, verás una marca verde ✓

## 🔄 Hacer Cambios y Ver CI/CD en Acción

1. Haz algún cambio en los tests o código
2. Haz commit y push:
```bash
git add .
git commit -m "Descripción de tus cambios"
git push
```
3. Ve a la pestaña "Actions" en GitHub
4. Verás que el workflow se ejecuta automáticamente

## 📊 Ver Reportes de Tests

Después de que el workflow termine:
1. Ve a la pestaña "Actions"
2. Haz clic en el workflow que se ejecutó
3. Haz clic en el job "test"
4. Descarga el artifact "playwright-report" para ver el reporte HTML completo

## 🐛 Solución de Problemas

### Si el workflow falla:
- Revisa los logs en la pestaña "Actions"
- Verifica que todos los tests pasen localmente: `npm test`
- Asegúrate de que las URLs en los tests sean accesibles

### Si no puedes hacer push:
- Verifica que tengas permisos en el repositorio
- Asegúrate de estar autenticado: `git config --global user.name "Tu Nombre"`
- Verifica la URL del remote: `git remote -v`

