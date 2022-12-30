import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../context/socket-context';

export function useNameSetupEvents({
  nameRef,
  updateName,
}: {
  nameRef: React.MutableRefObject<string>;
  updateName: (name: string) => void;
}): [string, React.Dispatch<React.SetStateAction<string>>] {
  const socket = useContext(SocketContext);
  const [name, setName] = useState('');

  useEffect(() => {
    socket.on('join:accept_name', function () {
      updateName(nameRef.current);
    });

    return function () {
      socket.off('join:accept_name');
    };
  }, []);

  return [name, setName];
}
