import styles from './MessageItem.module.scss';
import { Message } from '@server/types/Message';
import { useContext } from 'react';
import { NameContext } from '../../context/name-context';

export default function MessageItem({ name, content, timestamp, isAnnouncement }: Message) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const userName = useContext(NameContext);
  const isCurrentUser = name === userName.value;

  function isToday() {
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  function getMessageTime() {
    if (isToday()) {
      return `${hours}:${formattedMinutes}`;
    }

    return date.toLocaleDateString('eu', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (isAnnouncement) {
    return <p className="has-text-grey px-4 py-2">{content}</p>;
  }

  return (
    <div
      className={`${
        isCurrentUser ? 'is-align-items-flex-end' : 'is-align-items-flex-start'
      } is-flex is-flex-direction-column`}
    >
      <div
        className={`${styles.message} ${
          isCurrentUser ? 'has-background-primary-light' : 'has-background-white-ter'
        } px-4 py-2 is-rounded`}
      >
        <p>
          <span className="has-text-weight-semibold">{name}</span>
          <span
            className="has-text-grey is-size-7 ml-2"
            title={date.toString()}
          >
            {getMessageTime()}
          </span>
        </p>
        <p className={`${styles.message__content}`}>{content}</p>
      </div>
    </div>
  );
}
