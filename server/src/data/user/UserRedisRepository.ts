import { client as redisClient } from '../../redis';
import { User } from '../../types/User';
import { UserRepository } from './UserRepository';

export class UserRedisRepository implements UserRepository {
  private client = redisClient;

  public async add({ id, name }: { id: string; name: string }): Promise<User> {
    const user = {
      id,
      name,
      hasJoinedRoom: true,
    };

    await this.client.sAdd('user-names', name);

    return user;
  }

  public async remove(name: string): Promise<string> {
    await this.client.sRem('user-names', name);

    return name;
  }

  public async nameExists(name: string): Promise<boolean> {
    return await this.client.sIsMember('user-names', name);
  }

  public async getNames(): Promise<string[]> {
    return await this.client.sMembers('user-names');
  }
}
