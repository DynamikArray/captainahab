//logger
const { logger } = require("../../../util/log");

//alchemy
const { web3 } = require("../../../util/alchemy");
const Transactions = require("../../../models/Transactions");

const tokenPricesHelper = require("../../../helpers/tokenPricesHelper");

async function search(req, res, next) {
  try {
    const ethAmount = req.query.ethLimit || 1;
    const symbol = req.query.symbol || "";

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let matchCriteria = {
      value: { $gte: ethAmount },
      "tokenMetaData.symbol": { $regex: "" },
    };
    //,
    //"
    try {
      const txs = await Transactions.aggregatePaginate(
        Transactions.aggregate([
          {
            $match: matchCriteria,
          },
        ]),
        { sort: { timestamp: -1 }, page, limit }
      );
      console.log(txs);
      res.send(txs);
    } catch (searchExecption) {
      logger.error("searchExecption | error=" + searchExecption.message);
    }

    /*
    const txs = await Transactions.paginate(
      {
        value: { $gte: ethAmount },
        "tokenMetaData.symbol": { $regex: symbol },
      },
      { sort: { timestamp: -1 }, page, limit }
    );

    const symbols = [
      ...new Set(
        txs.docs.reduce((acc, tx) => {
          acc.push(tx.tokenMetaData.symbol);
          return acc;
        }, [])
      ),
    ];

    try {
      const prices = await tokenPricesHelper.lookupTokenPrices(symbols);
      if (prices) txs.docs = tokenPricesHelper.joinPricesWithTxs(prices, txs.docs);
    } catch (e) {
      logger.error("TxsController | lookupTokenPrices | error=" + e.message);
    } finally {
      res.send(txs);
    }
    */
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
