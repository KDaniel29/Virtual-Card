import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-hearts',
  standalone: true,
  templateUrl: './floating-hearts.component.html',
  styleUrl: './floating-hearts.component.scss',
})
/** Fondo decorativo compartido y presente durante todo el recorrido. */
export class FloatingHeartsComponent {
  readonly hearts = ['♥', '✦', '♡', '✿', '♥', '✧', '♡', '♥'];
}
