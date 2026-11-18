# Mensajitos privados para dos personas

El código del buzón está preparado. La conexión real requiere un proyecto de Firebase
Spark, las dos cuentas y una aplicación web de OneSignal en su plan Free. No se han
creado recursos externos ni publicado reglas desde este checkout.

## 1. Conectar Firebase

Instala y conecta la integración oficial **Firebase** en el chat para que el agente
pueda comprobar qué operaciones ofrece y configurar el proyecto autorizado. La
integración requiere tu inicio de sesión; no compartas tu contraseña en el chat.

Si prefieres configurar el proyecto desde la consola:

1. Abre <https://console.firebase.google.com/> y crea un proyecto. Conserva el plan
   **Spark** y no habilites facturación. Analytics es opcional y no lo utiliza esta app.
2. Registra una aplicación **Web**. Copia su configuración pública en
   `src/app/config/messages.config.ts`: `apiKey`, `authDomain`, `projectId` y `appId`.
3. En **Authentication → Sign-in method**, habilita **Correo electrónico/contraseña**.
4. En **Authentication → Users**, crea las dos cuentas. Una será el administrador y
   otra el destinatario. Usa contraseñas distintas; no las guardes en el repositorio.
5. Anota el **UID** de cada cuenta. El correo sirve para entrar y el UID fija su rol.
6. En **Authentication → Settings → Authorized domains**, agrega el dominio de
   producción y `localhost` para desarrollo, si no aparece.
7. Crea **Cloud Firestore, edición Standard**, en una ubicación adecuada. Empieza con
   reglas cerradas, sin modo de prueba abierto.
8. Desde la consola crea la colección `settings`, documento `access`, con dos campos
   de tipo string:

   ```json
   {
     "adminUid": "UID_REAL_DEL_ADMINISTRADOR",
     "recipientUid": "UID_REAL_DEL_DESTINATARIO"
   }
   ```

   Deben ser dos UID distintos. Este documento solo puede modificarse con acceso
   administrativo de Firebase; la aplicación no permite cambiar sus roles.

9. En la pestaña **Rules**, publica el contenido de `firestore.rules`.

La configuración web de Firebase identifica el proyecto y puede incluirse en el
frontend. Las reglas son las que protegen los mensajes. No agregues claves de cuentas
de servicio, contraseñas ni claves REST de OneSignal a esa configuración.

## 2. Probar las cuentas y el historial

1. Ejecuta `npm start` y abre <http://localhost:4200/#/mensajes>.
2. Entra como administrador: debe aparecer el formulario para escribir.
3. Guarda un mensaje de prueba. El aviso de éxito aparece cuando Firestore confirma
   el guardado en la nube, no al ponerlo en la cola local.
4. Cierra sesión y entra como destinatario: debe aparecer el historial y no el
   formulario para publicar. Abre el mensaje para marcarlo como leído.
5. Recarga con el navegador sin conexión: la sesión y los mensajes previamente
   descargados deben seguir disponibles. El estado de lectura pendiente se sincroniza
   al volver a tener conexión.
6. En otro teléfono, entra con el mismo correo y contraseña: recuperará el historial
   desde Firestore. Ese teléfono necesitará activar sus propias notificaciones.

El SDK guarda una copia local persistente mediante IndexedDB. La cuenta y la copia en
la nube permiten recuperar los datos aunque se borre esa copia local. No hace falta
copiar manualmente los datos del teléfono anterior. Al cerrar sesión se retira el
historial de la pantalla; la caché del navegador permanece en ese dispositivo.

El acceso a **Tus mensajitos ♡** aparece en la carta cuando la configuración de Firebase
está completa. Mientras no exista configuración, la ruta `/mensajes` muestra un estado
de próxima apertura y no intenta conectarse a un proyecto ficticio.

## 3. Configurar OneSignal Free

1. Crea tu cuenta en <https://onesignal.com/> y una app con canal **Web Push**.
2. Conserva el plan **Free**. Selecciona **Custom Code** y el origen HTTPS donde está
   publicada la carta. Para el teléfono utiliza la publicación HTTPS, no el HTTP de
   una dirección IP de tu red local.
3. Copia únicamente el **App ID público** en `MESSAGES_CONFIG.oneSignalAppId`.
4. Usa el ícono publicado `assets/icons/icon-192.png` como imagen predeterminada.
5. Publica la compilación y comprueba que
   `<URL_DE_LA_CARTA>/onesignal/OneSignalSDKWorker.js` responde con JavaScript.
6. En el teléfono del destinatario, abre el buzón, inicia sesión y pulsa
   **Quiero recibir tus mensajitos ♡**. En iPhone instala primero la PWA y ábrela desde
   su ícono; Web Push requiere iOS/iPadOS 16.4 o posterior.
7. Verifica la suscripción en **Audience → Subscriptions** de OneSignal y marca el
   dispositivo conocido como usuario de prueba. Si cambia de teléfono, verifica la
   nueva suscripción y actualiza el segmento destinatario.

La ruta y el scope del worker se calculan desde el `base-href`. En GitHub Pages son
`/<repositorio>/onesignal/OneSignalSDKWorker.js` y `/<repositorio>/onesignal/`, para no
reemplazar el worker de Angular ni interferir con su caché. No cambies esos valores
por un scope `/`.

El SDK se prepara al entrar como destinatario; el permiso se solicita al pulsar el
botón. No se cargan avisos automáticos ni se suscribe al administrador. Al cerrar
sesión se solicita la desactivación de esa suscripción.

## 4. Publicar mensajes y enviar el aviso

1. Entra al buzón con la cuenta del administrador.
2. Escribe y pulsa **Guardar y compartir**. Espera la confirmación del guardado.
3. Abre **Enviar aviso desde OneSignal** para componer una notificación en su panel.
4. Selecciona el segmento que contiene exclusivamente el teléfono verificado del
   destinatario. No uses una audiencia general sin revisar sus suscripciones.
5. Usa, por ejemplo, título **♥️ Un mensajito para ti**, texto **Tienes nuevas palabras
   esperándote ♡** y la URL completa de la carta terminada en `/#/mensajes`.
6. Envía el aviso. Al tocarlo, la aplicación abre el buzón y recupera el texto privado
   desde Firestore después de autenticar al destinatario.

Guardar un mensaje no dispara automáticamente una notificación. Esta versión utiliza
el panel gratuito de OneSignal para el envío manual y evita Cloud Functions. No incluye
ninguna clave privada de envío en el código del navegador.

El historial depende de Firestore, no de la entrega del push. Por ello, un mensaje se
puede recuperar aunque su aviso no haya llegado. Los avisos no contienen por defecto
el texto privado del mensaje.

## 5. Comprobar los permisos antes del uso real

Ejecuta las pruebas de reglas con el emulador de Firestore o comprueba estos casos en
su simulador de reglas, contra un mensaje real de prueba:

| Acción                                              | Sin sesión / tercera cuenta | Administrador | Destinatario |
| --------------------------------------------------- | --------------------------- | ------------- | ------------ |
| Leer `settings/access` o mensajes                   | Denegada                    | Permitida     | Permitida    |
| Crear un mensaje válido                             | Denegada                    | Permitida     | Denegada     |
| Modificar título, texto, destinatario o fecha       | Denegada                    | Denegada      | Denegada     |
| Actualizar solo `readAt` con timestamp del servidor | Denegada                    | Denegada      | Permitida    |
| Cambiar roles desde la app o borrar mensajes        | Denegada                    | Denegada      | Denegada     |

Los límites también se validan en las reglas: título de 1 a 80 caracteres, texto de 1 a
2000, remitente administrador, destinatario fijo y fecha de creación del servidor.
Las demás colecciones quedan cerradas. Los permisos protegen el buzón; el recorrido
original de la carta conserva su acceso actual.

## Referencias

- [SDK web de Firebase](https://firebase.google.com/docs/web/setup).
- [Persistencia offline de Firestore](https://firebase.google.com/docs/firestore/manage-data/enable-offline).
- [Reglas de Firestore](https://firebase.google.com/docs/firestore/security/get-started).
- [Planes de Firebase](https://firebase.google.com/pricing).
- [OneSignal en Angular](https://documentation.onesignal.com/docs/en/angular-setup).
- [Scopes de OneSignal](https://documentation.onesignal.com/docs/en/onesignal-service-worker).
- [Plan Free de OneSignal](https://onesignal.com/pricing).
