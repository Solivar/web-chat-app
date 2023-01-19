import { randomBytes } from 'crypto';
import { MESSAGE_ID_LENGTH } from '../../constants';
import { Message } from '../../types/Message';

export function createNewMessage({
  content,
  userName,
}: {
  content: string;
  userName: string;
}): Message {
  const id = randomBytes(MESSAGE_ID_LENGTH).toString('hex');
  const currentTimestamp: number = +new Date();
  const message: Message = {
    id,
    name: userName,
    content,
    timestamp: currentTimestamp,
  };

  return message;
}
