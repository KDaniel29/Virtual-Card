/** Tarjeta de la galería. `image` es opcional para permitir un marcador de posición. */
export interface Memory {
  title: string;
  caption: string;
  image?: string;
}

/** Tarjeta del recorrido introductorio; `image` puede agregarse posteriormente. */
export interface IntroCard {
  eyebrow: string;
  title: string;
  message: string;
  image?: string;
}

/** Entrada individual de la línea del tiempo. */
export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

/**
 * Contrato del contenido personalizable de la aplicación.
 * Mantener esta interfaz sincronizada con `LOVE_CONFIG` permite que TypeScript detecte
 * campos faltantes o nombres escritos incorrectamente durante la compilación.
 */
export interface LoveConfig {
  introCards: IntroCard[];
  recipient: string;
  sender: string;
  eyebrow: string;
  question: string;
  letter: string[];
  signature: string;
  reasons: string[];
  memories: Memory[];
  timeline: TimelineEvent[];
  finalMessage: string;
}
