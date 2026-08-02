import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class MusicService {
  private readonly audio = new Audio('assets/audio/romantic-music.mp3');
  readonly playing = signal(false);
  readonly available = signal(true);
  constructor() {
    this.audio.loop = true;
    this.audio.volume = 0.35;
    this.audio.addEventListener('error', () => this.available.set(false));
  }
  async toggle(): Promise<void> {
    if (this.playing()) {
      this.audio.pause();
      this.playing.set(false);
      return;
    }
    try {
      await this.audio.play();
      this.playing.set(true);
    } catch {
      this.available.set(false);
    }
  }
}
