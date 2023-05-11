const socket = io();

socket.on('connect', () => {
  console.info('Connected');
  socket.emit('identity', (response) => console.info('Identity:', response));
});

socket.on('disconnect', function () {
  console.info('Disconnected');
});
