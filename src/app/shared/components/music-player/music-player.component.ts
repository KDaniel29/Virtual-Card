import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MUSIC_FALLBACK_COVER } from '../../../config/music.config';
import { MusicService } from '../../../services/music.service';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss',
})
/** Reproductor global que conserva audio y estado durante los cambios de ruta. */
export class MusicPlayerComponent {
  readonly music = inject(MusicService);
  readonly expanded = signal(false);
  readonly playlistVisible = signal(false);
  readonly fallbackCover = MUSIC_FALLBACK_COVER;

  toggleExpanded(): void {
    this.expanded.update((expanded) => !expanded);
  }

  togglePlaylist(): void {
    this.playlistVisible.update((visible) => !visible);
  }

  updateProgress(event: Event): void {
    this.music.seek(Number((event.target as HTMLInputElement).value));
  }

  updateVolume(event: Event): void {
    this.music.setVolume(Number((event.target as HTMLInputElement).value));
  }

  formatTime(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  useFallbackCover(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (!image.src.endsWith(this.fallbackCover)) image.src = this.fallbackCover;
  }
}
