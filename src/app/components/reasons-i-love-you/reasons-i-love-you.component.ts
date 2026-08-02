import { Component } from '@angular/core';
import { LOVE_CONFIG } from '../../config/love.config';

@Component({
  selector: 'app-reasons-i-love-you',
  standalone: true,
  templateUrl: './reasons-i-love-you.component.html',
  styleUrl: './reasons-i-love-you.component.scss',
})
/** Renderiza las razones personalizables como tarjetas. */
export class ReasonsILoveYouComponent {
  readonly config = LOVE_CONFIG;
}
