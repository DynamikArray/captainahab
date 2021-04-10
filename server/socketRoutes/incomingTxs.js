const { logger } = require("../util/log");
const { models } = require("../models/mongoose");

module.exports = (socket, em) => {
  em.on("IncomingTxs", async function ({ txIds }) {
    try {
      if (txIds.length == 0) {
        logger.error("IncomingTxs | error=No txIds | txIds=" + JSON.stringify(txIds));
      } else {
        const txs = await models.Transactions.getTxsByIds(txIds);
        socket.emit("newTxsAdded", { txs });
      }
    } catch (IncomingTxsException) {
      logger.error("IncomingTxsException | error=" + JSON.stringify(IncomingTxsException.message));
    }
  });
};
