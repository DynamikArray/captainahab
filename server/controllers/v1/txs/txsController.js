//logger
const { logger } = require("../../../util/log");

//alchemy
const { web3 } = require("../../../util/alchemy");
const Transactions = require("../../../models/Transactions");

const tokenPricesHelper = require("../../../helpers/tokenPricesHelper");

async function search(req, res, next) {
  try {
    const minEth = req.query.minEth || 0.00000000001;
    const maxEth = req.query.maxEth || false;
    const symbol = req.query.symbol || false;
    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    const txs = await Transactions.searchTxList(minEth, maxEth, symbol, page, limit);
    res.send(txs);
  } catch (searchExecption) {
    logger.info("search Exception | error=" + searchExecption.message);
  }
}

async function txsCount(req, res, next) {
  try {
    const txsCount = await Transactions.countDocuments({});
    res.send({ txsCount });
  } catch (txsCountExecption) {
    logger.info("txCount Exception | error=" + txsCountExecption.message);
  }
}

module.exports = { search, txsCount };
