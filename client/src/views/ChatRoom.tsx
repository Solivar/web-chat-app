import { useContext } from 'react';

import MessageList from '../components/Message/MessageList';
import MessageInput from '../components/Message/MessageInput';
import styles from './ChatRoom.module.scss';
import UserList from '../components/User/UserList';
import { NameContext } from '../context/name-context';
import { SocketContext } from '../context/socket-context';
import { useUserEvents } from '../hooks/events/useUserEvents';
import { useMessageEvents } from '../hooks/events/useMessageEvents';

export default function ChatRoom() {
  const [messages, messagesDispatch] = useMessageEvents();
  const users = useUserEvents({ messagesDispatch });
  const name = useContext(NameContext);
  const socket = useContext(SocketContext);

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
          <main className={`${styles.room__main} is-flex is-flex-direction-column`}>
            <MessageList messages={messages} />
            <MessageInput />
          </main>
          <aside className={`${styles.sidebar} has-overflow-y-scroll has-thin-scrollbar p-5 pr-0`}>
            <UserList names={users} />
          </aside>
        </div>
      </div>
    </div>
  );
}
