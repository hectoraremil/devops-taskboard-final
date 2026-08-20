# Manual de Operaciones

## 1. Verificar disponibilidad

Abrir:

```text
REEMPLAZAR_CON_URL_DE_RENDER/health
```

Respuesta normal:

```json
{
  "status": "ok",
  "database": "connected",
  "uptime": 120
}
```

Si el estado es `ok`, el backend está disponible y MongoDB está conectado.

## 2. Verificar funcionamiento de la aplicación

Abrir:

```text
REEMPLAZAR_CON_URL_DE_RENDER
```

Realizar una prueba funcional:

1. Crear una tarea.
2. Recargar la página.
3. Confirmar que la tarea siga almacenada.
4. Eliminar la tarea.

## 3. Revisar logs

Ruta:

```text
Render
→ Service
→ Logs
```

Los logs son generados mediante Winston.

Ejemplo:

```json
{
  "level": "info",
  "message": "http_request",
  "method": "GET",
  "path": "/api/tasks",
  "status": 200
}
```

## 4. Revisar métricas

Endpoint:

```text
REEMPLAZAR_CON_URL_DE_RENDER/metrics
```

Métricas disponibles, entre otras:

```text
process_cpu_seconds_total
process_resident_memory_bytes
nodejs_heap_size_total_bytes
http_requests_total
```

También pueden consultarse las métricas del servicio desde Render.

## 5. Revisar MongoDB Atlas

Ruta:

```text
Cluster0
→ Browse Collections
→ devops_taskboard
→ tasks
```

## 6. Revisar GitHub Actions

Ruta:

```text
GitHub
→ Repositorio
→ Actions
```

Workflow principal:

```text
DevOps TaskBoard CI/CD
```

Jobs esperados:

```text
Test and Quality
Docker and Deploy
```

## 7. Diagnosticar un pipeline fallido

Abrir el workflow fallido y revisar:

```text
Install dependencies
Static analysis
Automated tests
Login Docker Hub
Build and Push Docker Image
Deploy to Render
```

## 8. Error de ESLint

```bash
npm run lint
```

Corregir los errores y volver a subir:

```bash
git add .
git commit -m "Corrige errores de lint"
git push origin main
```

## 9. Error en pruebas

```bash
npm test
```

O por separado:

```bash
npm run test:unit
npm run test:integration
```

## 10. Error en Docker Hub

Revisar en GitHub:

```text
Settings
→ Secrets and variables
→ Actions
```

Secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

Nunca escribir el token directamente dentro del workflow.

## 11. Error en Render

Revisar:

```text
Render
→ Service
→ Events
```

y:

```text
Render
→ Service
→ Logs
```

Comprobar:

- Descarga de la imagen Docker.
- Variables de entorno.
- Conexión con MongoDB.
- Puerto de la aplicación.
- Health Check.

## 12. Error de MongoDB

Si aparece:

```text
Authentication failed
```

Revisar:

- Database User.
- Contraseña.
- `MONGODB_URI`.
- Network Access en Atlas.
- Nombre del cluster.

## 13. Variables de entorno de Render

Ruta:

```text
Render
→ Service
→ Environment
```

Comprobar:

```text
MONGODB_URI
LOG_LEVEL
```

## 14. Reiniciar o desplegar nuevamente

El flujo normal es:

```text
git push
   |
   v
GitHub Actions
   |
   v
Docker Hub
   |
   v
Render
```

También puede utilizarse un despliegue manual desde Render si es necesario.

## 15. Rollback

Las imágenes se publican utilizando el SHA del commit:

```text
usuario/devops-taskboard:<github-sha>
```

Si una versión presenta errores:

1. Identificar el último commit estable.
2. Revisar la imagen correspondiente en Docker Hub.
3. Revertir el commit problemático.

Ejemplo:

```bash
git revert ID_COMMIT
git push origin main
```

## 16. Health Check

Render utiliza:

```text
/health
```

Si la base de datos no está conectada, la aplicación puede responder con estado degradado.

## 17. Alertas

Las alertas simples pueden gestionarse mediante las notificaciones del servicio de Render para eventos como:

- Fallos de despliegue.
- Problemas de disponibilidad.
- Servicio unhealthy.

## 18. Flujo de diagnóstico recomendado

```text
1. Revisar /health
        |
        v
2. Revisar Render Logs
        |
        v
3. Revisar /metrics
        |
        v
4. Revisar MongoDB Atlas
        |
        v
5. Revisar GitHub Actions
        |
        v
6. Revisar Docker Hub
```

