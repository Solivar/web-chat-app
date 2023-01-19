import { randomBytes } from 'crypto';
import { Message } from '../../types/Message';

export function createNewMessage({
  content,
  userName,
}: {
  content: string;
  userName: string;
}): Message {
  const id = randomBytes(16).toString('hex');
  const currentTimestamp: number = +new Date();
  const message: Message = {
    id,
    name: userName,
    content,
    timestamp: currentTimestamp,
  };

  return message;
}
