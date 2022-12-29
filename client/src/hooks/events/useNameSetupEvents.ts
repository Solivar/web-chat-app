import { useContext, useEffect } from 'react';
import { SocketContext } from '../../socket-context.js';

export function useNameSetupEvents({
  nameRef,
  updateName,
}: {
  nameRef: React.MutableRefObject<string>;
  updateName: (name: string) => void;
}) {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('join:accept_name', function () {
      updateName(nameRef.current);
    });

    return function () {
      socket.off('join:accept_name');
    };
  }, []);
}
