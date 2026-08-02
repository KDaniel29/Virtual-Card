import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LOVE_CONFIG } from '../../config/love.config';
import { ChibiBearsComponent } from '../../shared/components/chibi-bears/chibi-bears.component';

@Component({
  selector: 'app-home-question',
  standalone: true,
  imports: [ChibiBearsComponent],
  templateUrl: './home-question.component.html',
  styleUrl: './home-question.component.scss',
})
/** Primera página: administra la pregunta y la interacción del botón “No”. */
export class HomeQuestionComponent {
  private readonly router = inject(Router);
  readonly maxAttempts = 5;
  readonly config = LOVE_CONFIG;
  readonly attempts = signal(0);
  readonly position = signal({ x: 0, y: 0 });
  readonly message = signal('');
  readonly texts = [
    'No 🙈',
    '¿Segura? 🥺',
    'Piénsalo otra vez 👉👈',
    '¿Quizá un poquito? 🌷',
    'Mira bien el otro botón 💖',
    'Está bien, te escucho 🤍',
  ];

  @ViewChild('card') card?: ElementRef<HTMLElement>;
  @ViewChild('noButton') noButton?: ElementRef<HTMLButtonElement>;

  accept(): void {
    void this.router.navigate(['/celebracion']);
  }

  noText(): string {
    return this.texts[Math.min(this.attempts(), this.texts.length - 1)];
  }

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
      this.message.set(
        'No pasa nada. Lo más importante es que te sientas cómoda y puedas elegir con libertad. 🤍',
      );
    }
  }
}
