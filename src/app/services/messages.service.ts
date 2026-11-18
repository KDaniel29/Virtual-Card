import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { FirebaseError, initializeApp } from 'firebase/app';
import {
  Auth,
  browserLocalPersistence,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  initializeFirestore,
  memoryLocalCache,
  onSnapshot,
  orderBy,
  persistentLocalCache,
  persistentMultipleTabManager,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  Unsubscribe,
  updateDoc,
} from 'firebase/firestore';
import { isMessagingConfigured, MESSAGES_CONFIG } from '../config/messages.config';
import { LetterMessage, MessageAccess, MessageRole } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private readonly destroyRef = inject(DestroyRef);
  private auth?: Auth;
  private db?: Firestore;
  private access: MessageAccess | null = null;
  private stopMessages?: Unsubscribe;
  private authVersion = 0;
  private readonly currentUser = signal<User | null>(null);
  readonly configured = isMessagingConfigured();
  readonly ready = signal(!this.configured);
  readonly busy = signal(false);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly role = signal<MessageRole | null>(null);
  readonly email = computed(() => this.currentUser()?.email ?? '');
  readonly messages = signal<LetterMessage[]>([]);
  readonly loading = signal(false);
  readonly fromCache = signal(false);
  readonly online = signal(navigator.onLine);
  readonly unread = computed(() => this.messages().filter((message) => !message.readAt).length);

  constructor() {
    const updateOnline = (): void => this.online.set(navigator.onLine);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    this.destroyRef.onDestroy(() => {
      this.authVersion++;
      this.stopMessages?.();
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    });
    if (!this.configured) return;

    try {
      const app = initializeApp(MESSAGES_CONFIG.firebase, 'private-messages');
      this.auth = initializeAuth(app, { persistence: browserLocalPersistence });
      this.db = initializeFirestore(app, {
        localCache:
          typeof indexedDB === 'undefined'
            ? memoryLocalCache()
            : persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      });
      const stopAuth = onAuthStateChanged(this.auth, (user) => void this.loadAccount(user));
      this.destroyRef.onDestroy(stopAuth);
    } catch {
      this.error.set('MESSAGES.ERROR.CONNECTION');
      this.ready.set(true);
    }
  }

  async login(email: string, password: string): Promise<void> {
    if (!this.auth || this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    try {
      await signInWithEmailAndPassword(this.auth, email.trim(), password);
    } catch (error) {
      this.error.set(
        error instanceof FirebaseError && error.code === 'auth/network-request-failed'
          ? 'MESSAGES.ERROR.CONNECTION'
          : 'MESSAGES.ERROR.LOGIN',
      );
    } finally {
      this.busy.set(false);
    }
  }

  async logout(): Promise<void> {
    if (!this.auth || this.saving()) return;
    try {
      await signOut(this.auth);
    } catch {
      this.error.set('MESSAGES.ERROR.CONNECTION');
    }
  }

  async publish(title: string, body: string): Promise<string | null> {
    const user = this.currentUser();
    if (!this.db || !user || this.role() !== 'admin' || !this.access || this.saving()) return null;
    if (!this.online()) {
      this.error.set('MESSAGES.ERROR.OFFLINE');
      return null;
    }
    const cleanTitle = title.trim();
    const cleanBody = body.trim();
    if (!cleanTitle || cleanTitle.length > 80 || !cleanBody || cleanBody.length > 2000) {
      this.error.set('MESSAGES.ERROR.VALIDATION');
      return null;
    }
    this.saving.set(true);
    this.error.set('');
    try {
      const message = doc(collection(this.db, 'messages'));
      await setDoc(message, {
        title: cleanTitle,
        body: cleanBody,
        senderUid: user.uid,
        recipientUid: this.access.recipientUid,
        createdAt: serverTimestamp(),
        readAt: null,
      });
      return message.id;
    } catch {
      this.error.set('MESSAGES.ERROR.SAVE');
      return null;
    } finally {
      this.saving.set(false);
    }
  }

  async markRead(message: LetterMessage): Promise<void> {
    if (!this.db || this.role() !== 'recipient' || message.readAt || message.pending) return;
    this.error.set('');
    try {
      await updateDoc(doc(this.db, 'messages', message.id), { readAt: serverTimestamp() });
    } catch {
      this.error.set('MESSAGES.ERROR.SAVE');
    }
  }

  private async loadAccount(user: User | null): Promise<void> {
    const version = ++this.authVersion;
    this.stopMessages?.();
    this.stopMessages = undefined;
    this.currentUser.set(user);
    this.role.set(null);
    this.messages.set([]);
    this.access = null;
    this.loading.set(false);
    this.fromCache.set(false);
    this.error.set('');
    this.ready.set(!user);
    if (!user || !this.db) return;

    try {
      const access = await getDoc(doc(this.db, 'settings', 'access'));
      if (version !== this.authVersion) return;
      const data = access.data();
      const adminUid = data?.['adminUid'];
      const recipientUid = data?.['recipientUid'];
      if (
        typeof adminUid !== 'string' ||
        typeof recipientUid !== 'string' ||
        !adminUid ||
        !recipientUid ||
        adminUid === recipientUid ||
        (user.uid !== adminUid && user.uid !== recipientUid)
      ) {
        throw new Error('Account is not a member');
      }
      this.access = { adminUid, recipientUid };
      this.role.set(user.uid === adminUid ? 'admin' : 'recipient');
      this.loading.set(true);
      this.stopMessages = onSnapshot(
        query(collection(this.db, 'messages'), orderBy('createdAt', 'desc')),
        { includeMetadataChanges: true },
        (snapshot) => {
          if (version !== this.authVersion) return;
          this.messages.set(
            snapshot.docs.map((message) => {
              const value = message.data({ serverTimestamps: 'estimate' });
              return {
                id: message.id,
                title: String(value['title'] ?? ''),
                body: String(value['body'] ?? ''),
                createdAt:
                  value['createdAt'] instanceof Timestamp ? value['createdAt'].toDate() : null,
                readAt: value['readAt'] instanceof Timestamp ? value['readAt'].toDate() : null,
                pending: message.metadata.hasPendingWrites,
              };
            }),
          );
          this.fromCache.set(snapshot.metadata.fromCache);
          this.loading.set(false);
        },
        () => {
          if (version !== this.authVersion) return;
          this.error.set('MESSAGES.ERROR.LOAD');
          this.loading.set(false);
        },
      );
    } catch {
      if (version !== this.authVersion) return;
      this.error.set(this.online() ? 'MESSAGES.ERROR.ACCESS' : 'MESSAGES.ERROR.CONNECTION');
    } finally {
      if (version === this.authVersion) this.ready.set(true);
    }
  }
}
