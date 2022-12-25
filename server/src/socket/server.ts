import { Server } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
import type { Server as httpServer } from 'http';

import ChatEventHandler from './ChatEventHandler';
import { ClientToServerEvents, ServerToClientEvents } from './../types/Socket';
import { SocketData } from '../types/Socket';
import { store } from './../app';

export function createSocketServer(httpServer: httpServer) {
  if (!process.env.CLIENT_URL) {
    throw new Error(`CLIENT_URL missing from environment variables`);
  }

  const io = new Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, SocketData>(
    httpServer,
    {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
      },
    },
  );

  io.on('connection', socket => {
    new ChatEventHandler(io, socket, store);

    socket.on('disconnect', () => {
      // If user has not successfully joined the chat room
      // there's no need to remove them from store
      if (!socket.data.user) {
        return;
      }

      store.removeUser(socket.data.user.id);
    });
  });
}
