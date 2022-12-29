export interface ClientToServerEvents {
  'join:set_name': (name: string) => void;
  'user:get_list': () => void;
  'user:log_out': () => void;
}

export interface ServerToClientEvents {
  error: (message: string) => void;
  'join:accept_name': () => void;
  'user:join': (name: string) => void;
  'user:leave': (name: string) => void;
  'user:list': (names: string[]) => void;
}
