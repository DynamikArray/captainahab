const { logger } = require("../util/log");
const { models } = require("../models/mongoose");

module.exports = (socket, em) => {
  em.on("IncomingTxs", async function ({ txIds }) {
    try {
      const txs = await models.Transactions.getTxsByIds(txIds);
      socket.emit("newTxsAdded", { txs });
    } catch (IncomingTxsException) {
      logger.error("IncomingTxsException | error=" + IncomingTxsException.message);
    }
  });
};