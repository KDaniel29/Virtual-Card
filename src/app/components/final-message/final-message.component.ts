import { Component, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LOVE_CONFIG } from '../../config/love.config';
import { ChibiBearsComponent } from '../../shared/components/chibi-bears/chibi-bears.component';

@Component({
  selector: 'app-final-message',
  standalone: true,
  imports: [ChibiBearsComponent, TranslatePipe],
  templateUrl: './final-message.component.html',
  styleUrl: './final-message.component.scss',
})
/** Cierre del recorrido y evento para regresar a la carta. */
export class FinalMessageComponent {
  readonly config = LOVE_CONFIG;
  readonly reread = output<void>();
}
