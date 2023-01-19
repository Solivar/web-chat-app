import { MessageRepository } from './data/message/MessageRepository';
import { User } from './types/User';
import { UserRepository } from './data/user/UserRepository';
import { Message } from './types/Message';
import { UserMemoryRepository } from './data/user/UserMemoryRepository';
import { MessageMemoryRepository } from './data/message/MessageMemoryRepository';
import { MessageRedisRepository } from './data/message/MessageRedisRepository';
import { client } from './redis';
import { UserRedisRepository } from './data/user/UserRedisRepository';

let store: Store;

export default async function getStore() {
  if (store) {
    return store;
  } else {
    await initStore();

    return store;
  }
}

export async function initStore(): Promise<void> {
  if (process.env.REDIS_URL) {
    await client.connect();
    store = new Store(new UserRedisRepository(), new MessageRedisRepository());
  } else {
    store = new Store(new UserMemoryRepository(), new MessageMemoryRepository());
  }
}

export class Store {
  private userRepository: UserRepository;
  private messageRepository: MessageRepository;

  constructor(userRepository: UserRepository, messageRepository: MessageRepository) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
  }

  public async userExists(name: string) {
    const user = await this.userRepository.nameExists(name);

    if (user) {
      return true;
    }

    return false;
  }

  public async addUser({ id, name }: { id: string; name: string }): Promise<User> {
    const addedUser = await this.userRepository.add({ id, name });

    return addedUser;
  }

  public async removeUser(name: string) {
    const removedName = await this.userRepository.remove(name);

    return removedName;
  }

  public async getUserNames() {
    return await this.userRepository.getNames();
  }

  public async addMessage({
    content,
    userName,
  }: {
    content: string;
    userName: string;
  }): Promise<Message> {
    const addedMessage = await this.messageRepository.add({ content, userName });

    return addedMessage;
  }

  public async getMessages(): Promise<Message[]> {
    return await this.messageRepository.getMessages();
  }
}
