import { User } from './types/User';

export default class Store {
  public users: User[] = [];

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
}
