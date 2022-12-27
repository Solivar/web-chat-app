export interface ClientToServerEvents {
  'join:set_name': (name: string) => void;
}

export interface ServerToClientEvents {
  error: (message: string) => void;
  'join:accept_name': () => void;
  'user:connected': (name: string) => void;
  'user:disconnected': (name: string) => void;
}
