import {socket} from './socket.js'
export function connectSocket() {
  socket.connect()

  socket.on("connect", () => {
    console.log('socket is connected to ', socket.id);
  });

  return socket;
}
