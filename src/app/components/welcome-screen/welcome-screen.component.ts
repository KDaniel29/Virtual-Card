import { Component, inject, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MusicService } from '../../services/music.service';

const EXIT_ANIMATION_MS = 700;

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './welcome-screen.component.html',
  styleUrl: './welcome-screen.component.scss',
})
/** Presenta la bienvenida antes de iniciar el recorrido principal. */
export class WelcomeScreenComponent {
  private readonly music = inject(MusicService);
  readonly start = output<void>();
  readonly leaving = signal(false);

  begin(): void {
    if (this.leaving()) return;

    void this.music.start();
    this.leaving.set(true);
    setTimeout(() => this.start.emit(), EXIT_ANIMATION_MS);
  }
}
