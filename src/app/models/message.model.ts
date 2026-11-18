export interface LetterMessage {
  id: string;
  title: string;
  body: string;
  createdAt: Date | null;
  readAt: Date | null;
  pending: boolean;
}

export interface MessageAccess {
  adminUid: string;
  recipientUid: string;
}

export type MessageRole = 'admin' | 'recipient';
