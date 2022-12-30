import { Message } from '@server/types/Message.js';
import { useContext, useEffect, useReducer } from 'react';
import { SocketContext } from '../../context/socket-context';

export enum MessageListActionType {
  LIST = 'LIST',
  RECEIVE = 'RECEIVE',
}

export type MessageListAction =
  | { type: MessageListActionType.LIST; payload: Message[] }
  | { type: MessageListActionType.RECEIVE; payload: Message };

type MessageListState = Message[];

function messageListReducer(state: MessageListState, action: MessageListAction): Message[] {
  switch (action.type) {
    case MessageListActionType.LIST:
      return action.payload;

    case MessageListActionType.RECEIVE:
      return [...state, action.payload];

    default:
      return state;
  }
}

export function useMessageEvents(): [Message[], React.Dispatch<MessageListAction>] {
  const socket = useContext(SocketContext);
  const [messages, dispatch] = useReducer(messageListReducer, []);

  useEffect(() => {
    socket.emit('message:get_list');

    socket.on('message:list', function (messages: Message[]) {
      dispatch({ type: MessageListActionType.LIST, payload: messages });
    });

    socket.on('message:receive', function (message: Message) {
      dispatch({ type: MessageListActionType.RECEIVE, payload: message });
    });

    return function () {
      socket.off('message:list');
      socket.off('message:receive');
    };
  }, []);

  return [messages, dispatch];
}
