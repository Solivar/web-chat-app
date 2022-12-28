import MessageList from '../components/Message/MessageList';
import styles from './ChatRoom.module.scss';
import UserList from '../components/User/UserList';

// Test data
import users from '../tests/users.json';
import messages from '../tests/messages';

export default function ChatRoom({ leaveRoom }: { leaveRoom: () => void }) {
  return (
    <div className="is-flex is-flex-direction-column is-full-height">
      <div className="is-flex is-justify-content-space-between is-align-content-center pt-3 pl-5 pr-2">
        <h1 className="is-size-5 has-text-weight-bold mb">Web Chat App</h1>
        <button
          onClick={leaveRoom}
          type="button"
          className="button is-ghost"
        >
          Leave chat
        </button>
      </div>
      <div className="px-5 pt-2 pb-5 has-overflow-hidden">
        <div
          className={`${styles.room} container is-fullhd has-background-white has-border is-rounded mx-auto pl-6 is-relative`}
        >
          <main className="has-overflow-y-scroll py-5 pr-6">
            <MessageList messages={messages} />
          </main>
          <aside className={`${styles.sidebar} has-overflow-y-scroll p-5 pr-0`}>
            <UserList names={users} />
          </aside>
        </div>
      </div>
    </div>
  );
}
