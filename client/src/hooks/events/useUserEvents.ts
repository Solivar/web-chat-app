import { useContext, useEffect, useReducer } from 'react';
import { SocketContext } from '../../socket-context.js';

enum UserListActionType {
  LIST = 'LIST',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
}

type UserListAction =
  | { type: UserListActionType.LIST; payload: string[] }
  | { type: UserListActionType.JOIN; payload: string }
  | { type: UserListActionType.LEAVE; payload: string };

type UserListState = string[];

function userListReducer(state: UserListState, action: UserListAction): string[] {
  switch (action.type) {
    case UserListActionType.LIST:
      return action.payload;

    case UserListActionType.JOIN:
      return [...state, action.payload];

    case UserListActionType.LEAVE: {
      const currentUsers = [...state];
      const index = currentUsers.indexOf(action.payload);
      currentUsers.splice(index, 1);

      return currentUsers;
    }
    default:
      return state;
  }
}

export function useUserEvents() {
  const socket = useContext(SocketContext);
  const [users, dispatch] = useReducer(userListReducer, []);

  useEffect(() => {
    socket.emit('user:get_list');

    socket.on('user:list', function (names: string[]) {
      dispatch({ type: UserListActionType.LIST, payload: names });
    });

    socket.on('user:join', function (name: string) {
      dispatch({ type: UserListActionType.JOIN, payload: name });
    });

    socket.on('user:leave', function (name: string) {
      dispatch({ type: UserListActionType.LEAVE, payload: name });
    });

    return function () {
      socket.off('user:list');
      socket.off('user:join');
      socket.off('user:leave');
    };
  }, []);

  return users;
}