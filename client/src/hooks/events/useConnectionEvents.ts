import { ServerToClientEvents, ClientToServerEvents } from '@server/src/types/Events';
import { Socket } from 'socket.io-client';
import React, { useEffect } from 'react';

export function useConnectionEvents({
  socket,
  setConnected,
}: {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    socket.on('connect', function () {
      setConnected(true);
    });

    socket.on('disconnect', function () {
      setConnected(false);
    });

    return function () {
      socket.off('connect');
      socket.off('disconnect');
    };
  });
}
