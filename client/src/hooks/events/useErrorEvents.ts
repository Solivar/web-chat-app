import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../socket-context.js';

export function useErrorEvents({
  setError,
}: {
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('error', function (message) {
      setError;
    });

    return () => {
      socket.off('error');
    };
  }, []);
}
