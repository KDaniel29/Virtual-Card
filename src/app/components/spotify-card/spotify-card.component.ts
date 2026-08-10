import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SPOTIFY_PLAYLIST_CONFIG } from '../../config/spotify.config';

@Component({
  selector: 'app-spotify-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './spotify-card.component.html',
  styleUrl: './spotify-card.component.scss',
})
/** Enlaza la banda sonora romántica con su playlist pública de Spotify. */
export class SpotifyCardComponent {
  readonly spotifyPlaylistUrl = SPOTIFY_PLAYLIST_CONFIG.url;
  readonly spotifyPlaylistName = SPOTIFY_PLAYLIST_CONFIG.name;
  readonly spotifyPlaylistCover = SPOTIFY_PLAYLIST_CONFIG.cover;
  readonly fallbackCover = SPOTIFY_PLAYLIST_CONFIG.fallbackCover;

  useFallbackCover(event: Event): void {
    const image = event.target as HTMLImageElement;
    if (!image.src.endsWith(this.fallbackCover)) image.src = this.fallbackCover;
  }
}
