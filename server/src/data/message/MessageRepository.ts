import { Message } from '../../types/Message';

export interface MessageRepository {
  add({ content, userName }: { content: string; userName: string }): Message;
  getMessages(): Message[];
}
