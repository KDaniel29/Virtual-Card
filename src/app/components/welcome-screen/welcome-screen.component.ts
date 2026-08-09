import { Component, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

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
  readonly start = output<void>();
  readonly leaving = signal(false);

  begin(): void {
    if (this.leaving()) return;

    this.leaving.set(true);
    setTimeout(() => this.start.emit(), EXIT_ANIMATION_MS);
  }
}
