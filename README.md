# Viajes Turing – Frontend

## 1. Descripción general

Aplicación frontend del sistema Viajes Turing, desarrollada con Angular. Permite a los usuarios registrarse, iniciar sesión y utilizar las funcionalidades del sistema para consultar información de monedas, realizar conversiones, consultar condiciones meteorológicas y administrar su historial de operaciones.

El frontend se comunica con una API REST desarrollada en FastAPI y utiliza autenticación mediante tokens para acceder a los recursos protegidos.

## 2. Tecnologías utilizadas

- **Angular:** framework principal de desarrollo.
- **TypeScript:** lenguaje de programación.
- **Node.js:** entorno de ejecución.
- **npm:** administrador de paquetes.
- **RxJS:** manejo de operaciones asíncronas.
- **Angular Router:** administración de rutas.
- **HttpClient:** comunicación HTTP con el backend.

### Versiones utilizadas

| Tecnología  | Versión |
| ----------- | ------- |
| Angular     | 22.2.0  |
| Angular CLI | 22.2.0  |
| Node.js     | 24.21.0 |
| npm         | 11.19.0 |
| TypeScript  | 6.0.2   |

## 3. Requisitos previos

Antes de instalar el proyecto se requiere:

- Node.js.
- npm.
- Git.
- Backend de Viajes Turing configurado y en ejecución.

Se recomienda utilizar las versiones indicadas para reproducir el entorno de desarrollo utilizado durante la implementación.

Para verificar las versiones instaladas:

```bash
node -v
npm -v
```

## 4. Instalación del proyecto

### 4.1. Clonar el repositorio

Clonar el repositorio del frontend desde GitHub y acceder a la carpeta del proyecto.

```bash
git clone URL_DEL_REPOSITORIO
cd viajes-proyecto
```

Sustituir `URL_DEL_REPOSITORIO` por la dirección correspondiente al repositorio.

### 4.2. Instalar dependencias

Desde la carpeta que contiene `package.json`, ejecutar:

```bash
npm install
```

Este comando instala las dependencias necesarias para ejecutar y desarrollar la aplicación.

Si el repositorio incluye un archivo `package-lock.json`, también puede utilizarse:

```bash
npm ci
```

Este último comando instala las dependencias conforme a las versiones registradas en el archivo de bloqueo.

## 5. Configuración de la conexión con el backend

El frontend utiliza un archivo de configuración de entorno para establecer la dirección de la API.

Archivo:

```text
src/environments/environment.ts
```

Configuración actual:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
};
```

La propiedad `apiUrl` contiene la dirección base del backend.

### Consideraciones

- El backend debe estar ejecutándose para que las funcionalidades que consultan información del servidor puedan operar.
- Si el backend utiliza otro puerto o dirección IP, se debe actualizar `apiUrl`.
- Si el frontend y el backend se ejecutan en equipos diferentes, no debe utilizarse `127.0.0.1` como dirección del backend. Se debe configurar una dirección accesible desde el equipo donde se ejecuta el navegador.
- Si aparecen errores CORS, se debe revisar la configuración de orígenes permitidos en FastAPI.

## 6. Configuración de la aplicación

La configuración principal de Angular se encuentra en:

```text
src/app/app.config.ts
```

El proyecto registra los siguientes proveedores:

- `provideRouter`: permite administrar la navegación entre las rutas de la aplicación.
- `provideHttpClient`: habilita las solicitudes HTTP.
- `withInterceptors`: registra el interceptor de autenticación.

El interceptor utilizado es:

```typescript
import { authInterceptor } from './core/interceptors/auth.interceptor';
```

Este mecanismo permite incorporar el tratamiento de autenticación en las solicitudes HTTP realizadas por la aplicación.

## 7. Ejecución del proyecto

Antes de iniciar el frontend, verificar que el backend esté ejecutándose correctamente.

Desde la carpeta raíz del frontend, ejecutar:

```bash
npm start
```

Este comando inicia el servidor de desarrollo de Angular.

También puede ejecutarse directamente mediante Angular CLI:

```bash
ng serve
```

Una vez iniciado, acceder desde el navegador a:

```text
http://localhost:4200/
```

El servidor de desarrollo permite actualizar la aplicación automáticamente cuando se modifican los archivos fuente.

## 8. Funcionalidades principales

La aplicación incluye los siguientes módulos:

### 8.1. Registro de usuarios

Permite crear una cuenta para acceder al sistema.

### 8.2. Inicio de sesión

Permite autenticar al usuario mediante sus credenciales y establecer una sesión.

### 8.3. Dashboard

Presenta las funcionalidades principales de la aplicación y permite navegar entre sus diferentes secciones.

### 8.4. Conversión de monedas

Permite realizar operaciones de conversión utilizando la información de las tasas de cambio proporcionadas por el backend.

### 8.5. Consulta meteorológica

Permite consultar información del clima relacionada con las ciudades disponibles en el sistema.

### 8.6. Historial de operaciones

Permite consultar y administrar los registros de operaciones del usuario autenticado.

### 8.7. Cierre de sesión

Permite finalizar la sesión del usuario mediante la funcionalidad de cierre de sesión integrada con el backend.

## 9. Compilación del proyecto

Para comprobar que la aplicación puede compilarse correctamente, ejecutar:

```bash
npm run build
```

Este comando realiza la compilación del proyecto Angular.

Los archivos generados se almacenan dentro del directorio `dist/`.

## 10. Verificación funcional manual

Después de iniciar el frontend y el backend, se recomienda verificar manualmente el funcionamiento de las siguientes funcionalidades:

1. Acceso a la pantalla principal.
2. Registro de un usuario.
3. Inicio de sesión.
4. Navegación al dashboard.
5. Consulta de países, ciudades y monedas.
6. Realización de una conversión.
7. Consulta del clima.
8. Creación y consulta de registros del historial.
9. Actualización y eliminación de registros.
10. Cierre de sesión.

Estas verificaciones permiten comprobar la comunicación entre la interfaz y los servicios del backend.

**Nota:** el proyecto no cuenta actualmente con pruebas automatizadas unitarias ni pruebas end-to-end implementadas. La verificación descrita en este apartado es manual.

## 11. Solución de problemas frecuentes

### 11.1. Error al instalar dependencias

Verificar que Node.js y npm estén instalados correctamente.

```bash
node -v
npm -v
```

Si existen problemas con las dependencias instaladas, se puede revisar el archivo `package-lock.json` y volver a ejecutar `npm install`.

### 11.2. Error de conexión con el backend

Verificar que FastAPI esté ejecutándose y que la dirección configurada en `environment.ts` corresponda con la dirección real del servidor.

También se puede acceder a la documentación interactiva del backend:

```text
http://127.0.0.1:8000/docs
```

### 11.3. Error CORS

Si el navegador bloquea las solicitudes al backend por políticas CORS, revisar que FastAPI permita las solicitudes provenientes del origen del frontend.

En el entorno local, el origen habitual es:

```text
http://localhost:4200
```

### 11.4. Puerto 4200 ocupado

Si Angular no puede utilizar el puerto predeterminado, se puede iniciar el servidor en otro puerto:

```bash
ng serve --port 4300
```

En ese caso, acceder a la dirección correspondiente al nuevo puerto.

### 11.5. Error de autenticación

Verificar que el backend esté disponible y que las credenciales sean correctas. Si el problema persiste, revisar las respuestas de la API y los registros del servidor.

## 12. Consideraciones finales

- Mantener actualizado el archivo `package-lock.json`.
- No modificar las dependencias sin verificar su compatibilidad.
- Confirmar que la URL del backend corresponda al entorno de ejecución.
- Mantener el backend disponible durante las verificaciones funcionales.
- No almacenar credenciales ni secretos directamente en el código fuente.
- Verificar la compilación antes de publicar cambios.

## 13. Recursos adicionales

- [Documentación oficial de Angular](https://angular.dev/)
- [Angular CLI](https://angular.dev/tools/cli)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
