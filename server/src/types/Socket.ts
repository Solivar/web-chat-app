import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Server, Socket } from 'socket.io';
import { User } from './User';

export interface SocketData {
  user?: User;
}

export type ChatSocketsServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  SocketData
>;

export type ChatSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  SocketData
>;

export interface ClientToServerEvents {
  'join:set_name': (name: string) => void;
}

export interface ServerToClientEvents {
  error: (message: string) => void;
  'join:accept_name': () => void;
  'user:connected': (name: string) => void;
  'user:disconnected': (name: string) => void;
}
