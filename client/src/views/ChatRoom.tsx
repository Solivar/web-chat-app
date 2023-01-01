import { useContext, useRef, useState } from 'react';

import MessageList from '../components/Message/MessageList';
import MessageInput from '../components/Message/MessageInput';
import Notification from '../components/Notification';
import styles from './ChatRoom.module.scss';
import UserList from '../components/User/UserList';
import UsersTyping from '../components/User/UsersTyping';
import { NameContext } from '../context/name-context';
import { SocketContext } from '../context/socket-context';
import { useErrorEvents } from '../hooks/events/useErrorEvents';
import { useMessageEvents } from '../hooks/events/useMessageEvents';
import { useUserEvents } from '../hooks/events/useUserEvents';
import { userTypingEntry, useUsersTypingEvents } from '../hooks/events/useUsersTypingEvents';

export default function ChatRoom() {
  const name = useContext(NameContext);
  const socket = useContext(SocketContext);
  const [messages, messagesDispatch] = useMessageEvents();
  const users = useUserEvents({ messagesDispatch });
  const [error, setError] = useErrorEvents();
  const [usersTyping, setUsersTyping] = useState<userTypingEntry[]>([]);
  const usersTypingRef = useRef<userTypingEntry[]>([]);
  usersTypingRef.current = usersTyping;

  useUsersTypingEvents({ setUsers: setUsersTyping, usersRef: usersTypingRef });

  function handleClick() {
    socket.emit('user:log_out');
    name.setValue('');
  }

  return (
    <div className="container is-fullhd is-flex is-flex-direction-column is-full-height">
      <div className="is-flex is-justify-content-space-between is-align-content-center pt-3 pl-5 pr-2">
        <h1 className="is-size-5 has-text-weight-bold mb">Web Chat App</h1>
        <button
          onClick={handleClick}
          type="button"
          className="button is-ghost"
        >
          Leave chat
        </button>
      </div>
      <div className="px-5 pt-2 pb-5 has-overflow-hidden is-flex-grow-1">
        <div
          className={`${styles.room} container is-fullhd has-background-white has-border is-rounded mx-auto is-relative`}
        >
          <main className={`${styles.room__main} is-flex is-flex-direction-column is-relative`}>
            <Notification
              message={error}
              setMessage={setError}
            />
            <MessageList messages={messages} />
            <MessageInput usersTypingComponent={<UsersTyping users={usersTyping} />} />
          </main>
          <aside className={`${styles.sidebar} has-overflow-y-scroll has-thin-scrollbar p-5 pr-0`}>
            <UserList names={users} />
          </aside>
        </div>
      </div>
    </div>
  );
}
