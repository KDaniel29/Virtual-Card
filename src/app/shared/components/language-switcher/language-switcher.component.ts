import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService, SupportedLanguage } from '../../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
/** Selector global español/inglés que permanece visible en todas las rutas. */
export class LanguageSwitcherComponent {
  readonly language = inject(LanguageService);

  select(language: SupportedLanguage): void {
    this.language.setLanguage(language);
  }
}
