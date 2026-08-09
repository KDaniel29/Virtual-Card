# Carta Virtual 💌

Experiencia romántica e interactiva desarrollada con Angular 20. Incluye una bienvenida animada, mensajes introductorios, una carta paginada, recuerdos, razones, una línea del tiempo, una pregunta especial y una celebración final reutilizable. El diseño es responsive y mantiene una estética tierna, chibi y elegante.

## Inicio rápido

### Requisitos

- Node.js 22.12 o posterior.
- npm 10 o posterior.

### Instalación y desarrollo

```bash
npm install
npm start
```

Abre `http://localhost:4200`. No abras `src/index.html` directamente: Angular debe compilar la aplicación.

## Flujo de la experiencia

```text
Bienvenida
  → tarjetas introductorias
  → carta y secciones románticas
  → pregunta especial
  → celebración
  → regreso al inicio de la carta, ya abierta
```

### 1. Bienvenida

La ruta `/` muestra primero `WelcomeScreenComponent`:

- Reutiliza una ilustración de `public/assets/images`.
- Presenta imagen, eyebrow, título, mensaje y botón con entrada escalonada.
- Incluye flotación, destellos, corazones y una salida suave de 700 ms.
- Al pulsar **Comenzar ♡**, emite `start` y revela la introducción sin recargar ni cambiar de ruta.
- Respeta `prefers-reduced-motion`.

### 2. Introducción

`IntroductionComponent` presenta las tarjetas configuradas en `LOVE_CONFIG.introCards`.

- **Siguiente** y **Anterior** usan una transición en dos fases: salida de la tarjeta actual y entrada direccional de la nueva.
- Los botones se bloquean brevemente durante la transición para evitar saltos por pulsaciones repetidas.
- En móvil se reserva espacio inferior para que la navegación no se superponga con los controles fijos de idioma y música.

### 3. Carta y contenido principal

La ruta `/carta` contiene:

- Sobre animado y carta.
- Paginación automática por cantidad de palabras.
- Desplazamiento suave al inicio de cada hoja al pulsar **Siguiente**.
- Galería de recuerdos.
- Carrusel de razones.
- Línea del tiempo con varios párrafos opcionales por capítulo.
- Acceso a la pregunta especial.
- Mensaje final y opción para volver a leer.

`LoveLetterComponent` acepta el input `openInitially`. La URL `/carta?open=true` muestra el sobre abierto y la primera hoja desde el inicio; `/carta` conserva el comportamiento normal con el sobre cerrado.

### 4. Pregunta y celebración

La pregunta especial se encuentra en `/pregunta`. Una respuesta afirmativa lleva a `/celebracion`.

La celebración final:

- Mantiene el título, imagen, mensaje y diseño original.
- El primer botón ejecuta `triggerCelebration()` sin navegar.
- La primera celebración genera más partículas que las siguientes.
- Combina una explosión local desde la posición real del botón con una capa ambiental de corazones, destellos, pétalos y sobres.
- Las partículas varían en tamaño, profundidad, opacidad, desenfoque, rotación, trayectoria y duración.
- El título, el corazón, la imagen y el botón reaccionan brevemente.
- Después de celebrar aparece **Volver al inicio de la carta 💌**.
- Ese segundo botón navega a `/carta?open=true`.
- Cada lote de partículas se elimina automáticamente después de 4.2 segundos.
- Los temporizadores se cancelan si el componente se destruye.

En `prefers-reduced-motion` se crean menos partículas y se sustituyen los recorridos largos por transiciones discretas de opacidad.

## Rutas

| Ruta           | Componente              | Función                                 |
| -------------- | ----------------------- | --------------------------------------- |
| `/`            | `IntroductionComponent` | Bienvenida y tarjetas introductorias.   |
| `/carta`       | `LetterPageComponent`   | Carta y recorrido romántico principal.  |
| `/pregunta`    | `HomeQuestionComponent` | Pregunta especial.                      |
| `/celebracion` | `CelebrationComponent`  | Celebración final y regreso a la carta. |
| Cualquier otra | Redirección             | Regresa a `/`.                          |

## Dónde cambiar cada elemento

| Necesito cambiar…                                    | Archivo                                           |
| ---------------------------------------------------- | ------------------------------------------------- |
| Nombre, firma, carta, razones, recuerdos y capítulos | `src/app/config/love.config.ts`                   |
| Bienvenida                                           | `src/app/components/welcome-screen/`              |
| Tarjetas introductorias                              | `src/app/pages/introduction/`                     |
| Carta, paginación y apertura automática              | `src/app/components/love-letter/`                 |
| Orden de las secciones                               | `src/app/pages/letter/letter-page.component.html` |
| Pregunta y comportamiento de respuestas              | `src/app/pages/home-question/`                    |
| Partículas y botones de celebración                  | `src/app/pages/celebration/`                      |
| Reproductor de música                                | `src/app/services/music.service.ts`               |
| Colores y tipografías                                | `src/styles.scss`                                 |
| Rutas                                                | `src/app/app.routes.ts`                           |
| Español                                              | `public/assets/i18n/es.json`                      |
| Inglés                                               | `public/assets/i18n/en.json`                      |

## Internacionalización

La aplicación utiliza `ngx-translate`. Todos los textos visibles deben existir con la misma clave en:

```text
public/assets/i18n/es.json
public/assets/i18n/en.json
```

Uso desde una plantilla:

```html
<h1>{{ 'INTRO.WELCOME.TITLE' | translate }}</h1>
```

Uso desde `LOVE_CONFIG`:

```typescript
{
  title: 'TIMELINE.ITEMS.MEETING.TITLE',
  description: 'TIMELINE.ITEMS.MEETING.DESCRIPTION',
}
```

El catálogo en inglés incluye los seis párrafos de la carta, las 41 razones y todos los párrafos secundarios de la línea del tiempo. Ambos diccionarios mantienen actualmente la misma estructura de claves.

Para agregar contenido:

1. Añade la clave en `es.json`.
2. Añade la misma clave en `en.json`.
3. Guarda la clave, no el texto final, dentro de `LOVE_CONFIG`.
4. Resuélvela con `TranslatePipe` en la plantilla.
5. Ejecuta `npm run build`.

El idioma inicial se obtiene del navegador, la preferencia se guarda en `localStorage` y español funciona como respaldo.

## Personalización

### Imágenes y GIF

Coloca los recursos en:

```text
public/assets/images/
```

Y úsalos sin incluir `public` en la URL:

```html
<img src="assets/images/ositos.gif" alt="Ilustración romántica" />
```

Un GIF solo se repite indefinidamente si fue exportado con la opción `Loop: Forever`.

Las imágenes configurables pueden declararse así:

```typescript
{
  title: 'MEMORIES.ITEMS.FIRST.TITLE',
  caption: 'MEMORIES.ITEMS.FIRST.CAPTION',
  image: 'assets/images/primera-foto.jpg',
}
```

### Párrafos adicionales de la línea del tiempo

Cada evento admite `description` y los campos opcionales `description2`, `description3`, `description4` y `description5`. El componente solo muestra los que estén definidos.

### Música

El reproductor espera:

```text
public/assets/audio/suerte.mp3
```

Los navegadores móviles requieren una interacción del usuario antes de reproducir audio. El control flotante permite iniciar y pausar la canción.

### Identidad visual

Las variables principales están en `src/styles.scss`:

```scss
:root {
  --cream: #fff8f1;
  --blush: #f7dfdc;
  --rose: #c94d62;
  --wine: #773747;
  --gold: #c89b57;
  --shadow: 0 28px 80px rgba(101, 47, 59, 0.16);
}
```

## Responsive y accesibilidad

- La interfaz funciona en escritorio, tablet, Android y iPhone.
- Los botones flotantes se mantienen separados de la navegación móvil.
- Los controles interactivos son botones reales y muestran foco visible.
- Las imágenes relevantes incluyen texto alternativo.
- Las regiones dinámicas importantes utilizan `aria-live`.
- Las capas decorativas utilizan `pointer-events: none`.
- Todas las animaciones contemplan `prefers-reduced-motion`.

## Comandos

| Comando                | Uso                                             |
| ---------------------- | ----------------------------------------------- |
| `npm start`            | Servidor de desarrollo.                         |
| `npm run build`        | Compilación optimizada en `dist/carta-virtual`. |
| `npm run watch`        | Recompila al detectar cambios.                  |
| `npm run format`       | Formatea el proyecto con Prettier.              |
| `npm run format:check` | Comprueba el formato.                           |

## Estructura principal

```text
public/assets/
├── audio/
├── i18n/
└── images/
src/app/
├── components/
│   ├── love-letter/
│   ├── memory-gallery/
│   ├── reasons-i-love-you/
│   ├── relationship-timeline/
│   └── welcome-screen/
├── config/
├── models/
├── pages/
│   ├── celebration/
│   ├── home-question/
│   ├── introduction/
│   └── letter/
├── services/
└── shared/
```

## Publicación con GitHub Pages

1. Sube el proyecto a la rama `main`.
2. En GitHub abre **Settings → Pages**.
3. Selecciona **GitHub Actions** como fuente.
4. Ejecuta el workflow de despliegue o realiza un nuevo `push`.

El workflow configura automáticamente el `base-href` según el nombre del repositorio.

## Solución de problemas

### No se escucha la música

- Confirma que existe `public/assets/audio/suerte.mp3`.
- Respeta mayúsculas y minúsculas.
- Pulsa el control de música antes de esperar reproducción.

### No aparece una traducción

- Comprueba que la clave exista en ambos JSON.
- Verifica que la ruta de la clave coincida exactamente con `LOVE_CONFIG` o la plantilla.
- Revisa comas y llaves y ejecuta `npm run build`.

### Una imagen no carga

- Guarda el archivo en `public/assets/images`.
- Usa una ruta que empiece por `assets/images/`.
- Comprueba el nombre y la extensión exactos.

### La publicación muestra una versión anterior

Espera a que finalice GitHub Actions y después actualiza la página o abre una pestaña privada.
