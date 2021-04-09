module.exports = (socket, em) => {
  em.on("NewBlocksLoaded", async function ({ txsCount, blockNumber }) {
    socket.emit("newBlocksAdded", { txsCount, blockNumber });
  });
};
