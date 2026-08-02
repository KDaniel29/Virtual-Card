import { Component } from '@angular/core';
import { LOVE_CONFIG } from '../config/love.config';
@Component({
  selector: 'app-memory-gallery',
  standalone: true,
  template: `<section class="section soft" id="momentos">
    <header>
      <span>Álbum de los dos</span>
      <h2>Nuestros momentos</h2>
      <p>Pequeños espacios esperando nuestras fotos favoritas.</p>
    </header>
    <div class="gallery">
      @for (memory of config.memories; track memory.title; let i = $index) {
        <article [class.tilt]="i % 2">
          <div class="photo">
            @if (memory.image) {
              <img [src]="memory.image" [alt]="memory.title" />
            } @else {
              <span aria-hidden="true">{{ icons[i] }}</span
              ><small>Aquí va nuestra foto</small>
            }
          </div>
          <h3>{{ memory.title }}</h3>
          <p>{{ memory.caption }}</p>
        </article>
      }
    </div>
  </section>`,
  styles: [
    `
      .soft {
        background: #fff9f5;
      }
      .gallery {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.2rem;
      }
      .gallery article {
        background: #fff;
        padding: 0.7rem 0.7rem 1.2rem;
        box-shadow: 0 14px 35px #7e3f4b17;
        border-radius: 0.7rem;
        transition: 0.3s transform;
      }
      .gallery article:hover {
        transform: translateY(-7px) rotate(-1deg);
      }
      .gallery article.tilt {
        transform: rotate(1.2deg);
      }
      .photo {
        aspect-ratio: 4/3;
        background: linear-gradient(145deg, #fce4e1, #fff4dc);
        display: grid;
        place-content: center;
        border-radius: 0.4rem;
        color: var(--rose);
      }
      .photo span {
        text-align: center;
        font-size: 2.5rem;
      }
      .photo small {
        display: block;
        color: var(--muted);
        margin-top: 0.4rem;
      }
      .photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.4rem;
      }
      .gallery h3 {
        font: 700 1.55rem var(--script);
        color: var(--wine);
        margin: 1rem 0.5rem 0.2rem;
      }
      .gallery p {
        color: var(--muted);
        font-size: 0.88rem;
        margin: 0.2rem 0.5rem;
      }
      @media (max-width: 820px) {
        .gallery {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 480px) {
        .gallery {
          grid-template-columns: 1fr;
        }
        .gallery article.tilt {
          transform: none;
        }
      }
    `,
  ],
})
export class MemoryGalleryComponent {
  readonly config = LOVE_CONFIG;
  readonly icons = ['📷', '🌷', '✨', '🗺️'];
}
