# Carta Virtual 💌

Una experiencia romántica e interactiva hecha con Angular: pregunta inicial, celebración, sobre animado, carta personalizable, galería, razones, línea del tiempo y música opcional. Es responsive, accesible y respeta `prefers-reduced-motion`.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm 10+

## Ejecutar localmente

```bash
npm install
npm start
```

Abre `http://localhost:4200`.

## Personalizar

Todos los nombres, textos, razones, recuerdos y eventos viven en `src/app/config/love.config.ts`. Cambia `[Mi nombre]` por tu firma.

- Fotos: copia las imágenes a `public/assets/images` y agrega su ruta (por ejemplo, `assets/images/nuestra-foto.jpg`) en la propiedad `image` del recuerdo correspondiente.
- Ositos: reemplaza `public/assets/images/chibi-bears.png` conservando el nombre, o cambia la ruta en `chibi-bears.component.ts`.
- Música: copia un MP3 a `public/assets/audio/romantic-music.mp3`. Si no existe, el resto de la app funciona con normalidad. Por políticas del navegador, solo se reproduce después de pulsar el control.
- Colores y tipografías: edita las variables de `src/styles.scss`.

## Build de producción

```bash
npm run build
```

Los archivos se generan en `dist/carta-virtual/browser`.

## Publicar en GitHub Pages

1. Crea un repositorio y sube el proyecto a la rama `main`.
2. En GitHub abre **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**. Este paso es
   obligatorio antes de ejecutar el workflow por primera vez; de lo contrario,
   `actions/configure-pages` devolverá un error `Not Found`.
4. Abre **Actions → Deploy Angular to GitHub Pages → Run workflow** para repetir el
   primer despliegue, o envía un nuevo cambio a `main`.
5. Cada `push` posterior a `main` ejecutará `.github/workflows/deploy.yml` automáticamente.

El workflow detecta automáticamente el nombre del repositorio y compila con:

```bash
npm run build -- --base-href "/nombre-del-repositorio/"
```

La aplicación quedará en `https://usuario.github.io/nombre-del-repositorio/`.

## Estructura principal

```text
src/app/
├── components/        # Secciones y elementos interactivos
├── config/            # Contenido editable
├── models/            # Interfaces TypeScript
└── services/          # Navegación y música
public/assets/
├── images/            # Ilustraciones y fotos
└── audio/             # Música opcional
```

La ilustración de los ositos incluida en el proyecto fue generada originalmente para esta carta y puede reemplazarse libremente dentro del proyecto.
