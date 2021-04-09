const { logger } = require("../util/log");

module.exports = (io, em) => {
  io.on("connection", function (socket) {
    logger.info("Socket Connection established | socketId=" + socket.id);

    require("./txsCount")(socket, em);
    require("./incomingTxs")(socket, em);
  });
};
