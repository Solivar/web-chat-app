import { Message } from './Message';

export interface ClientToServerEvents {
  'join:set_name': (name: string) => void;
  'user:get_list': () => void;
  'user:log_out': () => void;
  'message:send': (message: string) => void;
  'message:get_list': () => void;
}

export interface ServerToClientEvents {
  error: (message: string) => void;
  'join:accept_name': () => void;
  'user:join': (name: string) => void;
  'user:leave': (name: string) => void;
  'user:list': (names: string[]) => void;
  'message:receive': (message: Message) => void;
  'message:list': (messages: Message[]) => void;
}
