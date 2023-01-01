import { useContext, useEffect } from 'react';
import { SocketContext } from '../../context/socket-context';

export type userTypingEntry = {
  name: string;
  timeoutId: number;
};

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<userTypingEntry[]>>;
  usersRef: React.MutableRefObject<userTypingEntry[]>;
}

export function useUsersTypingEvents({ setUsers, usersRef }: Props) {
  const socket = useContext(SocketContext);

  useEffect(() => {
    function clearTimeouts() {
      for (const user of usersRef.current) {
        window.clearTimeout(user.timeoutId);
      }
    }

    socket.on('user:start_typing', function (name: string) {
      const users = [...usersRef.current];
      const userIndex = usersRef.current.findIndex(user => user.name === name);

      const timeoutId = window.setTimeout(() => {
        const users = [...usersRef.current];
        const userIndex = usersRef.current.findIndex(user => user.name === name);

        if (userIndex > -1) {
          users.splice(userIndex, 1);
          setUsers(users);
        }
      }, 1000 * 5);

      if (userIndex > -1) {
        window.clearTimeout(users[userIndex].timeoutId);
        users[userIndex].timeoutId = timeoutId;
      } else {
        users.push({ name, timeoutId });
      }

      setUsers(users);
    });

    socket.on('user:stop_typing', function (name: string) {
      const users = [...usersRef.current];
      const userIndex = usersRef.current.findIndex(user => user.name === name);

      if (userIndex > -1) {
        window.clearTimeout(users[userIndex].timeoutId);
        users.splice(userIndex, 1);
        setUsers(users);
      }
    });

    return () => {
      socket.off('user:start_typing');
      socket.off('user:stop_typing');

      clearTimeouts();
    };
  }, [socket, setUsers, usersRef]);
}
