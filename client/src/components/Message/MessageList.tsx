import { useRef } from 'react';

import MessageItem from './MessageItem';
import styles from './MessageInput.module.scss';
import { Message } from '@server/types/Message';

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  const lastItemIndex = messages.length - 1;
  const bottomOfMessageListRef: React.RefObject<HTMLLIElement> = useRef(null);

  return (
    <section className="has-overflow-y-scroll py-5 px-6 is-flex-grow-1">
      {messages.length === 0 && <p>Welcome, say hi!</p>}

      {messages.length > 0 && (
        <ul>
          {messages.map((message, index) => {
            if (index === lastItemIndex) {
              return (
                <li
                  key={message.id}
                  ref={bottomOfMessageListRef}
                >
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
