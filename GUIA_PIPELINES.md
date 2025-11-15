# 🚀 Guía: Cómo Ver Pipelines Exitosas y Fallidas

Esta guía te explica cómo hacer que tu pipeline de GitHub Actions muestre tanto ejecuciones exitosas como fallidas.

## ✅ Pipeline Exitosa (Estado Actual)

**Por defecto, todos los tests están configurados para pasar.** Esto significa que cuando subas el código a GitHub, verás una pipeline exitosa (✓ verde).

### Tests que se ejecutan actualmente:
- `tests/example.spec.ts` - Tests básicos que pasan
- `tests/google.spec.ts` - Tests de Google que pasan

## ❌ Cómo Hacer que la Pipeline Falle

Para ver una pipeline fallida, tienes dos opciones:

### Opción 1: Activar los tests que fallan (Recomendado)

1. **Renombra el archivo:**
   ```bash
   # En Windows PowerShell:
   Rename-Item tests\failing-tests.spec.skip.ts failing-tests.spec.ts
   
   # O en Git Bash/CMD:
   ren tests\failing-tests.spec.skip.ts failing-tests.spec.ts
   ```

2. **Haz commit y push:**
   ```bash
   git add .
   git commit -m "Activar tests que fallan para demostración"
   git push
   ```

3. **Ve a GitHub Actions** y verás que la pipeline falla (✗ rojo)

4. **Para volver a tener pipeline exitosa:**
   ```bash
   # Renombra de vuelta:
   Rename-Item tests\failing-tests.spec.ts failing-tests.spec.skip.ts
   git add .
   git commit -m "Desactivar tests que fallan - pipeline exitosa"
   git push
   ```

### Opción 2: Modificar un test existente para que falle

Edita `tests/example.spec.ts` y cambia una expectativa para que falle:

```typescript
// Cambiar esta línea (línea 10):
await expect(page).toHaveTitle(/Example/);

// Por esta (que fallará):
await expect(page).toHaveTitle(/Error/);
```

## 📊 Qué Verás en GitHub Actions

### Pipeline Exitosa (✓ Verde):
- Estado: ✅ Success (verde)
- Todos los tests pasan
- Puedes descargar el reporte HTML
- No hay errores en los logs

### Pipeline Fallida (✗ Rojo):
- Estado: ❌ Failure (rojo)
- Algunos tests fallan
- Puedes ver:
  - Screenshots de los fallos
  - Videos de los tests que fallaron
  - Traces detallados
  - Logs con el error específico
- El reporte HTML muestra qué tests fallaron y por qué

## 🎯 Ejemplo de Flujo Completo

### Paso 1: Subir código inicial (Pipeline Exitosa)
```bash
git add .
git commit -m "Configuración inicial - tests pasando"
git push
```
**Resultado:** ✅ Pipeline verde en GitHub Actions

### Paso 2: Activar tests que fallan (Pipeline Fallida)
```bash
Rename-Item tests\failing-tests.spec.skip.ts failing-tests.spec.ts
git add .
git commit -m "Activar tests que fallan"
git push
```
**Resultado:** ❌ Pipeline roja en GitHub Actions

### Paso 3: Corregir y volver a pipeline exitosa
```bash
Rename-Item tests\failing-tests.spec.ts failing-tests.spec.skip.ts
git add .
git commit -m "Corregir tests - pipeline exitosa"
git push
```
**Resultado:** ✅ Pipeline verde nuevamente

## 📸 Ver Detalles de los Fallos

Cuando una pipeline falla:

1. Ve a la pestaña **Actions** en GitHub
2. Haz clic en el workflow que falló
3. Haz clic en el job **test**
4. Expande los logs para ver:
   - Qué test falló
   - Por qué falló
   - Screenshot del momento del fallo
5. Descarga los artifacts:
   - `playwright-report` - Reporte HTML completo
   - `test-results` - Screenshots, videos y traces

## 💡 Tips

- Los tests que fallan están diseñados para fallar intencionalmente
- Puedes activar/desactivar fácilmente renombrando el archivo
- Playwright automáticamente ignora archivos que terminan en `.skip.ts`
- En CI, los tests se reintentan 2 veces antes de marcar como fallido (configurado en `playwright.config.ts`)

