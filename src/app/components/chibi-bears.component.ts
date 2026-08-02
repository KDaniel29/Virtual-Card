import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-chibi-bears',
  standalone: true,
  template: `<figure [class.compact]="compact">
    <img
      src="assets/images/chibi-bears.png"
      alt="Dos ositos chibi enamorados sosteniendo un corazón"
    /><span aria-hidden="true">♥</span>
  </figure>`,
  styles: [
    `
      figure {
        position: relative;
        margin: 0 auto;
        width: min(100%, 35rem);
        animation: breathe 4s ease-in-out infinite;
      }
      figure.compact {
        width: min(100%, 27rem);
      }
      img {
        display: block;
        width: 100%;
        border-radius: 2rem;
        filter: drop-shadow(0 18px 24px rgba(120, 53, 61, 0.16));
      }
      span {
        position: absolute;
        right: 5%;
        top: 8%;
        color: #d75b70;
        font-size: 1.5rem;
        animation: pulse 1.8s infinite;
      }
      @keyframes breathe {
        50% {
          transform: translateY(-5px);
        }
      }
      @keyframes pulse {
        50% {
          transform: scale(1.25);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        figure,
        span {
          animation: none;
        }
      }
    `,
  ],
})
export class ChibiBearsComponent {
  @Input() compact = false;
}
