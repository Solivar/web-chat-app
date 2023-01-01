import { useEffect, useRef, useState } from 'react';

import MessageItem from './MessageItem';
import styles from './MessagesList.module.scss';
import { Message } from '@server/types/Message';

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  const lastItemIndex = messages.length - 1;
  const messageListRef: React.RefObject<HTMLLIElement> = useRef(null);
  const [shouldScrollOnNewMessage, setShouldScrollOnNewMessage] = useState(true);

  // Scroll to the bottom of list when new messages arrive
  // Don't scroll if user has scrolled up to read past messages
  useEffect(() => {
    if (messageListRef.current && shouldScrollOnNewMessage) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, shouldScrollOnNewMessage]);

  function handleScroll(event: React.UIEvent<HTMLElement>) {
    const hasScrolledToBottom =
      event.currentTarget.scrollTop ===
      event.currentTarget.scrollHeight - event.currentTarget.offsetHeight;

    if (hasScrolledToBottom) {
      setShouldScrollOnNewMessage(true);
    } else {
      setShouldScrollOnNewMessage(false);
    }
  }

  return (
    <section
      ref={messageListRef}
      onScroll={handleScroll}
      className={`${styles.messages} has-overflow-y-scroll has-thin-scrollbar is-flex-grow-1`}
    >
      {messages.length === 0 && <p>Welcome, say hi!</p>}

      {messages.length > 0 && (
        <ul>
          {messages.map((message, index) => {
            if (index === lastItemIndex) {
              return (
                <li key={message.id}>
                  <MessageItem {...message} />
                </li>
              );
            }

            return (
              <li
                key={message.id}
                className="mb-3"
              >
                <MessageItem {...message} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
