import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FinalMessageComponent } from '../../components/final-message/final-message.component';
import { LoveLetterComponent } from '../../components/love-letter/love-letter.component';
import { MemoryGalleryComponent } from '../../components/memory-gallery/memory-gallery.component';
import { ReasonsILoveYouComponent } from '../../components/reasons-i-love-you/reasons-i-love-you.component';
import { RelationshipTimelineComponent } from '../../components/relationship-timeline/relationship-timeline.component';
import { SpotifyCardComponent } from '../../components/spotify-card/spotify-card.component';

@Component({
  selector: 'app-letter-page',
  standalone: true,
  imports: [
    LoveLetterComponent,
    MemoryGalleryComponent,
    ReasonsILoveYouComponent,
    RelationshipTimelineComponent,
    SpotifyCardComponent,
    FinalMessageComponent,
    TranslatePipe,
  ],
  templateUrl: './letter-page.component.html',
  styleUrl: './letter-page.component.scss',
})
/** Página contenedora del recorrido vertical posterior a la celebración. */
export class LetterPageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  readonly openLetterInitially = this.route.snapshot.queryParamMap.get('open') === 'true';
  readonly activeSection = signal('carta');

  constructor() {
    afterNextRender(() => this.trackActiveSection());
  }

  scrollTo(id: string): void {
    this.activeSection.set(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  openSpecialQuestion(): void {
    void this.router.navigate(['/pregunta']);
  }

  private trackActiveSection(): void {
    const sectionIds = [
      'carta',
      'banda-sonora',
      'momentos',
      'razones',
      'historia',
      'pregunta-especial',
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const navbar = document.querySelector<HTMLElement>('nav');
    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      const activationLine = (navbar?.getBoundingClientRect().bottom ?? 80) + 24;
      const sectionAtLine = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= activationLine && bounds.bottom > activationLine;
      });
      const nearestPreviousSection = [...sections]
        .reverse()
        .find((section) => section.getBoundingClientRect().top <= activationLine);
      const active = sectionAtLine ?? nearestPreviousSection ?? sections[0];

      if (active) this.activeSection.set(active.id);
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    scheduleUpdate();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    });
  }
}
