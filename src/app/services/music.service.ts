import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class MusicService {
  // Esta ruta apunta a `public/assets/audio/suerte.mp3`.
  private readonly audio = new Audio('assets/audio/suerte.mp3');
  readonly playing = signal(false);
  readonly available = signal(true);
  constructor() {
    // La reproducción en bucle y el volumen se configuran una sola vez para toda la app.
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
      // Los navegadores permiten play() porque toggle() se invoca desde un clic del usuario.
      await this.audio.play();
      this.playing.set(true);
    } catch {
      // Puede fallar si el archivo no existe o el navegador impide la reproducción.
      this.available.set(false);
    }
  }
}
