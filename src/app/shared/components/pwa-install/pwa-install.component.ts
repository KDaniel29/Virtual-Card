import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PwaInstallService } from '../../../services/pwa-install.service';

@Component({
  selector: 'app-pwa-install',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './pwa-install.component.html',
  styleUrl: './pwa-install.component.scss',
})
export class PwaInstallComponent {
  readonly pwa = inject(PwaInstallService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('installDialog');
  private readonly ready = signal(false);
  private readonly dismissed = signal(this.wasDismissed());
  private previousOverflow: string | null = null;

  constructor() {
    afterNextRender(() => {
      const timer = window.setTimeout(() => this.ready.set(true), 1500);
      this.destroyRef.onDestroy(() => window.clearTimeout(timer));
    });

    effect(() => {
      const dialog = this.dialog()?.nativeElement;
      if (!dialog) return;

      if (this.ready() && this.pwa.isSecure && !this.pwa.installed() && !this.dismissed()) {
        if (!dialog.open) {
          this.previousOverflow = this.document.documentElement.style.overflow;
          this.document.documentElement.style.overflow = 'hidden';
          dialog.showModal();
        }
      } else {
        if (dialog.open) dialog.close();
        this.restoreScroll();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.dialog()?.nativeElement.close();
      this.restoreScroll();
    });
  }

  dismiss(): void {
    this.dismissed.set(true);
    try {
      sessionStorage.setItem('pwa-install-dismissed', 'true');
    } catch {
      // El modal también puede cerrarse si el navegador bloquea el almacenamiento.
    }
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.dismiss();
  }

  onBackdropClick(event: MouseEvent): void {
    const dialog = this.dialog()?.nativeElement;
    if (!dialog || event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      this.dismiss();
    }
  }

  private wasDismissed(): boolean {
    try {
      return sessionStorage.getItem('pwa-install-dismissed') === 'true';
    } catch {
      return false;
    }
  }

  private restoreScroll(): void {
    if (this.previousOverflow !== null) {
      this.document.documentElement.style.overflow = this.previousOverflow;
      this.previousOverflow = null;
    }
  }
}
