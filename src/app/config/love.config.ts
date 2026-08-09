import { LoveConfig } from '../models/content.models';

/**
 * Estructura del contenido de la carta. Los valores traducibles son claves que deben
 * existir tanto en `public/assets/i18n/es.json` como en `en.json`.
 *
 * Las rutas de imágenes son relativas a `public/`. Por ejemplo, el archivo
 * `public/assets/images/foto-1.jpg` se escribe aquí como `assets/images/foto-1.jpg`.
 */
export const LOVE_CONFIG: LoveConfig = {
  introCards: [
    {
      eyebrow: 'INTRO.CARDS.WELCOME.EYEBROW',
      title: 'INTRO.CARDS.WELCOME.TITLE',
      message: 'INTRO.CARDS.WELCOME.MESSAGE',
      image: 'assets/images/sorpresa.gif',
    },
    {
      eyebrow: 'INTRO.CARDS.DETAILS.EYEBROW',
      title: 'INTRO.CARDS.DETAILS.TITLE',
      message: 'INTRO.CARDS.DETAILS.MESSAGE',
      image: 'assets/images/Gatito.gif',
    },
    {
      eyebrow: 'INTRO.CARDS.SOMETHING_SPECIAL.EYEBROW',
      title: 'INTRO.CARDS.SOMETHING_SPECIAL.TITLE',
      message: 'INTRO.CARDS.SOMETHING_SPECIAL.MESSAGE',
      image: 'assets/images/cora_latiendo.gif',
    },
  ],
  recipient: 'CONFIG.RECIPIENT',
  sender: 'CONFIG.SENDER',
  eyebrow: 'HOME.EYEBROW',
  question: 'HOME.QUESTION',
  letter: [
    'LETTER.PARAGRAPHS.FIRST',
    'LETTER.PARAGRAPHS.SECOND',
    'LETTER.PARAGRAPHS.THIRD',
    'LETTER.PARAGRAPHS.FOURTH',
    'LETTER.PARAGRAPHS.FIFTH',
    'LETTER.PARAGRAPHS.SIXTH'
  ],
  signature: 'LETTER.SIGNATURE',
  reasons: [
    'REASONS.ITEMS.1',
    'REASONS.ITEMS.2',
    'REASONS.ITEMS.3',
    'REASONS.ITEMS.4',
    'REASONS.ITEMS.5',
    'REASONS.ITEMS.6',
    'REASONS.ITEMS.7',
    'REASONS.ITEMS.8',
    'REASONS.ITEMS.9',
    'REASONS.ITEMS.10',
    'REASONS.ITEMS.11',
    'REASONS.ITEMS.12',
    'REASONS.ITEMS.13',
    'REASONS.ITEMS.14',
    'REASONS.ITEMS.15',
    'REASONS.ITEMS.16',
    'REASONS.ITEMS.17',
    'REASONS.ITEMS.18',
    'REASONS.ITEMS.19',
    'REASONS.ITEMS.20',
    'REASONS.ITEMS.21',
    'REASONS.ITEMS.22',
    'REASONS.ITEMS.23',
    'REASONS.ITEMS.24',
    'REASONS.ITEMS.25',
    'REASONS.ITEMS.26',
    'REASONS.ITEMS.27',
    'REASONS.ITEMS.28',
    'REASONS.ITEMS.29',
    'REASONS.ITEMS.30',
    'REASONS.ITEMS.31',
    'REASONS.ITEMS.32',
    'REASONS.ITEMS.33',
    'REASONS.ITEMS.34',
    'REASONS.ITEMS.35',
    'REASONS.ITEMS.36',
    'REASONS.ITEMS.37',
    'REASONS.ITEMS.38',
    'REASONS.ITEMS.39',
    'REASONS.ITEMS.40',
    'REASONS.ITEMS.41',
  ],
  memories: [
    // Agrega `image: 'assets/images/mi-foto.jpg'` a cualquier recuerdo para mostrar una foto.
    { title: 'MEMORIES.ITEMS.FIRST.TITLE', caption: 'MEMORIES.ITEMS.FIRST.CAPTION' },
    { title: 'MEMORIES.ITEMS.SPECIAL.TITLE', caption: 'MEMORIES.ITEMS.SPECIAL.CAPTION' },
    { title: 'MEMORIES.ITEMS.FAVORITE.TITLE', caption: 'MEMORIES.ITEMS.FAVORITE.CAPTION' },
    { title: 'MEMORIES.ITEMS.ADVENTURE.TITLE', caption: 'MEMORIES.ITEMS.ADVENTURE.CAPTION' },
  ],
  timeline: [
    {
      date: 'TIMELINE.ITEMS.MEETING.DATE',
      title: 'TIMELINE.ITEMS.MEETING.TITLE',
      description: 'TIMELINE.ITEMS.MEETING.DESCRIPTION',
      description2: 'TIMELINE.ITEMS.MEETING.DESCRIPTION2',
      description3: 'TIMELINE.ITEMS.MEETING.DESCRIPTION3',
      description4: 'TIMELINE.ITEMS.MEETING.DESCRIPTION4',
      description5: 'TIMELINE.ITEMS.MEETING.DESCRIPTION5',
    },
    {
      date: 'TIMELINE.ITEMS.DATE.DATE',
      title: 'TIMELINE.ITEMS.DATE.TITLE',
      description: 'TIMELINE.ITEMS.DATE.DESCRIPTION',
      description2: 'TIMELINE.ITEMS.DATE.DESCRIPTION2',
      description3: 'TIMELINE.ITEMS.DATE.DESCRIPTION3',
      description4: 'TIMELINE.ITEMS.DATE.DESCRIPTION4',
    },
    {
      date: 'TIMELINE.ITEMS.SPECIAL.DATE',
      title: 'TIMELINE.ITEMS.SPECIAL.TITLE',
      description: 'TIMELINE.ITEMS.SPECIAL.DESCRIPTION',
      description2: 'TIMELINE.ITEMS.SPECIAL.DESCRIPTION2',
      description3: 'TIMELINE.ITEMS.SPECIAL.DESCRIPTION3',
      description4: 'TIMELINE.ITEMS.SPECIAL.DESCRIPTION4',
    },
    {
      date: 'TIMELINE.ITEMS.TODAY.DATE',
      title: 'TIMELINE.ITEMS.TODAY.TITLE',
      description: 'TIMELINE.ITEMS.TODAY.DESCRIPTION',
    },
  ],
  finalMessage: 'FINAL.MESSAGE',
};
