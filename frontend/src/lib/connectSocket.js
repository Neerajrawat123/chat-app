
export function connectSocket() {
  const socket = io("http://localhost:4000");

  socket.on("connect", () => {
    console.log('socket is connected to ', socket.id);
  });

  return socket;
}
