import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type SupportedLanguage = 'es' | 'en';

/** Centraliza el idioma, lo persiste y mantiene sincronizados `<html lang>` y el título. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  readonly current = signal<SupportedLanguage>(this.initialLanguage());

  constructor() {
    this.setLanguage(this.current());
  }

  setLanguage(language: SupportedLanguage): void {
    this.current.set(language);
    this.document.documentElement.lang = language;
    this.translate.use(language).subscribe(() => {
      this.document.title = this.translate.instant('APP.TITLE');
    });
  }

  private initialLanguage(): SupportedLanguage {
    return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es';
  }
}
