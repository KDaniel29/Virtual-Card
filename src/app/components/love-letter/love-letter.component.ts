import {
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LOVE_CONFIG } from '../../config/love.config';

const WORDS_PER_PAGE = 250;

@Component({
  selector: 'app-love-letter',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './love-letter.component.html',
  styleUrl: './love-letter.component.scss',
})
/** Controla la apertura del sobre y revela el contenido configurado de la carta. */
export class LoveLetterComponent {
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly config = LOVE_CONFIG;
  readonly openInitially = input(false);
  readonly opened = signal(false);
  readonly continued = output<void>();
  readonly pages = signal<string[][]>([]);
  readonly currentPageIndex = signal(0);
  readonly pageDirection = signal<'next' | 'previous'>('next');
  readonly letterPaper = viewChild<ElementRef<HTMLElement>>('letterPaper');
  readonly visiblePage = computed(() => {
    const page = this.pages()[this.currentPageIndex()];
    return page ? [page] : [];
  });

  constructor() {
    effect(() => {
      if (this.openInitially()) this.opened.set(true);
    });

    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.createPages();
    });
    this.createPages();
  }

  open(): void {
    this.opened.set(true);
  }

  previousPage(): void {
    if (this.currentPageIndex() === 0) return;
    this.pageDirection.set('previous');
    this.currentPageIndex.update((index) => index - 1);
  }

  nextPage(): void {
    if (this.currentPageIndex() >= this.pages().length - 1) return;
    this.pageDirection.set('next');
    this.currentPageIndex.update((index) => index + 1);
    setTimeout(() => {
      this.letterPaper()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  private createPages(): void {
    const translatedParagraphs = this.config.letter.map((key) =>
      String(this.translate.instant(key)),
    );
    const pages: string[][] = [];
    let page: string[] = [];
    let pageWordCount = 0;

    for (const paragraph of translatedParagraphs) {
      const words = paragraph.trim().split(/\s+/).filter(Boolean);
      let offset = 0;

      while (offset < words.length) {
        const availableWords = WORDS_PER_PAGE - pageWordCount;

        if (availableWords === 0) {
          pages.push(page);
          page = [];
          pageWordCount = 0;
          continue;
        }

        const fragment = words.slice(offset, offset + availableWords);
        page.push(fragment.join(' '));
        pageWordCount += fragment.length;
        offset += fragment.length;

        if (offset < words.length) {
          pages.push(page);
          page = [];
          pageWordCount = 0;
        }
      }
    }

    if (page.length || pages.length === 0) pages.push(page);
    this.pages.set(pages);
    this.currentPageIndex.set(0);
  }
}
