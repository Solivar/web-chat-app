import styles from './MessageItem.module.scss';
import { Message } from '@server/types/Message';

export default function MessageItem({ name, content, timestamp, isAnnouncement }: Message) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

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
    return <p className="has-text-grey">{content}</p>;
  }

  return (
    <div
      className={`${
        name === 'Brandon' ? 'is-align-items-flex-end' : 'is-align-items-flex-start'
      } is-flex is-flex-direction-column`}
    >
      <div
        className={`${styles.message} ${
          name === 'Brandon' ? 'has-background-primary-light' : 'has-background-white-ter'
        } px-4 py-2 is-rounded`}
      >
        <p>
          <strong>{name}</strong>
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
