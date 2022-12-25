import { User } from './User';

export interface SocketData {
  user?: User;
}

export interface ClientToServerEvents {
  'join:set_name': (name: string) => void;
}

export interface ServerToClientEvents {
  'join:accept_name': () => void;
  'user:connected': (name: string) => void;
  'user:disconnected': (name: string) => void;
}
