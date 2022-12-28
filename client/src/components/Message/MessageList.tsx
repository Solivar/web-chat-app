import MessageItem from './MessageItem';
import { Message } from './Message';
import { useRef } from 'react';

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  const lastItemIndex = messages.length - 1;
  const bottomOfMessageListRef: React.RefObject<HTMLLIElement> = useRef(null);

  return (
    <section>
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
