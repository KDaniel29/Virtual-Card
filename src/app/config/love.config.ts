import { LoveConfig } from '../models/content.models';

/**
 * ÚNICO ARCHIVO que debe editarse para personalizar los textos de la carta.
 *
 * Las rutas de imágenes son relativas a `public/`. Por ejemplo, el archivo
 * `public/assets/images/foto-1.jpg` se escribe aquí como `assets/images/foto-1.jpg`.
 */
export const LOVE_CONFIG: LoveConfig = {
  recipient: 'Mi persona favorita',
  sender: 'Kevin Daniel',
  eyebrow: 'Tengo una pregunta muy importante para ti…',
  question: '¿Puedo ser tu novio?',
  letter: [
    'Desde que llegaste a mi vida, cada momento tiene un significado diferente. Me encanta compartir contigo mis días, mis pensamientos, mis risas y todas esas pequeñas cosas que hacen que estar a tu lado sea tan especial.',
    'Quiero seguir creando recuerdos contigo, acompañarte en los días buenos y también estar presente cuando las cosas sean difíciles.',
    'Por eso preparé esta pequeña carta. Tal vez sea una forma diferente de preguntarlo, pero quería que fuera algo especial y hecho con mucho cariño.',
    '¿Quieres comenzar esta nueva historia conmigo? 💖',
  ],
  signature: 'Con mucho amor,',
  reasons: [
    'Tu sonrisa.',
    'La forma en que me haces sentir.',
    'Tus ocurrencias.',
    'Tu manera de escucharme.',
    'Todos los momentos que compartimos.',
  ],
  memories: [
    // Agrega `image: 'assets/images/mi-foto.jpg'` a cualquier recuerdo para mostrar una foto.
    { title: 'Nuestra primera foto', caption: 'Ese instante donde todo comenzó.' },
    { title: 'Un día especial', caption: 'Un día que guardo cerquita del corazón.' },
    { title: 'Mi recuerdo favorito', caption: 'Una sonrisa que nunca quiero olvidar.' },
    { title: 'Una aventura juntos', caption: 'Y todas las que aún nos esperan.' },
  ],
  timeline: [
    {
      date: 'Capítulo 01',
      title: 'El día que nos conocimos',
      description: 'Sin saberlo, comenzaba mi parte favorita de la historia.',
    },
    {
      date: 'Capítulo 02',
      title: 'Nuestra primera salida',
      description: 'El tiempo pasó demasiado rápido a tu lado.',
    },
    {
      date: 'Capítulo 03',
      title: 'Cuando supe que eras especial',
      description: 'De pronto, todas las pequeñas cosas tenían tu nombre.',
    },
    {
      date: 'Hoy',
      title: 'El comienzo de una nueva historia',
      description: 'Una página en blanco para escribirla juntos.',
    },
  ],
  finalMessage:
    'Gracias por llegar a mi vida. Espero que esta sea solamente la primera página de una historia muy bonita. 🐻💖🐻',
};
