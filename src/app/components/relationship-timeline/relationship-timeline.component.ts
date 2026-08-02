import { Component } from '@angular/core';
import { LOVE_CONFIG } from '../../config/love.config';

@Component({
  selector: 'app-relationship-timeline',
  standalone: true,
  templateUrl: './relationship-timeline.component.html',
  styleUrl: './relationship-timeline.component.scss',
})
/** Presenta cronológicamente los eventos definidos en la configuración. */
export class RelationshipTimelineComponent {
  readonly config = LOVE_CONFIG;
}
