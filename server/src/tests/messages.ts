const dayAgo = +new Date() - 1000 * 60 * 60 * 24;
const twoDaysAgo = +new Date() - 1000 * 60 * 60 * 48;

export default [
  {
    id: '1',
    name: 'Brandon',
    content: 'hello world',
    timestamp: twoDaysAgo,
  },
  {
    id: '2',
    name: 'Brandon',
    content: 'this is a test',
    timestamp: dayAgo,
  },
  {
    id: '3',
    name: 'Anna',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolorum distinctio et voluptatem mollitia! Dolores modi dolorum rerum, cupiditate vel minus at?\nSed aliquid sunt vitae molestias consectetur quibusdam!\nRem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolorum distinctio et voluptatem mollitia!\nDolores modi dolorum rerum, cupiditate vel minus at? Sed aliquid sunt vitae molestias consectetur quibusdam!',
    timestamp: +new Date() - 1000 * 60 * 50,
  },
  {
    id: '34',
    name: 'Brandon',
    content: '👋👋👋',
    timestamp: +new Date() - 1000 * 60 * 45,
  },
  {
    id: '5',
    name: 'Olaf',
    content: 'Hi! 👋',
    timestamp: +new Date() - 1000 * 60 * 43,
  },
  {
    id: '6',
    name: 'Olaf',
    content: 'How are you? 😊',
    timestamp: +new Date() - 1000 * 60 * 42,
  },
  {
    id: '7',
    name: 'Brandon',
    content: "I'm good\nWhat about you?",
    timestamp: +new Date() - 1000 * 60 * 41,
  },
  {
    id: '8',
    name: 'Olaf',
    content: 'All good',
    timestamp: +new Date() - 1000 * 60 * 40,
  },
  {
    id: '9',
    name: 'Anna',
    content: 'Hey everyone! 👋',
    timestamp: +new Date() - 1000 * 60 * 35,
  },
  {
    id: '10',
    name: 'Olaf',
    content: 'Hello 👋',
    timestamp: +new Date() - 1000 * 60 * 34,
  },
  {
    id: '11',
    name: 'Brandon',
    content: 'hi',
    timestamp: +new Date() - 1000 * 60 * 33,
  },
  {
    id: '12',
    name: 'Anna',
    content: '🥳🥳🥳',
    timestamp: +new Date() - 1000 * 60 * 32,
  },
];
