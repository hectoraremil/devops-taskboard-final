# Documentación del Pipeline CI/CD

## Objetivo

Automatizar la validación, construcción y despliegue de la aplicación DevOps TaskBoard desde GitHub hasta producción.

## Flujo general

```text
Desarrollador
      |
      v
git push
      |
      v
GitHub
      |
      v
GitHub Actions
      |
      v
npm ci
      |
      v
ESLint
      |
      v
Pruebas automatizadas
      |
      v
Docker Build
      |
      v
Docker Hub
      |
      v
Render Deploy Hook
      |
      v
Producción
```

## Archivo del workflow

```text
.github/workflows/ci-cd.yml
```

## Disparadores

El pipeline se ejecuta en:

- `push` a la rama `main`.
- `pull_request` dirigido a `main`.

## Job de Integración Continua

El job de CI valida la calidad del código.

### Checkout

Descarga el código del repositorio.

### Configuración de Node.js

Prepara el entorno de ejecución.

### Instalación de dependencias

```bash
npm ci
```

Se utiliza `npm ci` para instalar dependencias de forma reproducible a partir de `package-lock.json`.

### Análisis estático

```bash
npm run lint
```

ESLint revisa el código antes de continuar.

### Pruebas automatizadas

```bash
npm test
```

Se ejecutan:

- Pruebas unitarias.
- Pruebas de integración.

Si falla el lint o alguna prueba, el pipeline se detiene y no se despliega.

## Job de Despliegue

El job de despliegue solamente se ejecuta si:

1. El evento es un `push`.
2. La rama es `main`.
3. El job de CI terminó correctamente.

## Docker Build

La imagen se construye para:

```text
linux/amd64
```

## Docker Hub

GitHub Actions inicia sesión mediante secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

La imagen se publica con dos etiquetas:

```text
usuario/devops-taskboard:latest
usuario/devops-taskboard:<github-sha>
```

La etiqueta `latest` identifica la versión más reciente.

La etiqueta basada en SHA permite trazabilidad entre commit e imagen.

## Despliegue en Render

Después de publicar la imagen, GitHub Actions llama al Deploy Hook de Render.

Secret utilizado:

```text
RENDER_DEPLOY_HOOK_URL
```

Render obtiene la imagen desde Docker Hub e inicia el despliegue.

## Variables de producción

En Render se configuran:

```text
MONGODB_URI
LOG_LEVEL
```

## Seguridad

Las credenciales no se escriben directamente en el repositorio.

GitHub Secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
RENDER_DEPLOY_HOOK_URL
```

Render Environment:

```text
MONGODB_URI
LOG_LEVEL
```

El archivo `.env` está excluido mediante `.gitignore`.

## Estrategia de fallos

```text
npm ci falla
     |
     X
No hay despliegue

ESLint falla
     |
     X
No hay despliegue

Tests fallan
     |
     X
No hay despliegue

Todo correcto
     |
     v
Docker Hub
     |
     v
Render
```

## Beneficios

- Integración continua automática.
- Detección temprana de errores.
- Menor intervención manual.
- Imágenes Docker versionadas.
- Trazabilidad por commit.
- Despliegue automático.
- Separación entre CI y CD.
- Credenciales protegidas mediante secrets.
