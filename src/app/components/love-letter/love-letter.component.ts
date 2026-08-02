import { Component, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LOVE_CONFIG } from '../../config/love.config';

@Component({
  selector: 'app-love-letter',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './love-letter.component.html',
  styleUrl: './love-letter.component.scss',
})
/** Controla la apertura del sobre y revela el contenido configurado de la carta. */
export class LoveLetterComponent {
  readonly config = LOVE_CONFIG;
  readonly opened = signal(false);
  readonly continued = output<void>();

  open(): void {
    this.opened.set(true);
  }
}
