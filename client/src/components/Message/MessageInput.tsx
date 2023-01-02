import { FaPaperPlane, FaRegSmile } from 'react-icons/fa';
import React, { useContext, useState } from 'react';

import EmojiPicker from '../EmojiPicker';
import styles from './MessageInput.module.scss';
import MessageInputButton from './MessageInputButton';
import { MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH } from '../../../../server/src/constants';
import { SocketContext } from '../../context/socket-context';

export default function MessageInput({
  usersTypingComponent,
}: {
  usersTypingComponent: JSX.Element;
}) {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
    socket.emit('user:send_start_typing');
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
    socket.emit('user:send_stop_typing');
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
      <div className={`${styles.container}`}>
        <form
          onSubmit={handleSubmit}
          className="mb-3"
        >
          <div className={`${styles.emojiPicker} ${isEmojiPickerOpen ? styles.isOpen : ''} mb-3`}>
            <EmojiPicker setMessage={setMessage} />
          </div>
          <div className="field is-grouped is-align-items-center">
            <div className="control">
              <MessageInputButton
                classes="is-rounded"
                onClick={() => {
                  setIsEmojiPickerOpen(isOpen => !isOpen);
                }}
              >
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
                  placeholder="Enter message"
                  rows={1}
                  autoFocus
                />
                <div
                  className={`${styles.counter} ${
                    message.length >= MESSAGE_MAX_LENGTH ? 'has-text-danger' : 'has-text-grey'
                  } has-text-weight-semibold`}
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
        {usersTypingComponent}
      </div>
    </section>
  );
}
