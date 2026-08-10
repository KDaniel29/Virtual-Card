import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LOVE_CONFIG } from '../../config/love.config';
import { ChibiBearsComponent } from '../../shared/components/chibi-bears/chibi-bears.component';

@Component({
  selector: 'app-home-question',
  standalone: true,
  imports: [ChibiBearsComponent, TranslatePipe],
  templateUrl: './home-question.component.html',
  styleUrl: './home-question.component.scss',
})
/** Primera página: administra la pregunta y la interacción del botón “No”. */
export class HomeQuestionComponent {
  readonly questionImage = 'assets/images/love_you.gif';
  private readonly router = inject(Router);
  readonly maxAttempts = 5;
  readonly config = LOVE_CONFIG;
  readonly attempts = signal(0);
  readonly position = signal({ x: 0, y: 0 });
  readonly message = signal('');
  readonly texts = [
    'HOME.NO_OPTIONS.INITIAL',
    'HOME.NO_OPTIONS.SURE',
    'HOME.NO_OPTIONS.THINK_AGAIN',
    'HOME.NO_OPTIONS.MAYBE',
    'HOME.NO_OPTIONS.OTHER_BUTTON',
    'HOME.NO_OPTIONS.RESPECT',
  ];

  @ViewChild('card') card?: ElementRef<HTMLElement>;
  @ViewChild('noButton') noButton?: ElementRef<HTMLButtonElement>;

  accept(): void {
    void this.router.navigate(['/celebracion']);
  }

  noText(): string {
    return this.texts[Math.min(this.attempts(), this.texts.length - 1)];
  }

  //Función ppara mover el botón de "No" a posiciones aleatorias.
  dodge(event: Event): void {
    if (this.attempts() >= this.maxAttempts) return;
    event.preventDefault();
    const card = this.card?.nativeElement;
    const button = this.noButton?.nativeElement;
    if (!card || !button) return;

    const margin = 16;
    const maxX = Math.max(margin, card.clientWidth - button.offsetWidth - margin);
    const maxY = Math.max(margin, card.clientHeight - button.offsetHeight - margin);
    this.position.set({
      x: margin + Math.random() * (maxX - margin),
      y: margin + Math.random() * (maxY - margin),
    });
    this.attempts.update((value) => value + 1);
  }

  gentleNo(): void {
    if (this.attempts() >= this.maxAttempts) {
      this.message.set('HOME.RESPECT_MESSAGE');
    }
  }
}
