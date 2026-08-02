import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type SupportedLanguage = 'es' | 'en';

/** Centraliza el idioma, lo persiste y mantiene sincronizados `<html lang>` y el título. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'carta-virtual-language';
  readonly current = signal<SupportedLanguage>(this.initialLanguage());

  constructor() {
    this.setLanguage(this.current());
  }

  setLanguage(language: SupportedLanguage): void {
    this.current.set(language);
    this.document.documentElement.lang = language;
    localStorage.setItem(this.storageKey, language);
    this.translate.use(language).subscribe(() => {
      this.document.title = this.translate.instant('APP.TITLE');
    });
  }

  private initialLanguage(): SupportedLanguage {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'es' || saved === 'en') return saved;
    return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es';
  }
}
