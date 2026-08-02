import { Component, inject } from '@angular/core';
import { MusicService } from '../services/music.service';
@Component({
  selector: 'app-music-player',
  standalone: true,
  template: `<button
    (click)="music.toggle()"
    [attr.aria-label]="music.playing() ? 'Pausar música' : 'Reproducir música'"
    [title]="
      music.available()
        ? 'Música romántica'
        : 'Agrega tu canción en public/assets/audio/romantic-music.mp3'
    "
  >
    {{ music.playing() ? 'Ⅱ' : '♪' }}<span>{{ music.playing() ? 'Pausar' : 'Música' }}</span>
  </button>`,
  styles: [
    `
      button {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 20;
        display: flex;
        align-items: center;
        gap: 0.55rem;
        border: 1px solid #ffffffcc;
        background: #7e3d4bee;
        color: white;
        border-radius: 999px;
        padding: 0.8rem 1rem;
        box-shadow: 0 8px 24px #5c263747;
        cursor: pointer;
        font-weight: 800;
        backdrop-filter: blur(8px);
      }
      button span {
        font-size: 0.75rem;
      }
      @media (max-width: 480px) {
        button span {
          display: none;
        }
        button {
          width: 48px;
          height: 48px;
          justify-content: center;
        }
      }
    `,
  ],
})
export class MusicPlayerComponent {
  readonly music = inject(MusicService);
}
