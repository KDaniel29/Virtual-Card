import { Component } from '@angular/core';
@Component({
  selector: 'app-floating-hearts',
  standalone: true,
  template: `<div class="hearts" aria-hidden="true">
    @for (heart of hearts; track $index) {
      <span [style.--i]="$index">{{ heart }}</span>
    }
  </div>`,
  styles: [
    `
      .hearts {
        position: fixed;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
      }
      .hearts span {
        position: absolute;
        bottom: -3rem;
        left: calc((var(--i) * 13% + 4%));
        font-size: clamp(0.8rem, 2vw, 1.4rem);
        opacity: 0.24;
        animation: rise calc(12s + var(--i) * 1s) linear infinite;
        animation-delay: calc(var(--i) * -2.1s);
      }
      @keyframes rise {
        to {
          transform: translateY(-110vh) rotate(30deg);
          opacity: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .hearts {
          display: none;
        }
      }
    `,
  ],
})
export class FloatingHeartsComponent {
  readonly hearts = ['♥', '✦', '♡', '✿', '♥', '✧', '♡', '♥'];
}
