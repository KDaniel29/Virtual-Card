import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LOVE_CONFIG } from '../../config/love.config';

@Component({
  selector: 'app-reasons-i-love-you',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './reasons-i-love-you.component.html',
  styleUrl: './reasons-i-love-you.component.scss',
})
/** Renderiza las razones personalizables como tarjetas. */
export class ReasonsILoveYouComponent {
  readonly config = LOVE_CONFIG;
  readonly currentIndex = signal(1);

  previous(): void {
    this.currentIndex.update(
      (index) => (index - 1 + this.config.reasons.length) % this.config.reasons.length,
    );
  }

  next(): void {
    this.currentIndex.update((index) => (index + 1) % this.config.reasons.length);
  }

  cardOffset(index: number): number {
    const length = this.config.reasons.length;
    const directOffset = index - this.currentIndex();
    const half = Math.floor(length / 2);

    if (directOffset > half) return directOffset - length;
    if (directOffset < -half) return directOffset + length;
    return directOffset;
  }
}
