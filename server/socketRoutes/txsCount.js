module.exports = (socket, em) => {
  em.on("NewBlocksLoaded", function ({ txsCount, blockNumber }) {
    socket.emit("newBlocksAdded", { txsCount, blockNumber });
  });
};
