import { MESSAGES_TIMEOUT_MS } from '../../../server/src/constants';
import { useEffect, useRef } from 'react';

import styles from './Notification.module.scss';

const hideAfterMs = MESSAGES_TIMEOUT_MS;

// A notification bar that disappears after time
export default function Notification({
  message,
  setMessage,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  // A real timeoutId will be a positive integer
  const timeoutId: React.MutableRefObject<number> = useRef(-1);

  // Upon receiving a new notification message reset the timer
  useEffect(() => {
    if (timeoutId.current > -1) {
      window.clearTimeout(timeoutId.current);
    }

    timeoutId.current = window.setTimeout(() => {
      setMessage('');
    }, hideAfterMs);
  }, [message, setMessage]);

  function handleClick() {
    setMessage('');

    if (timeoutId.current > -1) {
      window.clearTimeout(timeoutId.current);
      timeoutId.current = -1;
    }
  }

  if (!message) {
    return null;
  }

  return (
    <div className={`${styles.notification} message is-danger`}>
      <div className="message-header">
        <p>{message}</p>
        <button
          className="delete"
          onClick={handleClick}
          aria-label="Delete notification"
        ></button>
      </div>
    </div>
  );
}
