# Arquitectura y flujo de la aplicación

Este documento explica las partes internas que pueden resultar menos evidentes para una
persona que comienza con Angular.

## Arranque

1. El navegador carga `src/index.html`.
2. `src/main.ts` registra `app.routes.ts` e inicia `AppComponent`.
3. `app.component.html` mantiene los elementos compartidos y `RouterOutlet` muestra la
   página correspondiente a la URL.

Se utiliza `withHashLocation()` para que actualizar una ruta en GitHub Pages no produzca
un error 404. Por ejemplo, la carta se representa como `/#/carta`.

## Flujo de pantallas

```text
/(pregunta) ── Sí ──> /celebracion ── Abrir carta ──> /carta
                                                    │
                                                    ├── carta
                                                    ├── momentos
                                                    ├── razones
                                                    ├── historia
                                                    └── mensaje final
```

Las páginas llaman `Router.navigate(...)`. Las rutas usan `loadComponent`, por lo que
Angular descarga cada pantalla solamente cuando se visita.

## Componentes

- `pages/HomeQuestionComponent`: pregunta inicial y movimiento acotado del botón “No”.
- `pages/CelebrationComponent`: confirmación visual y acceso a la carta.
- `pages/LetterPageComponent`: composición y navegación vertical de la carta.
- `LoveLetterComponent`: sobre, apertura y contenido de la carta.
- `MemoryGalleryComponent`: fotos configurables o marcadores de posición.
- `ReasonsILoveYouComponent`: tarjetas generadas desde `config.reasons`.
- `RelationshipTimelineComponent`: eventos cronológicos configurables.
- `FinalMessageComponent`: cierre y enlace para volver a la carta.
- `shared/ChibiBearsComponent`: ilustración reutilizable.
- `shared/FloatingHeartsComponent`: decoración no interactiva.
- `shared/MusicPlayerComponent`: control visible conectado a `MusicService`.

Los componentes son _standalone_, por lo que declaran sus dependencias directamente en
la propiedad `imports` y no necesitan un `AppModule`. Cada uno separa TypeScript, HTML y
SCSS dentro de su propia carpeta.

## Configuración y modelos

`LOVE_CONFIG` contiene datos, no comportamiento. Sus propiedades cumplen la interfaz
`LoveConfig` definida en `models/content.models.ts`. Si se agrega un campo obligatorio a
la interfaz, TypeScript pedirá incorporarlo también en la configuración.

Los arreglos se representan en las plantillas con `@for` y las secciones opcionales
utilizan `@if`; son bloques de control nativos de Angular moderno.

## Internacionalización

`ngx-translate` carga los archivos de `public/assets/i18n` mediante HTTP. El español es
el respaldo y `LanguageService` selecciona inicialmente la preferencia guardada o el
idioma del navegador. El servicio sincroniza además el atributo `<html lang>` y el título
del documento.

Los componentes standalone que muestran texto importan `TranslatePipe`. Incluso los
textos dinámicos de `LOVE_CONFIG` son claves; la traducción ocurre en la plantilla. Los
nombres propios también usan una clave (`CONFIG.SENDER`) para mantener una única regla y
permitir variantes por idioma cuando sean necesarias.

## Movimiento del botón “No”

1. `pointerenter` permite reaccionar al mouse y `pointerdown` cubre pantallas táctiles.
2. El método `dodge()` obtiene las dimensiones reales de la tarjeta y del botón.
3. Calcula coordenadas aleatorias dejando un margen seguro de 16 píxeles.
4. La clase `.free` activa `position: absolute` y un `z-index` alto.
5. Al llegar a `maxAttempts`, `.free` se retira; el botón vuelve al flujo normal y, por
   ello, exactamente a su posición inicial.

Para cambiar la cantidad de movimientos, modifica solamente `maxAttempts`.

## Música

`MusicService` crea una única instancia de `Audio`, compartida por toda la aplicación.
La canción se repite y se pausa sin reiniciarse. El método `play()` es asíncrono y puede
fallar si falta el archivo o si el navegador bloquea la reproducción; por eso se ejecuta
dentro de `try/catch`.

La ruta `assets/audio/suerte.mp3` corresponde físicamente a
`public/assets/audio/suerte.mp3`. Angular copia `public` a la raíz del build.

## Estilos y accesibilidad

Las variables CSS globales evitan repetir colores, sombras y tipografías. Los componentes
encapsulan sus estilos particulares. La consulta `prefers-reduced-motion` desactiva o
acorta animaciones para las personas que así lo solicitan en su sistema operativo.

## Build y GitHub Pages

Angular genera una aplicación estática. El workflow:

1. Descarga el repositorio.
2. Configura Node.js.
3. Ejecuta `npm ci` usando el archivo de bloqueo.
4. Compila con un `base-href` igual al nombre del repositorio.
5. Empaqueta `dist/carta-virtual/browser`.
6. Despliega el artefacto en el entorno `github-pages`.

El `base-href` es esencial: sin él, el navegador buscaría recursos en la raíz de
`usuario.github.io` en vez de dentro de `/nombre-del-repositorio/`.

## Convenciones para cambios

- Ejecuta `npm run format` antes de guardar un cambio grande.
- Ejecuta `npm run format:check` y `npm run build` antes de subirlo.
- No edites `dist/`; se regenera automáticamente.
- No subas `node_modules/`; las dependencias se reconstruyen con `npm ci`.
- Conserva nombres de archivos en minúsculas para evitar diferencias entre Windows y
  GitHub Pages (Linux).
