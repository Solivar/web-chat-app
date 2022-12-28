import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../socket-context.js';

export function useErrorEvents({
  setError,
  setIsLoading,
}: {
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('error', function (message) {
      setError(message);
      setIsLoading(false);
    });

    return () => {
      socket.off('error');
    };
  }, []);
}
