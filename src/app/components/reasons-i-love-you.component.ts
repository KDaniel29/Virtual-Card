import { Component } from '@angular/core';
import { LOVE_CONFIG } from '../config/love.config';
@Component({
  selector: 'app-reasons-i-love-you',
  standalone: true,
  template: `<section class="section" id="razones">
    <header>
      <span>Lo que haces especial</span>
      <h2>Lo que amo de ti</h2>
      <p>Podría seguir llenando tarjetas y nunca terminar.</p>
    </header>
    <div class="reasons">
      @for (reason of config.reasons; track reason; let i = $index) {
        <article>
          <b>0{{ i + 1 }}</b
          ><span>♥</span>
          <p>{{ reason }}</p>
        </article>
      }
    </div>
  </section>`,
  styles: [
    `
      .reasons {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
      }
      .reasons article {
        min-height: 190px;
        padding: 1.2rem;
        border: 1px solid #efd8d1;
        background: rgba(255, 255, 255, 0.55);
        border-radius: 1.4rem;
        display: flex;
        flex-direction: column;
        transition:
          0.3s transform,
          0.3s background;
      }
      .reasons article:hover {
        transform: translateY(-6px);
        background: #fff;
      }
      .reasons b {
        font-size: 0.72rem;
        letter-spacing: 0.12em;
        color: #b98680;
      }
      .reasons span {
        font-size: 1.5rem;
        color: var(--rose);
        margin: auto 0;
      }
      .reasons p {
        font: 700 1.55rem/1.2 var(--script);
        color: var(--wine);
      }
      @media (max-width: 850px) {
        .reasons {
          grid-template-columns: repeat(2, 1fr);
        }
        .reasons article:last-child {
          grid-column: 1/-1;
        }
      }
      @media (max-width: 480px) {
        .reasons {
          grid-template-columns: 1fr;
        }
        .reasons article:last-child {
          grid-column: auto;
        }
      }
    `,
  ],
})
export class ReasonsILoveYouComponent {
  readonly config = LOVE_CONFIG;
}
