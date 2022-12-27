import { ClientToServerEvents, ServerToClientEvents } from './Events';
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
