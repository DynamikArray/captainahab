const axios = require("axios");
const cheerio = require("cheerio");

const { web3 } = require("../../../util/alchemy");
const { logger } = require("../../../util/log");

const { sub } = require("date-fns");

const Transactions = require("../../../models/Transactions");
async function trending(req, res, next) {
  try {
    const hourAgo = (sub(Date.now(), { hours: 24 }).getTime() / 1000).toFixed(0);
    const trendingCoins = await Transactions.aggregate([
      {
        $match: {
          timestamp: { $gte: hourAgo },
        },
      },
      {
        $group: {
          _id: "$tokenMetaData.symbol",
          symbolCount: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          symbolCount: -1,
        },
      },
      { $limit: 50 },
    ]);
    res.send(trendingCoins);
  } catch (trendingException) {
    logger.error("trendingException | error=" + trendingException.message);
    next();
  }
}

module.exports = { trending };
