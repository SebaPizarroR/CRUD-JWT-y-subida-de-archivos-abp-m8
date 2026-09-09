# API REST con Node.js, Express y PostgreSQL

Proyecto backend para gestionar usuarios mediante una API REST con Node.js, Express y PostgreSQL.

## Descripción

Este proyecto implementa un servicio REST para realizar operaciones CRUD sobre la tabla `users` en una base de datos PostgreSQL. La API permite:

- Obtener todos los usuarios
- Obtener un usuario por su ID
- Crear un nuevo usuario
- Actualizar un usuario existente
- Eliminar un usuario por su ID

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- `pg` (cliente de PostgreSQL)
- `morgan` (logging de peticiones HTTP)

## Estructura del proyecto

```bash
.
├── database/
│   └── db.sql
├── src/
│   ├── config.js
│   ├── controllers/
│   │   └── users.controllers.js
│   ├── db.js
│   ├── index.js
│   ├── routes/
│   │   └── users.routes.js
├── .env
├── package.json
├── README.md
└── .gitignore
```

## Requisitos previos

- Node.js 18 o superior
- PostgreSQL instalado y ejecutándose
- npm o yarn

## Instalación

1. Clona este repositorio:

```bash
git clone <url-del-repositorio>
cd abp-m7-sebastian-pizarro
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_DATABASE=nombre_de_tu_base_de_datos
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
PORT=3000
```

4. Crea la base de datos y la tabla `users` usando el archivo `database/db.sql`.

## Ejecución

### Modo desarrollo

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

La API estará disponible en:

```bash
http://localhost:3000
```

## Base de datos

El archivo `database/db.sql` contiene:

- La creación de la tabla `users`
- Inserción de datos de ejemplo
- Consulta básica para verificar la tabla

Estructura de la tabla `users`:

```sql
CREATE TABLE users (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  created_at timestamp DEFAULT current_timestamp
);
```

## Endpoints

### Obtener todos los usuarios

- `GET /users`

### Obtener un usuario por ID

- `GET /users/:id`

### Crear un usuario

- `POST /users`

Body esperado:

```json
{
  "name": "Sebastián",
  "email": "sebastian@example.com"
}
```

### Actualizar un usuario

- `PUT /users/:id`

Body esperado:

```json
{
  "name": "Sebastián Pizarro",
  "email": "sebastian.nuevo@example.com"
}
```

### Eliminar un usuario

- `DELETE /users/:id`

## Ejemplos de uso con curl

### Obtener usuarios

```bash
curl http://localhost:3000/users
```

### Crear usuario

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@example.com"}'
```

### Obtener usuario por ID

```bash
curl http://localhost:3000/users/1
```

### Actualizar usuario

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana María","email":"ana.nueva@example.com"}'
```

### Eliminar usuario

```bash
curl -X DELETE http://localhost:3000/users/1
```

## Observaciones

- El campo `email` es único en la base de datos.
- Si intentas crear un usuario con un correo ya registrado, la API responderá con un error `409`.
- El servidor usa `morgan` para mostrar logs de las peticiones HTTP en consola.

## Autor

Sebastián Pizarro
