import { Server, Socket } from 'socket.io';

import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../constants';
import Store from '../store';

export default class ChatEventHandler {
  private io: Server;
  private socket: Socket;
  private store: Store;

  constructor(io: Server, socket: Socket, store: Store) {
    this.io = io;
    this.socket = socket;
    this.store = store;

    this.initSocketEvents();
  }

  private initSocketEvents = () => {
    this.socket.on('join:set_name', this.handleSetName);
  };

  private handleSetName = (name: string) => {
    if (this.socket.data.name) {
      this.socket.emit('error', 'You have already joined the chat.');

      return;
    }

    if (name.length < NAME_MIN_LENGTH || NAME_MAX_LENGTH < name.length) {
      this.socket.emit(
        'error',
        `Name must be ${NAME_MIN_LENGTH} - ${NAME_MAX_LENGTH} characters long.`,
      );

      return;
    }

    if (this.store.nameExists(name)) {
      this.socket.emit('error', 'Name is already taken.');

      return;
    }

    this.store.addUser({
      id: this.socket.id,
      name,
    });

    this.socket.emit('join:accept_name', name);
    this.io.emit('user:connected', name);
  };
}
