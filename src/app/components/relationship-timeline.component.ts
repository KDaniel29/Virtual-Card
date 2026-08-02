import { Component } from '@angular/core';
import { LOVE_CONFIG } from '../config/love.config';
@Component({
  selector: 'app-relationship-timeline',
  standalone: true,
  template: `<section class="section timeline-section" id="historia">
    <header>
      <span>Érase una vez…</span>
      <h2>Nuestra historia</h2>
    </header>
    <div class="timeline">
      @for (event of config.timeline; track event.title; let i = $index) {
        <article>
          <div class="dot">{{ i + 1 }}</div>
          <div>
            <small>{{ event.date }}</small>
            <h3>{{ event.title }}</h3>
            <p>{{ event.description }}</p>
          </div>
        </article>
      }
    </div>
  </section>`,
  styles: [
    `
      .timeline-section {
        background: linear-gradient(180deg, #fff9f5, #fbe9e8);
      }
      .timeline {
        width: min(700px, 100%);
        margin: auto;
        position: relative;
      }
      .timeline:before {
        content: '';
        position: absolute;
        left: 22px;
        top: 10px;
        bottom: 10px;
        width: 1px;
        background: #dca5a3;
      }
      .timeline article {
        display: grid;
        grid-template-columns: 46px 1fr;
        gap: 1.5rem;
        padding: 1rem 0 2.5rem;
      }
      .dot {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: var(--wine);
        color: #fff;
        display: grid;
        place-items: center;
        font-weight: 800;
        z-index: 1;
        box-shadow: 0 0 0 8px #fbe9e8;
      }
      .timeline small {
        color: var(--rose);
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }
      .timeline h3 {
        font: 700 2rem var(--script);
        color: var(--wine);
        margin: 0.25rem 0;
      }
      .timeline p {
        color: var(--muted);
        margin: 0;
      }
    `,
  ],
})
export class RelationshipTimelineComponent {
  readonly config = LOVE_CONFIG;
}
