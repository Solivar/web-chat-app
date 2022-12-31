import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/socket-context';

export function useErrorEvents(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const socket = useContext(SocketContext);
  const [error, setError] = useState('');

  useEffect(() => {
    socket.on('error', function (message) {
      setError(message);
    });

    return () => {
      socket.off('error');
    };
  }, []);

  return [error, setError];
}
