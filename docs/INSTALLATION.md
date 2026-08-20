# Guía de Instalación

## 1. Requisitos

Para ejecutar el proyecto se necesita:

- Git
- Node.js
- npm
- Docker
- Cuenta de MongoDB Atlas
- Acceso al repositorio GitHub

También puede trabajarse completamente desde GitHub Codespaces.

## 2. Clonar el repositorio

```bash
git clone REEMPLAZAR_CON_URL_DEL_REPOSITORIO
cd devops-taskboard-final
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@CLUSTER.mongodb.net/devops_taskboard
LOG_LEVEL=info
```

Variables:

- `PORT`: puerto de ejecución local.
- `MONGODB_URI`: cadena de conexión a MongoDB Atlas.
- `LOG_LEVEL`: nivel de logs generado por Winston.

## 5. Base de datos

La aplicación utiliza MongoDB Atlas.

Base de datos:

```text
devops_taskboard
```

Colección principal:

```text
tasks
```

## 6. Ejecutar análisis estático

```bash
npm run lint
```

## 7. Ejecutar pruebas

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

## 8. Ejecutar la aplicación

```bash
npm start
```

Salida esperada:

```text
MongoDB conectado correctamente
Servidor ejecutándose en puerto 3000
```

Abrir:

```text
http://localhost:3000
```

## 9. Verificar Health Check

Abrir:

```text
http://localhost:3000/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "database": "connected",
  "uptime": 20
}
```

## 10. Consultar métricas

Abrir:

```text
http://localhost:3000/metrics
```

## 11. Construir la imagen Docker

```bash
docker build --platform linux/amd64 -t devops-taskboard .
```

## 12. Ejecutar con Docker

```bash
docker run --rm -p 3000:3000 --env-file .env devops-taskboard
```

## 13. Ejecutar desde GitHub Codespaces

Desde GitHub:

```text
Code
→ Codespaces
→ Create codespace on main
```

En la terminal:

```bash
npm install
npm run lint
npm test
npm start
```

Abrir el puerto `3000` desde la pestaña `PORTS`.

## 14. Problemas comunes

### Error de autenticación MongoDB

Si aparece:

```text
Authentication failed
```

Revisar:

- Usuario de MongoDB Atlas.
- Contraseña.
- Cadena `MONGODB_URI`.
- Network Access.
- Database User.

### No existe `MONGODB_URI`

Comprobar que `.env` exista y contenga la variable.

### Puerto ocupado

Cambiar temporalmente:

```env
PORT=3001
```

### Error de Docker

Consultar logs:

```bash
docker ps
docker logs ID_CONTENEDOR
```
