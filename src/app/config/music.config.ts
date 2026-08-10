import { Song } from '../models/song.model';

export const MUSIC_PLAYLIST: Song[] = [
  {
    id: 1,
    title: 'Lover',
    artist: 'Taylor Swift',
    src: 'assets/audio/taylor swift - lover.mp3',
    cover: 'assets/images/love.gif',
  },
  {
    id: 2,
    title: 'Cant help Falling In Love',
    artist: 'Twenty One Pilots',
    src: 'assets/audio/twenty one pilots - Cant Help Falling In Love (Elvis Cover).mp3',
    cover: 'assets/images/love.gif',
  },
  {
    id: 3,
    title: 'Amor Completo',
    artist: 'Mon Laferte',
    src: 'assets/audio/Mon Laferte - Amor Completo.mp3',
    cover: 'assets/images/love.gif',
  },
  {
    id: 4,
    title: 'La que me gusta',
    artist: 'Los amigos invisibles',
    src: 'assets/audio/Los amigos invisibles - La que me gusta.mp3',
    cover: 'assets/images/love.gif',
  },
  {
    id: 5,
    title: 'Diamante',
    artist: 'Sabino',
    src: 'assets/audio/Sabino - Diamante.mp3',
    cover: 'assets/images/love.gif',
  },
  {
    id: 6,
    title: 'Suerte',
    artist: 'Paty Cantú',
    src: 'assets/audio/suerte.mp3',
    cover: 'assets/images/love.gif',
  },
];

export const MUSIC_FALLBACK_COVER = 'assets/images/love.gif';
