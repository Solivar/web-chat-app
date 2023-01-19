import { client as redisClient } from '../../redis';
import { Message } from '../../types/Message';
import { createNewMessage } from './Message';
import { MessageRepository } from './MessageRepository';

export class MessageRedisRepository implements MessageRepository {
  private client = redisClient;

  async add({ content, userName }: { content: string; userName: string }): Promise<Message> {
    const message = createNewMessage({ content, userName });

    return message;
  }

  async getMessages(): Promise<Message[]> {
    return [];
  }
}
