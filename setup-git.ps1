# Script de ayuda para configurar Git y subir a GitHub
# Ejecuta este script en PowerShell: .\setup-git.ps1

Write-Host "🚀 Configuración de Git para el proyecto Playwright" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git no está instalado. Por favor instálalo primero." -ForegroundColor Red
    exit 1
}

# Verificar si ya es un repositorio Git
if (Test-Path .git) {
    Write-Host "⚠️  Ya existe un repositorio Git en este directorio." -ForegroundColor Yellow
    $continuar = Read-Host "¿Deseas continuar de todas formas? (s/n)"
    if ($continuar -ne "s") {
        exit 0
    }
} else {
    Write-Host "📦 Inicializando repositorio Git..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Repositorio Git inicializado" -ForegroundColor Green
}

# Verificar configuración de usuario
$userName = git config user.name
$userEmail = git config user.email

if (-not $userName -or -not $userEmail) {
    Write-Host ""
    Write-Host "⚠️  No se ha configurado el usuario de Git" -ForegroundColor Yellow
    $configurar = Read-Host "¿Deseas configurarlo ahora? (s/n)"
    
    if ($configurar -eq "s") {
        $nombre = Read-Host "Ingresa tu nombre"
        $email = Read-Host "Ingresa tu email"
        git config --global user.name $nombre
        git config --global user.email $email
        Write-Host "✅ Usuario configurado" -ForegroundColor Green
    }
}

# Agregar archivos
Write-Host ""
Write-Host "📝 Agregando archivos al staging..." -ForegroundColor Cyan
git add .
Write-Host "✅ Archivos agregados" -ForegroundColor Green

# Hacer commit
Write-Host ""
Write-Host "💾 Creando commit inicial..." -ForegroundColor Cyan
$mensajeCommit = "Initial commit: Configuración de Playwright con CI/CD"
git commit -m $mensajeCommit
Write-Host "✅ Commit creado" -ForegroundColor Green

# Verificar si ya existe un remote
$remoteExists = git remote | Select-String -Pattern "origin" -Quiet

if (-not $remoteExists) {
    Write-Host ""
    Write-Host "🔗 Configuración del repositorio remoto en GitHub" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Para conectar con GitHub, necesitas:" -ForegroundColor Yellow
    Write-Host "1. Crear un repositorio en GitHub (https://github.com/new)" -ForegroundColor White
    Write-Host "2. Copiar la URL HTTPS del repositorio" -ForegroundColor White
    Write-Host ""
    $urlRepo = Read-Host "Ingresa la URL del repositorio (ej: https://github.com/usuario/repo.git)"
    
    if ($urlRepo) {
        git remote add origin $urlRepo
        Write-Host "✅ Remote 'origin' agregado" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "📤 ¿Deseas subir el código ahora? (s/n)" -ForegroundColor Cyan
        $subir = Read-Host
        
        if ($subir -eq "s") {
            Write-Host ""
            Write-Host "📤 Subiendo código a GitHub..." -ForegroundColor Cyan
            git branch -M main
            git push -u origin main
            Write-Host ""
            Write-Host "✅ ¡Código subido exitosamente!" -ForegroundColor Green
            Write-Host ""
            Write-Host "🎉 Próximos pasos:" -ForegroundColor Cyan
            Write-Host "1. Ve a tu repositorio en GitHub" -ForegroundColor White
            Write-Host "2. Haz clic en la pestaña 'Actions'" -ForegroundColor White
            Write-Host "3. Verás el workflow de Playwright ejecutándose" -ForegroundColor White
        }
    }
} else {
    Write-Host ""
    Write-Host "✅ Ya existe un remote 'origin' configurado" -ForegroundColor Green
    Write-Host "Para subir cambios, ejecuta:" -ForegroundColor Yellow
    Write-Host "  git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "📚 Para más información, consulta: GUIA_GITHUB_PASO_A_PASO.md" -ForegroundColor Cyan
Write-Host ""

