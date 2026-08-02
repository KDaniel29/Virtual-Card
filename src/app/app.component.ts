import { Component, inject } from '@angular/core';
import { FloatingHeartsComponent } from './components/floating-hearts.component';
import { HomeQuestionComponent } from './components/home-question.component';
import { CelebrationComponent } from './components/celebration.component';
import { LoveLetterComponent } from './components/love-letter.component';
import { MemoryGalleryComponent } from './components/memory-gallery.component';
import { ReasonsILoveYouComponent } from './components/reasons-i-love-you.component';
import { RelationshipTimelineComponent } from './components/relationship-timeline.component';
import { FinalMessageComponent } from './components/final-message.component';
import { MusicPlayerComponent } from './components/music-player.component';
import { JourneyService } from './services/journey.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FloatingHeartsComponent,
    HomeQuestionComponent,
    CelebrationComponent,
    LoveLetterComponent,
    MemoryGalleryComponent,
    ReasonsILoveYouComponent,
    RelationshipTimelineComponent,
    FinalMessageComponent,
    MusicPlayerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly journey = inject(JourneyService);

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
