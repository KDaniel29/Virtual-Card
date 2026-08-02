import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LOVE_CONFIG } from '../../config/love.config';

@Component({
  selector: 'app-reasons-i-love-you',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './reasons-i-love-you.component.html',
  styleUrl: './reasons-i-love-you.component.scss',
})
/** Renderiza las razones personalizables como tarjetas. */
export class ReasonsILoveYouComponent {
  readonly config = LOVE_CONFIG;
}
