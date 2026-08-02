import { Component, output } from '@angular/core';
import { ChibiBearsComponent } from './chibi-bears.component';
import { LOVE_CONFIG } from '../config/love.config';
@Component({
  selector: 'app-final-message',
  standalone: true,
  imports: [ChibiBearsComponent],
  template: `<section class="final">
    <div>
      <app-chibi-bears [compact]="true" />
      <p>{{ config.finalMessage }}</p>
      <button (click)="reread.emit()">Volver a leer la carta ↟</button>
    </div>
    <footer>Hecho con paciencia, ternura y mucho amor <span>♥</span></footer>
  </section>`,
  styles: [
    `
      .final {
        min-height: 100svh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5rem 1.2rem 2rem;
        text-align: center;
        background: radial-gradient(circle at center, #fff 0, #fff5ef 60%, #f7ddd9);
      }
      .final > div {
        width: min(720px, 100%);
      }
      .final p {
        font: 700 clamp(2rem, 5vw, 3.3rem)/1.25 var(--script);
        color: var(--wine);
      }
      button {
        border: 1px solid #d8aaa6;
        background: #fff9f5;
        color: var(--wine);
        border-radius: 999px;
        padding: 1rem 1.5rem;
        font-weight: 800;
        cursor: pointer;
      }
      footer {
        margin-top: auto;
        padding-top: 4rem;
        color: var(--muted);
        font-size: 0.8rem;
      }
      footer span {
        color: var(--rose);
      }
    `,
  ],
})
export class FinalMessageComponent {
  readonly config = LOVE_CONFIG;
  readonly reread = output<void>();
}
