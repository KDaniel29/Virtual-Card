import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LetterMessage } from '../../models/message.model';
import { LanguageService } from '../../services/language.service';
import { MessagesService } from '../../services/messages.service';
import { MessageNotificationsService } from '../../services/message-notifications.service';

@Component({
  selector: 'app-messages-page',
  standalone: true,
  imports: [FormsModule, RouterLink, TranslatePipe],
  templateUrl: './messages-page.component.html',
  styleUrl: './messages-page.component.scss',
})
export class MessagesPageComponent {
  readonly inbox = inject(MessagesService);
  readonly notifications = inject(MessageNotificationsService);
  private readonly language = inject(LanguageService);
  readonly savedId = signal('');
  email = '';
  password = '';
  title = '';
  body = '';

  async login(): Promise<void> {
    if (!this.email.trim() || !this.password) return;
    const password = this.password;
    this.password = '';
    await this.inbox.login(this.email, password);
  }

  async publish(): Promise<void> {
    this.savedId.set('');
    const id = await this.inbox.publish(this.title, this.body);
    if (id) {
      this.savedId.set(id);
      this.title = '';
      this.body = '';
    }
  }

  async logout(): Promise<void> {
    await this.inbox.logout();
    void this.notifications.disconnect();
    this.savedId.set('');
    this.title = '';
    this.body = '';
  }

  onMessageToggle(event: Event, message: LetterMessage): void {
    if ((event.target as HTMLDetailsElement).open && this.inbox.role() === 'recipient') {
      void this.inbox.markRead(message);
    }
  }

  formatDate(date: Date | null): string {
    return date
      ? new Intl.DateTimeFormat(this.language.current(), {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(date)
      : '';
  }
}
