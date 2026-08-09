import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LOVE_CONFIG } from '../../config/love.config';
import { WelcomeScreenComponent } from '../../components/welcome-screen/welcome-screen.component';

const CARD_EXIT_MS = 320;

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [TranslatePipe, WelcomeScreenComponent],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})
/** Recorrido previo que presenta mensajes breves antes de la pregunta principal. */
export class IntroductionComponent {
  private readonly router = inject(Router);
  readonly showWelcome = signal(true);
  readonly cards = LOVE_CONFIG.introCards;
  readonly currentIndex = signal(0);
  readonly cardDirection = signal<'next' | 'previous'>('next');
  readonly transitioning = signal(false);
  readonly currentCard = computed(() => this.cards[this.currentIndex()]);
  readonly isFirst = computed(() => this.currentIndex() === 0);
  readonly isLast = computed(() => this.currentIndex() === this.cards.length - 1);

  startExperience(): void {
    this.showWelcome.set(false);
  }

  previous(): void {
    if (this.isFirst() || this.transitioning()) return;

    this.changeCard('previous');
  }

  next(): void {
    if (this.transitioning()) return;

    if (this.isLast()) {
      void this.router.navigate(['/carta']);
      return;
    }

    this.changeCard('next');
  }

  private changeCard(direction: 'next' | 'previous'): void {
    this.cardDirection.set(direction);
    this.transitioning.set(true);

    setTimeout(() => {
      this.currentIndex.update((index) => (direction === 'next' ? index + 1 : index - 1));
      this.transitioning.set(false);
    }, CARD_EXIT_MS);
  }
}
