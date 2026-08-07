import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LOVE_CONFIG } from '../../config/love.config';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})
/** Recorrido previo que presenta mensajes breves antes de la pregunta principal. */
export class IntroductionComponent {
  private readonly router = inject(Router);
  readonly cards = LOVE_CONFIG.introCards;
  readonly currentIndex = signal(0);
  readonly currentCard = computed(() => this.cards[this.currentIndex()]);
  readonly isFirst = computed(() => this.currentIndex() === 0);
  readonly isLast = computed(() => this.currentIndex() === this.cards.length - 1);

  previous(): void {
    if (!this.isFirst()) this.currentIndex.update((index) => index - 1);
  }

  next(): void {
    if (this.isLast()) {
      void this.router.navigate(['/carta']);
      return;
    }
    this.currentIndex.update((index) => index + 1);
  }
}
