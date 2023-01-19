import { MEMORY_MESSAGE_LIMIT } from '../../constants';
import messages from '../../tests/data/messages';
import { Message } from '../../types/Message';
import { createNewMessage } from './Message';
import { MessageRepository } from './MessageRepository';

export class MessageMemoryRepository implements MessageRepository {
  private messages: Message[] = messages;

  add({ content, userName }: { content: string; userName: string }): Message {
    const message = createNewMessage({ content, userName });

    // If the store is full, remove oldest message
    if (this.messages.length === MEMORY_MESSAGE_LIMIT) {
      this.messages.shift();
    }

    this.messages.push(message);

    return message;
  }

  getMessages(): Message[] {
    return this.messages;
  }
}
