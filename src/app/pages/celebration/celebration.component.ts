import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChibiBearsComponent } from '../../shared/components/chibi-bears/chibi-bears.component';

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [ChibiBearsComponent],
  templateUrl: './celebration.component.html',
  styleUrl: './celebration.component.scss',
})
/** Segunda página: celebra la respuesta y permite abrir la carta. */
export class CelebrationComponent {
  private readonly router = inject(Router);
  readonly pieces = ['♥', '✦', '🌸', '♡', '✧', '♥', '🌷', '♡', '✦', '♥', '🌸', '♡'];

  openLetter(): void {
    void this.router.navigate(['/carta']);
  }
}
