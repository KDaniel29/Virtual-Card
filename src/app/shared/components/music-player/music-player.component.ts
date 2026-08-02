import { Component, inject } from '@angular/core';
import { MusicService } from '../../../services/music.service';

@Component({
  selector: 'app-music-player',
  standalone: true,
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss',
})
/** Control compartido que conserva la música durante los cambios de ruta. */
export class MusicPlayerComponent {
  readonly music = inject(MusicService);
}
