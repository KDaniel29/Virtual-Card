import { Component, output } from '@angular/core';
import { ChibiBearsComponent } from './chibi-bears.component';
@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [ChibiBearsComponent],
  template: `<main class="celebration">
    <div class="confetti" aria-hidden="true">
      @for (c of pieces; track $index) {
        <i [style.--i]="$index">{{ c }}</i>
      }
    </div>
    <section>
      <p class="kicker">Nuestro siguiente capítulo comienza aquí</p>
      <h1>¡Sabía que dirías que sí! 💖</h1>
      <app-chibi-bears [compact]="true" />
      <p>Prometo cuidar esta historia con ternura, paciencia y muchas sonrisas.</p>
      <button (click)="openLetter.emit()">Abrir mi carta <span>💌</span></button>
    </section>
  </main>`,
  styles: [
    `
      .celebration {
        min-height: 100svh;
        display: grid;
        place-items: center;
        padding: 2rem;
        position: relative;
        z-index: 1;
        overflow: hidden;
      }
      section {
        text-align: center;
        max-width: 720px;
        background: rgba(255, 255, 255, 0.72);
        padding: clamp(1.5rem, 5vw, 3rem);
        border-radius: 2.5rem;
        box-shadow: var(--shadow);
        animation: pop 0.7s ease both;
      }
      h1 {
        font: 700 clamp(2.8rem, 8vw, 5rem)/1 var(--script);
        color: var(--wine);
        margin: 0.5rem 0 1.2rem;
      }
      .kicker {
        color: var(--rose);
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.72rem;
      }
      p {
        color: var(--muted);
      }
      button {
        background: var(--wine);
        color: #fff;
        border: 0;
        border-radius: 999px;
        padding: 1rem 1.6rem;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 10px 22px #8f3e4d40;
      }
      .confetti i {
        position: absolute;
        top: -3rem;
        left: calc(var(--i) * 8%);
        font-style: normal;
        animation: fall calc(3s + var(--i) * 0.15s) ease-in infinite;
        animation-delay: calc(var(--i) * -0.3s);
      }
      @keyframes fall {
        to {
          transform: translateY(110vh) rotate(300deg);
        }
      }
      @keyframes pop {
        from {
          opacity: 0;
          transform: scale(0.88);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .confetti {
          display: none;
        }
        section {
          animation: none;
        }
      }
    `,
  ],
})
export class CelebrationComponent {
  readonly openLetter = output<void>();
  readonly pieces = ['♥', '✦', '🌸', '♡', '✧', '♥', '🌷', '♡', '✦', '♥', '🌸', '♡'];
}
