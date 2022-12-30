import { ClientToServerEvents, ServerToClientEvents } from '@server/types/Events';
import React from 'react';
import io, { Socket } from 'socket.io-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL;

if (!socketUrl) {
  throw new Error('Websocket host missing from environment variables');
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(socketUrl);
export const SocketContext = React.createContext(socket);
