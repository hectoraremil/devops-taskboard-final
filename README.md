# DevOps TaskBoard

Aplicación web desarrollada como proyecto final de DevOps para demostrar la integración de control de versiones, pruebas automatizadas, análisis estático, contenedores Docker, CI/CD, despliegue en producción y monitoreo básico.

La aplicación permite crear, consultar y eliminar tareas desde una interfaz web simple.

## Tecnologías utilizadas

- Frontend: HTML, CSS y JavaScript
- Backend: Node.js y Express
- Base de datos: MongoDB Atlas
- ODM: Mongoose
- Pruebas: Jest, Supertest y MongoDB Memory Server
- Análisis estático: ESLint
- Contenedores: Docker
- Registro de imágenes: Docker Hub
- CI/CD: GitHub Actions
- Producción: Render
- Logs: Winston y Render Logs
- Métricas: prom-client y Render Metrics
- Health Check: endpoint `/health`

## Arquitectura

```text
Usuario
   |
   v
Frontend (HTML/CSS/JS)
   |
   v
Backend Node.js + Express
   |
   v
MongoDB Atlas
```

Flujo DevOps:

```text
git push
   |
   v
GitHub
   |
   v
GitHub Actions
   |
   +--> npm ci
   +--> ESLint
   +--> Pruebas unitarias
   +--> Pruebas de integración
   |
   v
Docker Build
   |
   v
Docker Hub
   |
   v
Render
   |
   v
Producción
```

## Funcionalidades

- Crear tareas.
- Listar tareas almacenadas.
- Eliminar tareas.
- Validar datos antes de guardarlos.
- Persistir información en MongoDB Atlas.
- Consultar el estado del servicio mediante `/health`.
- Consultar métricas mediante `/metrics`.
- Registrar peticiones y errores mediante logs estructurados.

## Estructura del proyecto

```text
devops-taskboard-final/
|
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── docs/
│   ├── INSTALLATION.md
│   ├── PIPELINE.md
│   └── OPERATIONS.md
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── logger.js
│   ├── metrics.js
│   └── server.js
├── tests/
│   ├── integration/
│   └── unit/
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── eslint.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

## Variables de entorno

Crear un archivo `.env` tomando como referencia `.env.example`.

```env
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@CLUSTER.mongodb.net/devops_taskboard
LOG_LEVEL=info
```

> El archivo `.env` no debe subirse al repositorio.

## Instalación rápida

```bash
npm install
npm run lint
npm test
npm start
```

La aplicación se ejecuta por defecto en:

```text
http://localhost:3000
```

## Pruebas

Todas las pruebas:

```bash
npm test
```

Pruebas unitarias:

```bash
npm run test:unit
```

Pruebas de integración:

```bash
npm run test:integration
```

## Análisis estático

```bash
npm run lint
```

## Docker

Construir la imagen:

```bash
docker build --platform linux/amd64 -t devops-taskboard .
```

Ejecutarla:

```bash
docker run --rm -p 3000:3000 --env-file .env devops-taskboard
```

## API principal

### Obtener tareas

```http
GET /api/tasks
```

### Crear tarea

```http
POST /api/tasks
```

Ejemplo:

```json
{
  "title": "Aprender CI/CD"
}
```

### Eliminar tarea

```http
DELETE /api/tasks/:id
```

## Monitoreo

### Health Check

```http
GET /health
```

Ejemplo esperado:

```json
{
  "status": "ok",
  "database": "connected",
  "uptime": 120
}
```

### Métricas

```http
GET /metrics
```

### Logs

Los logs son generados con Winston y pueden consultarse desde Render Logs.

## Pipeline CI/CD

Cada `push` a la rama `main` ejecuta automáticamente:

1. Checkout del código.
2. Instalación de dependencias con `npm ci`.
3. Análisis estático con ESLint.
4. Pruebas automatizadas.
5. Construcción de imagen Docker.
6. Publicación en Docker Hub.
7. Despliegue automático en Render.

El despliegue depende de que las validaciones anteriores finalicen correctamente.

## Secrets utilizados

En GitHub Actions:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
RENDER_DEPLOY_HOOK_URL
```

En Render:

```text
MONGODB_URI
LOG_LEVEL
```

