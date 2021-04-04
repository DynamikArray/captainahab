const { logger } = require("../util/log");

module.exports = (io, em) => {
  io.on("connection", function (socket) {
    logger.info("Socket Connection established | socketId=" + socket.id);

    em.on("NewBlocksLoaded", function (txCount) {
      socket.emit("txscount", txCount);
    });

    require("./txsCount")(socket);
  });
};
