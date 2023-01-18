import users from './users.json';

const dayAgo = +new Date() - 1000 * 60 * 60 * 24;
const twoDaysAgo = +new Date() - 1000 * 60 * 60 * 48;

export default [
  {
    id: '1',
    name: users[0],
    content: 'hello world',
    timestamp: twoDaysAgo,
  },
  {
    id: '2',
    name: users[0],
    content: 'this is a test',
    timestamp: dayAgo,
  },
  {
    id: '3',
    name: users[2],
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolorum distinctio et voluptatem mollitia! Dolores modi dolorum rerum, cupiditate vel minus at?\nSed aliquid sunt vitae molestias consectetur quibusdam!\nRem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolorum distinctio et voluptatem mollitia!\nDolores modi dolorum rerum, cupiditate vel minus at? Sed aliquid sunt vitae molestias consectetur quibusdam!',
    timestamp: +new Date() - 1000 * 60 * 50,
  },
  {
    id: '34',
    name: users[0],
    content: '👋👋👋',
    timestamp: +new Date() - 1000 * 60 * 45,
  },
  {
    id: '5',
    name: users[1],
    content: 'Hi! 👋',
    timestamp: +new Date() - 1000 * 60 * 43,
  },
  {
    id: '6',
    name: users[1],
    content: 'How are you? 😊',
    timestamp: +new Date() - 1000 * 60 * 42,
  },
  {
    id: '7',
    name: users[0],
    content: "I'm good\nWhat about you?",
    timestamp: +new Date() - 1000 * 60 * 41,
  },
  {
    id: '8',
    name: users[1],
    content: 'All good',
    timestamp: +new Date() - 1000 * 60 * 40,
  },
  {
    id: '9',
    name: users[2],
    content: 'Hey everyone! 👋',
    timestamp: +new Date() - 1000 * 60 * 35,
  },
  {
    id: '10',
    name: users[1],
    content: 'Hello 👋',
    timestamp: +new Date() - 1000 * 60 * 34,
  },
  {
    id: '11',
    name: users[0],
    content: 'hi',
    timestamp: +new Date() - 1000 * 60 * 33,
  },
  {
    id: '12',
    name: users[2],
    content: '🥳🥳🥳',
    timestamp: +new Date() - 1000 * 60 * 32,
  },
];
