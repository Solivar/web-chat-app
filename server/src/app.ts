import dotenv from 'dotenv';
dotenv.config();

import http from 'http';

import { createSocketServer } from './socket/server';
import { initStore } from './store';

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
  .catch(function (reason) {
    throw new Error(reason);
  });
