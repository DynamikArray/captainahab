module.exports = (socket, em) => {
  em.on("NewBlocksLoaded", function (txCount) {
    socket.emit("txscount", txCount);
  });
};
