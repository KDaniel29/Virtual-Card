import { Component, ElementRef, output, signal, ViewChild } from '@angular/core';
import { ChibiBearsComponent } from './chibi-bears.component';
import { LOVE_CONFIG } from '../config/love.config';
@Component({
  selector: 'app-home-question',
  standalone: true,
  imports: [ChibiBearsComponent],
  template: ` <main class="welcome">
    <section class="question-card" #card aria-labelledby="main-question">
      <div class="art"><app-chibi-bears [compact]="true" /></div>
      <div class="copy">
        <p class="eyebrow">{{ config.eyebrow }}</p>
        <h1 id="main-question">{{ config.question }}</h1>
        <p class="note">Una pregunta pequeñita, pero con todo mi corazón.</p>
        <div class="actions">
          <button class="yes" (click)="accepted.emit()">Sí <span>💖</span></button
          ><button
            #noButton
            class="no"
            [class.free]="attempts() > 0"
            [style.left.px]="position().x"
            [style.top.px]="position().y"
            (pointerenter)="dodge($event)"
            (pointerdown)="dodge($event)"
            (click)="gentleNo()"
          >
            {{ noText() }}
          </button>
        </div>
        @if (message()) {
          <p class="gentle" role="status">{{ message() }}</p>
        }
      </div>
    </section>
  </main>`,
  styles: [
    `
      .welcome {
        min-height: 100svh;
        display: grid;
        place-items: center;
        padding: clamp(1rem, 4vw, 3rem);
        position: relative;
        z-index: 1;
      }
      .question-card {
        position: relative;
        isolation: isolate;
        width: min(950px, 100%);
        min-height: min(680px, 88svh);
        display: grid;
        grid-template-columns: 1.05fr 1fr;
        align-items: center;
        gap: clamp(1.5rem, 4vw, 4rem);
        padding: clamp(1.4rem, 4vw, 3.7rem);
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.9);
        border-radius: 2.5rem;
        box-shadow: var(--shadow);
        backdrop-filter: blur(18px);
        animation: arrive 0.8s ease both;
        overflow: hidden;
      }
      .copy {
        text-align: left;
      }
      .eyebrow {
        color: var(--rose);
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        font-size: 0.76rem;
      }
      .note,
      .gentle {
        color: var(--muted);
      }
      h1 {
        font-family: var(--script);
        font-size: clamp(3rem, 7vw, 5.8rem);
        line-height: 0.95;
        color: var(--wine);
        margin: 0.5rem 0 1rem;
        font-weight: 700;
      }
      .actions {
        position: static;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-height: 6.5rem;
        margin-top: 1rem;
      }
      button {
        border: 0;
        border-radius: 999px;
        padding: 1rem 1.7rem;
        font: 700 1rem var(--sans);
        cursor: pointer;
        transition:
          0.25s transform,
          0.25s box-shadow;
      }
      .yes {
        background: linear-gradient(135deg, var(--rose), #e97887);
        color: white;
        box-shadow: 0 10px 26px rgba(201, 73, 94, 0.3);
        z-index: 2;
      }
      .yes:hover {
        transform: translateY(-3px) scale(1.02);
      }
      .no {
        background: #fff4ef;
        color: var(--wine);
        border: 1px solid #eed2cb;
        white-space: nowrap;
      }
      .no.free {
        position: absolute;
        z-index: 50;
        box-shadow: 0 10px 24px rgba(119, 55, 71, 0.18);
      }
      .gentle {
        font-size: 0.9rem;
        margin: 0;
      }
      @keyframes arrive {
        from {
          opacity: 0;
          transform: translateY(24px) scale(0.98);
        }
      }
      @media (max-width: 720px) {
        .question-card {
          grid-template-columns: 1fr;
          text-align: center;
          padding: 1.2rem;
          min-height: auto;
        }
        .art {
          max-width: 22rem;
          margin: auto;
        }
        .copy {
          text-align: center;
        }
        .actions {
          justify-content: center;
          min-height: 7rem;
        }
        h1 {
          font-size: clamp(3rem, 15vw, 4.5rem);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .question-card {
          animation: none;
        }
      }
    `,
  ],
})
export class HomeQuestionComponent {
  readonly accepted = output<void>();
  readonly config = LOVE_CONFIG;
  readonly attempts = signal(0);
  readonly position = signal({ x: 0, y: 0 });
  readonly message = signal('');
  @ViewChild('card') card?: ElementRef<HTMLElement>;
  @ViewChild('noButton') noButton?: ElementRef<HTMLButtonElement>;
  readonly texts = [
    'No 🙈',
    '¿Segura? 🥺',
    'Piénsalo otra vez 👉👈',
    '¿Quizá un poquito? 🌷',
    'Mira bien el otro botón 💖',
    'Está bien, te escucho 🤍',
  ];
  noText(): string {
    return this.texts[Math.min(this.attempts(), this.texts.length - 1)];
  }
  dodge(event: Event): void {
    if (this.attempts() >= 5) return;
    event.preventDefault();
    const card = this.card?.nativeElement;
    const btn = this.noButton?.nativeElement;
    if (!card || !btn) return;
    const margin = 16;
    const maxX = Math.max(margin, card.clientWidth - btn.offsetWidth - margin);
    const maxY = Math.max(margin, card.clientHeight - btn.offsetHeight - margin);
    this.position.set({
      x: margin + Math.random() * (maxX - margin),
      y: margin + Math.random() * (maxY - margin),
    });
    this.attempts.update((v) => v + 1);
  }
  gentleNo(): void {
    if (this.attempts() >= 5)
      this.message.set(
        'No pasa nada. Lo más importante es que te sientas cómoda y puedas elegir con libertad. 🤍',
      );
  }
}
