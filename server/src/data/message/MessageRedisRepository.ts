import { client as redisClient } from '../../redis';
import { Message } from '../../types/Message';
import { createNewMessage } from './Message';
import { MessageRepository } from './MessageRepository';

export class MessageRedisRepository implements MessageRepository {
  private client = redisClient;

  async add({ content, userName }: { content: string; userName: string }): Promise<Message> {
    const message = createNewMessage({ content, userName });

    this.client.zAdd('messages', [
      {
        score: message.timestamp,
        value: JSON.stringify(message),
      },
    ]);

    return message;
  }

  async getMessages(): Promise<Message[]> {
    const messages = await this.client.zRange('messages', 0, -1);

    return messages.map(message => JSON.parse(message));
  }
}
