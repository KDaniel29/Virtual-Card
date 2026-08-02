import { Component, output, signal } from '@angular/core';
import { LOVE_CONFIG } from '../config/love.config';
@Component({
  selector: 'app-love-letter',
  standalone: true,
  template: `<section class="letter-stage" id="carta" aria-labelledby="letter-title">
    <div class="section-intro">
      <span>Para {{ config.recipient }}</span>
      <h2 id="letter-title">Una carta para ti</h2>
      <p>Toca el sobre. Hay algo que llevo tiempo queriendo decirte.</p>
    </div>
    <button
      class="envelope"
      [class.open]="opened()"
      (click)="open()"
      [attr.aria-expanded]="opened()"
      aria-controls="letter-paper"
    >
      <span class="flap"></span><span class="seal">♥</span
      ><span class="hint">{{ opened() ? 'Carta abierta' : 'Toca para abrir' }}</span>
    </button>
    @if (opened()) {
      <article id="letter-paper" class="paper">
        <p class="salute">Mi persona favorita:</p>
        @for (paragraph of config.letter; track paragraph) {
          <p>{{ paragraph }}</p>
        }
        <footer>
          {{ config.signature }}<strong>{{ config.sender }}</strong>
        </footer>
      </article>
      <button class="continue" (click)="continued.emit()">Seguir leyendo nuestra historia ↓</button>
    }
  </section>`,
  styles: [
    `
      .letter-stage {
        min-height: 100svh;
        padding: clamp(5rem, 10vw, 8rem) 1.2rem;
        text-align: center;
        position: relative;
      }
      .section-intro span {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        color: var(--rose);
        font-weight: 800;
      }
      .section-intro h2 {
        font: 700 clamp(3rem, 8vw, 5rem)/1 var(--script);
        color: var(--wine);
        margin: 0.5rem;
      }
      .section-intro p {
        color: var(--muted);
      }
      .envelope {
        display: block;
        position: relative;
        width: min(330px, 80vw);
        height: 210px;
        margin: 3.5rem auto 1rem;
        border: 0;
        background: linear-gradient(145deg, #f7a7ae, #df7182);
        border-radius: 0.5rem 0.5rem 1.2rem 1.2rem;
        box-shadow: 0 25px 40px #8b3a4a30;
        cursor: pointer;
        transition: 0.7s transform;
      }
      .envelope:before,
      .envelope:after {
        content: '';
        position: absolute;
        inset: 0;
        border-style: solid;
      }
      .envelope:before {
        border-width: 105px 165px;
        border-color: transparent #f9b9bd #ee969f #f8acb3;
      }
      .flap {
        position: absolute;
        z-index: 2;
        left: 0;
        top: 0;
        border-left: 165px solid transparent;
        border-right: 165px solid transparent;
        border-top: 118px solid #ffc5c7;
        transform-origin: top;
        transition: 0.7s transform;
      }
      .seal {
        position: absolute;
        z-index: 3;
        left: 50%;
        top: 46%;
        translate: -50% -50%;
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: var(--wine);
        color: #fff;
        box-shadow: 0 4px 10px #74344155;
      }
      .hint {
        position: absolute;
        top: calc(100% + 1rem);
        left: 0;
        right: 0;
        color: var(--muted);
        font: 700 0.75rem var(--sans);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .envelope.open {
        transform: translateY(15px);
      }
      .envelope.open .flap {
        transform: rotateX(180deg);
        z-index: 0;
      }
      .envelope.open .seal {
        opacity: 0;
      }
      .paper {
        position: relative;
        z-index: 4;
        width: min(700px, 92vw);
        margin: 3.5rem auto 1.5rem;
        padding: clamp(2rem, 6vw, 4.8rem);
        text-align: left;
        background: #fffdf8;
        background-image: linear-gradient(#d49b9b18 1px, transparent 1px);
        background-size: 100% 2rem;
        border-radius: 0.4rem;
        box-shadow: 0 25px 70px #6f33401c;
        animation: paper 0.8s ease both;
      }
      .paper p {
        font: 400 clamp(1rem, 2vw, 1.12rem)/1.9 var(--serif);
        color: #5e4342;
        margin: 0 0 1.35rem;
      }
      .paper .salute {
        font: 700 2rem var(--script);
        color: var(--wine);
      }
      footer {
        font: 1.6rem var(--script);
        color: var(--wine);
        margin-top: 2.5rem;
      }
      footer strong {
        display: block;
        font-size: 2.2rem;
      }
      .continue {
        border: 0;
        background: transparent;
        color: var(--rose);
        font-weight: 800;
        padding: 1rem;
        cursor: pointer;
      }
      @keyframes paper {
        from {
          opacity: 0;
          transform: translateY(-40px);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .flap,
        .envelope {
          transition: none;
        }
        .paper {
          animation: none;
        }
      }
    `,
  ],
})
export class LoveLetterComponent {
  readonly config = LOVE_CONFIG;
  readonly opened = signal(false);
  readonly continued = output<void>();
  open(): void {
    this.opened.set(true);
  }
}
