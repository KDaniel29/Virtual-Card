import { Injectable, signal } from '@angular/core';
export type JourneyStep = 'question' | 'celebration' | 'letter';
@Injectable({ providedIn: 'root' })
export class JourneyService {
  readonly step = signal<JourneyStep>('question');
  goTo(step: JourneyStep): void {
    this.step.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
