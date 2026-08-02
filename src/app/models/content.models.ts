export interface Memory {
  title: string;
  caption: string;
  image?: string;
}
export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}
export interface LoveConfig {
  recipient: string;
  sender: string;
  eyebrow: string;
  question: string;
  letter: string[];
  signature: string;
  reasons: string[];
  memories: Memory[];
  timeline: TimelineEvent[];
  finalMessage: string;
}
