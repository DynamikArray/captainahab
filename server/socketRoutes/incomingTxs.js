const { logger } = require("../util/log");
const { models } = require("../models/mongoose");

module.exports = async (socket, em) => {
  try {
    logger.debug("Getting most recent Tx's");
    const txs = await models.Transactions.getMostRecentTxs(50);
    socket.emit("newTxsAdded", { txs });
  } catch (onSocketConnectionEmitNewTxsException) {
    logger.error(
      "onSocketConnectionEmitNewTxsException | error=" + JSON.stringify(onSocketConnectionEmitNewTxsException.message)
    );
  }

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
