import { FaPaperPlane, FaRegSmile } from 'react-icons/fa';
import { useContext, useState } from 'react';

import styles from './MessageInput.module.scss';
import { MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH } from '../../../../server/src/constants';
import { SocketContext } from '../../context/socket-context';
import MessageInputButton from './MessageInputButton';

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
    <section className={`${styles.container} has-background-white-bis`}>
      <div className="px-3 py-5">
        <form onSubmit={handleSubmit}>
          <div className="field is-grouped is-align-items-center">
            <div className="control">
              <MessageInputButton classes="is-rounded">
                <FaRegSmile />
              </MessageInputButton>
            </div>
            <div className="control is-expanded">
              <label className={`${styles.input} input`}>
                <textarea
                  value={message}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className={`${styles.input__textarea} input is-rounded textarea has-fixed-size has-thin-scrollbar py-2 pl-4`}
                  placeholder="Enter your message"
                  rows={1}
                  autoFocus
                />
                <div
                  className={`${styles.charCount} ${
                    message.length >= MESSAGE_MAX_LENGTH ? 'has-text-danger' : 'has-text-grey'
                  } is-size-7 has-text-weight-semibold	`}
                >
                  {message.length > 0 && `${message.length} / ${MESSAGE_MAX_LENGTH}`}
                </div>
              </label>
            </div>
            <div className="control">
              <MessageInputButton
                type="submit"
                disabled={!isValidMessageLength()}
                classes="is-primary"
              >
                <FaPaperPlane />
              </MessageInputButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
