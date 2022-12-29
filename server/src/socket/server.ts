import { Server } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
import type { Server as httpServer } from 'http';

import ChatEventHandler from './ChatEventHandler';
import { ClientToServerEvents, ServerToClientEvents } from './../types/Events';
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
    const eventHandler = new ChatEventHandler(io, socket, store);

    socket.on('disconnect', () => {
      eventHandler.disconnectUser();
    });
  });
}
