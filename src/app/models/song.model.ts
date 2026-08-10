export interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
}

export type RepeatMode = 'off' | 'all' | 'one';
