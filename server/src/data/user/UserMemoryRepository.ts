import { User } from '../../types/User';
import { UserRepository } from './UserRepository';

export class UserMemoryRepository implements UserRepository {
  private users: User[] = [];

  public add({ id, name }: { id: string; name: string }): User {
    const user = {
      id,
      name,
      hasJoinedRoom: true,
    };

    this.users.push(user);

    return user;
  }

  public remove(name: string): string {
    const userIndex = this.users.findIndex(user => user.name === name);

    this.users.splice(userIndex, 1);

    return name;
  }

  public nameExists(name: string): boolean {
    const user = this.users.find(user => user.name === name);

    return !!user;
  }

  public getNames(): string[] {
    return this.users.map(user => user.name);
  }
}
