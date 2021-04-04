const { logger } = require("../util/log");

module.exports = (io) => {
  io.on("connection", function (socket) {
    logger.info("Socket Connection established | socketId=" + socket.id);

    socket.emit("something", { status: "Connected" });

    require("./txsCount")(socket);
  });
};
