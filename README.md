# Carta Virtual 💌

Aplicación romántica e interactiva hecha con Angular. Presenta una pregunta inicial,
una celebración, un sobre animado, una carta, recuerdos, razones, una línea del tiempo y
música opcional. El diseño se adapta a teléfonos, tabletas y computadoras.

## Inicio rápido

### Requisitos

- Node.js 22.12 o posterior (Node 24 recomendado para coincidir con GitHub Actions).
- npm 10 o posterior.
- Git, solamente si se publicará en GitHub.

### Instalar y ejecutar

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
npm start
```

Visita `http://localhost:4200`. El servidor actualiza la página cuando guardas cambios.

> No abras `src/index.html` directamente en el navegador. Angular necesita compilar el
> proyecto mediante `npm start`.

## Dónde se encuentra cada cosa

| Necesito cambiar…                          | Archivo                                                  |
| ------------------------------------------ | -------------------------------------------------------- |
| Nombre, carta, razones, recuerdos y fechas | `src/app/config/love.config.ts`                          |
| Pregunta y comportamiento del botón “No”   | `src/app/pages/home-question/home-question.component.ts` |
| Archivo, volumen y reproducción de música  | `src/app/services/music.service.ts`                      |
| Ilustración principal                      | `public/assets/images/chibi-bears.png`                   |
| Fotos personales                           | `public/assets/images/`                                  |
| Colores y tipografías globales             | `src/styles.scss`                                        |
| Rutas de navegación                        | `src/app/app.routes.ts`                                  |
| Orden de las secciones                     | `src/app/pages/letter/letter-page.component.html`        |
| Traducciones al español                    | `public/assets/i18n/es.json`                             |
| Traducciones al inglés                     | `public/assets/i18n/en.json`                             |
| Despliegue automático                      | `.github/workflows/deploy.yml`                           |

La aplicación usa componentes independientes (_standalone_). `src/index.html` solo crea
`<app-root>`; `AppComponent` mantiene los elementos globales y `<router-outlet>` muestra
la página asociada a la ruta activa.

Consulta [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) para entender el flujo interno.

## Traducciones español–inglés

Todos los textos visibles se almacenan como claves equivalentes en:

```text
public/assets/i18n/es.json
public/assets/i18n/en.json
```

Las plantillas resuelven esas claves mediante `TranslatePipe`:

```html
<h1>{{ 'HOME.QUESTION' | translate }}</h1>
```

Para modificar un texto, conserva la misma clave en ambos JSON y cambia únicamente su
valor. Si agregas una frase nueva:

1. Crea la clave en `es.json`.
2. Crea exactamente la misma clave en `en.json`.
3. Úsala en la plantilla con `| translate`.
4. Si la clave se encuentra en un arreglo de `LOVE_CONFIG`, guarda la clave —no el texto
   final— y aplica el pipe al mostrarla.

El selector detecta inicialmente el idioma del navegador y guarda la preferencia en
`localStorage`. El español se utiliza como respaldo. Para agregar otro idioma, crea su
JSON, amplía `SupportedLanguage` y añade otro botón al selector.

## Personalizar la carta

### Textos y firma

Edita `src/app/config/love.config.ts`. Este archivo exporta `LOVE_CONFIG`, el objeto que
usan todas las secciones. Los campos principales son:

- `recipient`: nombre o apodo de la persona.
- `sender`: firma que aparece al final.
- `eyebrow` y `question`: textos de la primera pantalla.
- `letter`: párrafos de la carta; cada elemento del arreglo es un párrafo.
- `reasons`: tarjetas de “Lo que amo de ti”.
- `memories`: tarjetas de la galería.
- `timeline`: eventos de la historia.
- `finalMessage`: mensaje de cierre.

No elimines comas, comillas ni corchetes. Después de editar, ejecuta `npm run build` para
detectar errores de sintaxis.

### Fotografías

1. Copia una imagen a `public/assets/images`, por ejemplo `primera-foto.jpg`.
2. Agrega la propiedad `image` al recuerdo correspondiente:

```typescript
{
  title: 'Nuestra primera foto',
  caption: 'Ese instante donde todo comenzó.',
  image: 'assets/images/primera-foto.jpg',
}
```

La ruta comienza con `assets/`, no con `public/`. Angular copia el contenido de `public`
a la raíz del sitio durante el build.

### Música

El reproductor actual espera este archivo:

```text
public/assets/audio/suerte.mp3
```

Para utilizar otro nombre, cambia también esta línea de
`src/app/services/music.service.ts`:

```typescript
private readonly audio = new Audio('assets/audio/mi-cancion.mp3');
```

El volumen acepta valores entre `0` y `1`:

```typescript
this.audio.volume = 0.35; // 35 %
```

La música no comienza automáticamente. Los navegadores móviles requieren que la persona
pulse primero el botón flotante. Usa únicamente audio propio o con autorización para
publicarlo.

### Colores y tipografías

Las variables de `src/styles.scss` controlan la identidad visual:

```scss
:root {
  --cream: #fff8f1;
  --rose: #c94d62;
  --wine: #773747;
}
```

Cambiar una variable actualiza todos los componentes que la utilizan.

## Comandos disponibles

| Comando                | Uso                                                         |
| ---------------------- | ----------------------------------------------------------- |
| `npm start`            | Inicia el servidor local de desarrollo.                     |
| `npm run build`        | Genera el sitio optimizado en `dist/carta-virtual/browser`. |
| `npm run format`       | Aplica el formato definido por Prettier.                    |
| `npm run format:check` | Comprueba el formato sin modificar archivos.                |
| `npm run watch`        | Compila nuevamente cuando detecta cambios.                  |

## Publicar con GitHub Pages

### Primera publicación

1. Crea un repositorio en GitHub.
2. Sube el proyecto a la rama `main`.
3. Abre **Settings → Pages** en el repositorio.
4. En **Build and deployment → Source**, selecciona **GitHub Actions**.
5. Ve a **Actions → Deploy Angular to GitHub Pages → Run workflow**.

El paso 4 es obligatorio. Si se omite, `actions/configure-pages` devuelve
`Get Pages site failed` o `Not Found`.

El workflow calcula automáticamente el subdirectorio usando el nombre del repositorio:

```bash
npm run build -- --base-href "/nombre-del-repositorio/"
```

El sitio queda disponible en:

```text
https://usuario.github.io/nombre-del-repositorio/
```

### Publicar cambios posteriores

```bash
git add .
git commit -m "Actualiza la carta"
git push origin main
```

Cada `push` a `main` vuelve a compilar y publicar el sitio conservando el mismo enlace.
El proceso puede tardar varios minutos. Si el teléfono muestra una versión anterior,
actualiza la página o prueba una pestaña privada.

## Estructura del proyecto

```text
.
├── .github/workflows/deploy.yml  # Compilación y publicación en Pages
├── docs/                         # Documentación técnica adicional
├── public/assets/
│   ├── audio/                    # Canción utilizada por MusicService
│   ├── i18n/                     # Catálogos JSON español e inglés
│   └── images/                   # Ilustraciones y fotografías
├── src/
│   ├── app/
│   │   ├── components/           # Secciones exclusivas de la carta
│   │   ├── config/               # Contenido editable
│   │   ├── models/               # Contratos TypeScript
│   │   ├── pages/                # Pantallas asociadas a rutas
│   │   ├── services/             # Música y lógica global
│   │   ├── shared/               # Componentes usados en varias páginas
│   │   ├── app.component.*       # Contenedor raíz
│   │   └── app.routes.ts         # Tabla de navegación
│   ├── index.html                # Documento anfitrión de Angular
│   ├── main.ts                   # Punto de arranque
│   └── styles.scss               # Estilos y variables globales
├── angular.json                  # Configuración del compilador Angular
└── package.json                  # Dependencias y comandos npm
```

Cada componente vive en una carpeta propia con tres archivos:

```text
nombre-del-componente/
├── nombre-del-componente.component.ts    # Estado y comportamiento
├── nombre-del-componente.component.html  # Estructura visual
└── nombre-del-componente.component.scss  # Estilos encapsulados
```

## Solución de problemas

### No se escucha la música

- Confirma que existe `public/assets/audio/suerte.mp3`.
- Respeta exactamente mayúsculas y minúsculas; GitHub Pages distingue `Suerte.mp3` de
  `suerte.mp3`.
- Pulsa el control de música antes de esperar reproducción.
- Revisa la consola del navegador por errores `404`.

### GitHub Pages devuelve `Not Found`

Activa **Settings → Pages → Source → GitHub Actions** y vuelve a ejecutar el workflow.

### La página publicada no encuentra imágenes o scripts

No fijes manualmente un `base-href` con otro repositorio. El workflow lo construye desde
`${{ github.event.repository.name }}`.

### El build falla después de editar textos

Revisa comillas, comas y corchetes en `love.config.ts`, y ejecuta:

```bash
npm run format
npm run build
```

## Accesibilidad

- Los controles muestran foco visible al navegar con teclado.
- Las imágenes relevantes incluyen texto alternativo.
- Los mensajes dinámicos utilizan regiones anunciables.
- Las animaciones se reducen cuando el dispositivo tiene activado
  `prefers-reduced-motion`.
- El botón “No” deja de moverse después de varios intentos y vuelve a su posición inicial.

La ilustración de los ositos fue generada originalmente para este proyecto y puede
reemplazarse por otra imagen autorizada.
