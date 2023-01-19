import { Message } from '../../types/Message';

export interface MessageRepository {
  add({ content, userName }: { content: string; userName: string }): Message | Promise<Message>;
  getMessages(): Message[] | Promise<Message[]>;
}
