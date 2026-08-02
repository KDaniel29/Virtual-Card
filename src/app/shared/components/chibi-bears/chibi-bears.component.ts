import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-chibi-bears',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './chibi-bears.component.html',
  styleUrl: './chibi-bears.component.scss',
})
/** Ilustración compartida por las páginas de pregunta, celebración y mensaje final. */
export class ChibiBearsComponent {
  @Input() compact = false;
}
