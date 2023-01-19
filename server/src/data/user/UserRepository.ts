import { User } from '../../types/User';

export interface UserRepository {
  add({ id, name }: { id: string; name: string }): User | Promise<User>;
  remove(name: string): string | Promise<string>;
  nameExists(name: string): boolean | Promise<boolean>;
  getNames(): string[] | Promise<string[]>;
}
