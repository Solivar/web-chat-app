import { randomBytes } from 'crypto';
import { MESSAGES_LIMIT } from './constants';

import { Message } from './types/Message';
import { User } from './types/User';
import messages from './tests/data/messages';

export default class Store {
  public users: User[] = [];
  public messages: Message[] = messages;

  public nameExists(name: string) {
    const exists = this.users.find(user => user.name === name);

    if (exists) {
      return true;
    }

    return false;
  }

  public addUser({ id, name }: { id: string; name: string }): User {
    const user = {
      id,
      name,
      hasJoinedRoom: true,
    };

    this.users.push(user);

    return user;
  }

  public removeUser(id: string) {
    const userIndex = this.users.findIndex(user => user.id === id);
    const name = this.users[userIndex].name;

    this.users.splice(userIndex, 1);

    return name;
  }

  public addMessage(content: string, userName: string) {
    const id = randomBytes(16).toString('hex');
    const currentTimestamp: number = +new Date();
    const message: Message = {
      id,
      name: userName,
      content,
      timestamp: currentTimestamp,
    };

    // If the store is full, remove oldest message
    if (this.messages.length === MESSAGES_LIMIT) {
      this.messages.shift();
    }

    this.messages.push(message);

    return message;
  }
}
