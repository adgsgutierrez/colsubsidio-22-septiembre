# colsubsidio-22-septiembre

# Gestión de usuarios con Foto

## Descripción

Este proyecto es utilizado para la gestión de usuarios en donde se utiliza la carga de archivos mediante la libreria de AWS a un bucket de S3, como entrega a la actividad # 2 del curso de arquitectura de software

## Definición

### Arquitectura

El proyecto cuenta con una arquitectura , se encuentra desarrollado en NodeJs versión 20.15.0.

Se encuentra distribuido de la siguiente manera:

- **Modelo**: Se encarga de la gestión de la información, en este caso se encuentra en la carpeta models
- **Vista**: Se encarga de la presentación de la información, en este caso se encuentra en la carpeta views
- **Controlador**: Se encarga de la lógica de negocio, en este caso se encuentra en la carpeta controllers
- **Infraestructure**: Se encarga de implementacion de la base de datos

## Instalación y ejecución

El proyecto cuenta con express en NodeJS y se encuentra en la carpeta src

### Instalación

```
npm install
```

### Ejecución del servidor

Crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno
```
# Configuracion del servidor
PORT=3000

# Configuracion de la base de datos
DATABASE_HOST= Url de la base de datos
DATABASE_USERNAME= Usuario de la base de datos
DATABASE_PASSWORD= Contraseña de la base de datos
DATABASE_PORT= Puerto de la base de datos
DATABASE_NAME= Nombre de la base de datos

# Configuracion de AWS
AWS_ACCESS_KEY_ID=Key de acceso de AWS
AWS_SECRET_ACCESS_KEY=Secret de acceso de AWS
AWS_REGION= Región de AWS
AWS_BUCKET_NAME= Nombre del bucket de AWS
AWS_ACCESS_POINT= Punto de acceso al bucket de AWS para solo lectura
```

#### Comandos

Ejecutar el servidor de forma
```
npm run start
```

Ejecutar el servidor en modo desarrollo
```
npm run liveserver
```

### Apertura de la aplicación

```
http://localhost:3000/
```

## Desarrolladores
Aric Gutierrez

## Licencia
MIT[MIT](/LICENSE)
