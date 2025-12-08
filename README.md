# MisRecetasRepo

Proyecto desarrollado en Angular para la gestión de un recetario personal.
El objetivo principal de esta versión ha sido refactorizar todo el código legado para adaptarlo a la arquitectura moderna de angular

## Arquitectura y Decisiones Técnicas

He reescrito la aplicación siguiendo las reglas de "Zero NgModules" y programación reactiva. Estos son los puntos clave de mi implementación:

### 1. Componentes Standalone y Signals
* **NgModules:** Ya no uso `app.module.ts`. Todos los componentes son `standalone: true` y las rutas/http se configuran en `app.config.ts`.
* **Signals:** He sustituido los decoradores `@Input` y `@Output` por las nuevas funciones `input.required()` y `output()`.
* **Control Flow:** En las vistas (HTML) he quitado los `*ngIf` y `*ngFor` antiguos. Ahora uso la sintaxis nueva `@if`, `@for` (con `track` por id) y `@switch`.

### 2. Estructura de Componentes
He organizado los componentes por responsabilidad:
* **Navbar:** Extraído a su propio componente para limpiar el `app.component`.
* **RecipeCard:** Recibe el objeto `Receta` completo (modelo) en vez de propiedades sueltas.
* **Listas y Formularios:** Separados lógicamente y comunicados vía servicio.

### 3. Comunicación Reactiva (Sin recargas)
Para que el listado se actualice al crear una receta (sin usar `sessionStorage` ni recargar la página), he implementado un patrón reactivo en el `RecipeService`:
* Uso un `ReplaySubject` privado para controlar el estado.
* El listado se suscribe al observable `update$` y se refresca automáticamente cuando el formulario notifica un cambio (`notifyUpdate`).

---

## Cómo arrancar el proyecto

Para que la aplicación funcione, necesitas levantar el servidor de datos (mock) y el cliente Angular en la terminal. En una terminal con ng serve y en la otra terminal con npm run mock:api.
