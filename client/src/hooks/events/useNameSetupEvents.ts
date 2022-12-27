import { useContext, useEffect } from 'react';
import { SocketContext } from '../../socket-context.js';

export function useNameSetupEvents() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('join:accept_name', function () {});

    return () => {
      socket.off('join:accept_name');
    };
  }, []);
}
