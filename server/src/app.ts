import dotenv from 'dotenv';
import http from 'http';

import { createSocketServer } from './socket/server';
import { initStore } from './store';

dotenv.config();

const port = process.env.PORT || 3000;
const url = process.env.APP_URL || 'localhost';
const httpServer = http.createServer();

initStore()
  .then(function () {
    createSocketServer(httpServer);

    httpServer.listen(port, () => {
      console.log(`App running on ${url}`);
    });
  })
  .catch(function () {
    throw new Error('Failed to initialize data store');
  });
