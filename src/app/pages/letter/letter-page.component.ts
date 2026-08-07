import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FinalMessageComponent } from '../../components/final-message/final-message.component';
import { LoveLetterComponent } from '../../components/love-letter/love-letter.component';
import { MemoryGalleryComponent } from '../../components/memory-gallery/memory-gallery.component';
import { ReasonsILoveYouComponent } from '../../components/reasons-i-love-you/reasons-i-love-you.component';
import { RelationshipTimelineComponent } from '../../components/relationship-timeline/relationship-timeline.component';

@Component({
  selector: 'app-letter-page',
  standalone: true,
  imports: [
    LoveLetterComponent,
    MemoryGalleryComponent,
    ReasonsILoveYouComponent,
    RelationshipTimelineComponent,
    FinalMessageComponent,
    TranslatePipe,
  ],
  templateUrl: './letter-page.component.html',
  styleUrl: './letter-page.component.scss',
})
/** Página contenedora del recorrido vertical posterior a la celebración. */
export class LetterPageComponent {
  private readonly router = inject(Router);

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  openSpecialQuestion(): void {
    void this.router.navigate(['/pregunta']);
  }
}
