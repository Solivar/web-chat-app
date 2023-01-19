import { User } from '../../types/User';

export interface UserRepository {
  add({ id, name }: { id: string; name: string }): User;
  remove(id: string): string;
  findByName(name: string): User | null;
  getNames(): string[];
}
