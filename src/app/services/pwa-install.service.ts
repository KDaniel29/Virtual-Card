import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

/** Guarda la invitación del navegador hasta que la persona decida instalar. */
@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly displayMode = window.matchMedia('(display-mode: standalone)');
  private readonly deferredPrompt = signal<InstallPromptEvent | null>(null);
  readonly installed = signal(this.isStandalone());
  readonly installing = signal(false);
  readonly failed = signal(false);
  readonly canInstall = computed(() => !!this.deferredPrompt() && !this.installed());
  readonly isSecure = window.isSecureContext;
  readonly isIos =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  constructor() {
    const beforeInstall = (event: Event): void => {
      event.preventDefault();
      this.deferredPrompt.set(event as InstallPromptEvent);
    };
    const installed = (): void => {
      this.installed.set(true);
      this.deferredPrompt.set(null);
    };
    const displayChanged = (): void => this.installed.set(this.isStandalone());

    window.addEventListener('beforeinstallprompt', beforeInstall);
    window.addEventListener('appinstalled', installed);
    this.displayMode.addEventListener('change', displayChanged);
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('beforeinstallprompt', beforeInstall);
      window.removeEventListener('appinstalled', installed);
      this.displayMode.removeEventListener('change', displayChanged);
    });
  }

  async install(): Promise<void> {
    const prompt = this.deferredPrompt();
    if (!prompt || this.installing()) return;

    this.installing.set(true);
    this.failed.set(false);
    this.deferredPrompt.set(null);
    try {
      await prompt.prompt();
      await prompt.userChoice;
      // La aceptación del diálogo no confirma la instalación: esperamos appinstalled.
    } catch {
      this.failed.set(true);
    } finally {
      this.installing.set(false);
    }
  }

  private isStandalone(): boolean {
    return (
      this.displayMode.matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    );
  }
}
