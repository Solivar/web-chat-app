# Web Chat App

A web chat app built with JavaScript. It uses WebSocket protocol handled by SocketIO library for communication between client and server.

## Environment

Before you can run the project, you need to configure the environment.
Visit both `client` and `server` directories and create `.env` files inside each one.

You can use `.env.example` as a guide.

The following environment values are mandatory:

- `VITE_SOCKET_URL` (client) - the URL where the server is running
- `CLIENT_URL` (server) - the URL where the client is running

## Technologies

The application is built using the following tech stack:

- Express.js (server)
- React (client)
- [Socket.IO](https://socket.io/) for communication (client and server)
- TypeScript (client and server)
- Bulma and SCSS for styling (client)

## Features

User picks a name that is not already taken and is connected to the only chat room. From there they can:

- Send and receive messages, including emojis
- See a list of currently connected users
- See a list of users who are currently typing

The application also has:

- Responsive design with a mobile menu on smaller screens
- Anti-spam mechanism that shows an error alert on the client
- An in-memory data store for messages and users on the server for simplicity
