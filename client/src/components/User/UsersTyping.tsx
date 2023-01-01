import { userTypingEntry } from '../../hooks/events/useUsersTypingEvents';

import styles from './UserTyping.module.scss';

export default function UsersTyping({ users }: { users: userTypingEntry[] }) {
  function getUserTypingMessage() {
    if (users.length > 2) {
      return (
        <>
          <span className="has-text-grey-dark has-text-weight-bold">{users.length}</span> users are
          typing.
        </>
      );
    } else if (users.length > 1) {
      return (
        <>
          <span className="has-text-grey-dark has-text-weight-bold">{users[0].name}</span> and{' '}
          <span className="has-text-grey-dark has-text-weight-bold">{users[1].name}</span> are
          typing.
        </>
      );
    }

    return (
      <>
        <span className="has-text-grey-dark has-text-weight-bold">{users[0].name}</span> is typing.
      </>
    );
  }

  return (
    <div className={`${styles.userTyping}`}>
      {users.length > 0 && <div className="has-text-grey is-size-7">{getUserTypingMessage()}</div>}
    </div>
  );
}
