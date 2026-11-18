import type { FirebaseOptions } from 'firebase/app';

/** Configuración pública del SDK web; nunca poner contraseñas ni claves de administración. */
export const MESSAGES_CONFIG = {
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    appId: '',
  } satisfies FirebaseOptions,
  oneSignalAppId: '',
};

export function isMessagingConfigured(): boolean {
  const { apiKey, authDomain, projectId, appId } = MESSAGES_CONFIG.firebase;
  return [apiKey, authDomain, projectId, appId].every((value) => value.trim().length > 0);
}
