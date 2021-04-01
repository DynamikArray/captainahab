//logger
const { logger } = require("../../../util/log");

//alchemy
const { web3 } = require("../../../util/alchemy");
const Transactions = require("../../../models/Transactions");

async function search(req, res, next) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5000;
    const txs = await Transactions.paginate({}, { page, limit });
    res.send(txs);
  } catch (searchExecption) {
    logger.info("search Exception | error=" + searchExecption.message);
  }
}

module.exports = { search };
