import {
  MESSAGE_MAX_LENGTH,
  MESSAGE_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '../constants';
import type { Store } from '../store';
import { ChatSocket, ChatSocketsServer } from '../types/Socket';
import { isUserSpamming } from './helper';
export default class ChatEventHandler {
  private io: ChatSocketsServer;
  private socket: ChatSocket;
  private store: Store;

  constructor(io: ChatSocketsServer, socket: ChatSocket, store: Store) {
    this.io = io;
    this.socket = socket;
    this.store = store;

    this.initClientEventListeners();
  }

  public disconnectUser = () => {
    // If user has not successfully joined the chat room
    // there's no need to remove them from store
    if (!this.socket.data.user) {
      return;
    }

    this.store.removeUser(this.socket.data.user.name);
    this.io.emit('user:leave', this.socket.data.user.name);
    delete this.socket.data.user;
  };

  private initClientEventListeners = () => {
    this.socket.on('join:set_name', this.handleSetName);
    this.socket.on('user:get_list', this.handleUserList);
    this.socket.on('user:log_out', this.handleLogOut);
    this.socket.on('message:send', this.handleSendMessage);
    this.socket.on('message:get_list', this.handleMessageList);
    this.socket.on('user:send_start_typing', this.handleStartTyping);
    this.socket.on('user:send_stop_typing', this.handleStopTyping);
  };

  private handleSetName = async (name: string) => {
    if (this.socket.data.user?.name) {
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

    if (await this.store.userExists(name)) {
      this.socket.emit('error', 'Name is already taken.');

      return;
    }

    const user = await this.store.addUser({
      id: this.socket.id,
      name,
    });

    this.socket.data.user = user;

    this.socket.emit('join:accept_name');
    this.socket.broadcast.emit('user:join', name);
  };

  private handleUserList = async () => {
    const names = await this.store.getUserNames();
    this.socket.emit('user:list', names);
  };

  private handleLogOut = () => {
    this.disconnectUser();
  };

  private handleSendMessage = async (content: string) => {
    if (!this.socket.data.user) {
      return;
    }

    if (content.length < MESSAGE_MIN_LENGTH || MESSAGE_MAX_LENGTH < content.length) {
      this.socket.emit(
        'error',
        `Message must be ${MESSAGE_MIN_LENGTH} - ${MESSAGE_MIN_LENGTH} characters long.`,
      );

      return;
    }

    if (isUserSpamming(this.socket.data.user)) {
      this.socket.emit('error', 'You are sending too many messages, slow down!');

      return;
    }

    const message = await this.store.addMessage({ content, userName: this.socket.data.user.name });
    this.io.emit('message:receive', message);
  };

  private handleMessageList = async () => {
    this.socket.emit('message:list', await this.store.getMessages());
  };

  private handleStartTyping = () => {
    if (!this.socket.data.user) {
      return;
    }

    this.io.emit('user:start_typing', this.socket.data.user.name);
  };

  private handleStopTyping = () => {
    if (!this.socket.data.user) {
      return;
    }

    this.io.emit('user:stop_typing', this.socket.data.user.name);
  };
}
