import { DOCUMENT } from '@angular/common';
import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { OneSignal } from 'onesignal-ngx';
import { MESSAGES_CONFIG } from '../config/messages.config';
import { MessagesService } from './messages.service';

/** El envío se realiza desde OneSignal; aquí solo se solicita la suscripción. */
@Injectable({ providedIn: 'root' })
export class MessageNotificationsService {
  private readonly sdk = inject(OneSignal);
  private readonly inbox = inject(MessagesService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private initialized = false;
  private initialization?: Promise<void>;
  readonly configured = !!MESSAGES_CONFIG.oneSignalAppId.trim();
  readonly busy = signal(false);
  readonly error = signal('');
  readonly subscribed = signal(false);
  readonly ready = signal(false);
  readonly supported =
    window.isSecureContext && 'Notification' in window && 'serviceWorker' in navigator;
  readonly needsIosInstall =
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !window.matchMedia('(display-mode: standalone)').matches &&
    !(navigator as Navigator & { standalone?: boolean }).standalone;
  readonly canSubscribe = computed(() => this.ready() && !this.busy());

  constructor() {
    effect(() => {
      if (
        this.inbox.role() === 'recipient' &&
        this.configured &&
        this.supported &&
        !this.needsIosInstall
      ) {
        void this.initialize().catch(() => this.error.set('MESSAGES.NOTIFICATIONS.ERROR'));
      }
    });
  }

  async subscribe(): Promise<void> {
    if (this.inbox.role() !== 'recipient' || !this.ready() || this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    try {
      // Se invoca directamente desde el clic, con el SDK ya preparado.
      const granted = await this.sdk.Notifications.requestPermission();
      if (!granted) {
        this.error.set('MESSAGES.NOTIFICATIONS.DENIED');
        return;
      }
      await this.sdk.User.PushSubscription.optIn();
      this.subscribed.set(this.sdk.User.PushSubscription.optedIn === true);
    } catch {
      this.error.set('MESSAGES.NOTIFICATIONS.ERROR');
    } finally {
      this.busy.set(false);
    }
  }

  async disconnect(): Promise<void> {
    if (!this.initialized) return;
    try {
      await this.sdk.User.PushSubscription.optOut();
      this.subscribed.set(false);
    } catch {
      this.error.set('MESSAGES.NOTIFICATIONS.ERROR');
    }
  }

  private initialize(): Promise<void> {
    if (this.initialization) return this.initialization;
    const base = new URL(this.document.baseURI);
    const worker = new URL('onesignal/OneSignalSDKWorker.js', base);
    const scope = new URL('onesignal/', base);
    this.initialization = this.sdk
      .init({
        appId: MESSAGES_CONFIG.oneSignalAppId,
        serviceWorkerPath: worker.pathname.replace(/^\//, ''),
        serviceWorkerParam: { scope: scope.pathname },
        allowLocalhostAsSecureOrigin: true,
        autoResubscribe: false,
        welcomeNotification: { disable: true, message: '' },
        promptOptions: { slidedown: { prompts: [{ type: 'push', autoPrompt: false, delay: {} }] } },
      })
      .then(async () => {
        this.initialized = true;
        await this.sdk.Notifications.setDefaultUrl(new URL('#/mensajes', base).href);
        const updateSubscription = (): void => {
          this.subscribed.set(this.sdk.User.PushSubscription.optedIn === true);
        };
        updateSubscription();
        this.sdk.User.PushSubscription.addEventListener('change', updateSubscription);
        this.destroyRef.onDestroy(() => {
          this.sdk.User.PushSubscription.removeEventListener('change', updateSubscription);
        });
        this.ready.set(true);
      });
    return this.initialization;
  }
}
