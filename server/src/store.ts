import { MessageRepository } from './data/message/MessageRepository';
import { User } from './types/User';
import { UserRepository } from './data/user/UserRepository';
import { Message } from './types/Message';

export default class Store {
  private userRepository: UserRepository;
  private messageRepository: MessageRepository;

  constructor(userRepository: UserRepository, messageRepository: MessageRepository) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
  }

  public userExists(name: string) {
    const user = this.userRepository.findByName(name);

    if (user) {
      return true;
    }

    return false;
  }

  public addUser({ id, name }: { id: string; name: string }): User {
    const addedUser = this.userRepository.add({ id, name });

    return addedUser;
  }

  public removeUser(id: string) {
    const removedName = this.userRepository.remove(id);

    return removedName;
  }

  public getUserNames() {
    return this.userRepository.getNames();
  }

  public addMessage({ content, userName }: { content: string; userName: string }): Message {
    const addedMessage = this.messageRepository.add({ content, userName });

    return addedMessage;
  }

  public getMessages(): Message[] {
    return this.messageRepository.getMessages();
  }
}
