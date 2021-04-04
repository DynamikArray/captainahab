module.exports = (socket) => {
  socket.on("greeting-from-client", function (message) {
    console.log(message);
  });
};
