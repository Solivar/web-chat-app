import { FaPaperPlane, FaRegSmile } from 'react-icons/fa';
import { useContext, useState } from 'react';

import styles from './MessageInput.module.scss';
import { MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH } from '../../../../server/src/constants';
import { SocketContext } from '../../context/socket-context';

export default function MessageInput() {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    event.preventDefault();

    if (!isValidMessageLength()) {
      return;
    }

    socket.emit('message:send', message);
    setMessage('');
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      }

      if (!isValidMessageLength()) {
        return;
      }

      event.preventDefault();

      handleSubmit(event);
    }
  }

  function isValidMessageLength() {
    if (message.length < MESSAGE_MIN_LENGTH || MESSAGE_MAX_LENGTH < message.length) {
      return false;
    }

    return true;
  }

  return (
    <section className={`${styles.messageInput} has-background-white-bis`}>
      <div className="px-3 py-5">
        <form onSubmit={handleSubmit}>
          <div className="field is-grouped is-align-items-center">
            <div className="control">
              <button
                type="button"
                className="button is-outlined is-rounded"
              >
                <span className="icon is-small">
                  <FaRegSmile />
                </span>
              </button>
            </div>
            <div className="control is-expanded">
              <textarea
                value={message}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`input is-rounded textarea has-fixed-size has-thin-scrollbar py-2 px-4`}
                placeholder="Enter your message"
                rows={1}
                autoFocus
              />
            </div>
            <div className="control">
              <button
                type="submit"
                className="button is-primary is-rounded"
                disabled={!isValidMessageLength()}
              >
                <span className="icon is-small">
                  <FaPaperPlane />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
