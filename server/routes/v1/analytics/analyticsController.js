const axios = require("axios");
const cheerio = require("cheerio");

const { web3 } = require("../../../util/alchemy");
const { logger } = require("../../../util/log");

const { sub } = require("date-fns");

const Transactions = require("../../../models/Transactions");
const tokenPricesHelper = require("../../../helpers/tokenPricesHelper");

//
//
async function trending(req, res, next) {
  try {
    const hourAgo = (sub(Date.now(), { hours: 24 }).getTime() / 1000).toFixed(0);
    let trendingCoins = await Transactions.aggregate([
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

    const symbols = [
      ...new Set(
        trendingCoins.reduce((acc, coin) => {
          acc.push(coin._id);
          return acc;
        }, [])
      ),
    ];

    try {
      const prices = await tokenPricesHelper.lookupTokenPrices(symbols);
      if (prices) trendingCoins = tokenPricesHelper.joinPricesWithTrendingCoins(prices, trendingCoins);
    } catch (e) {
      logger.error("Analytics Controller | trending | error=" + e.message);
    } finally {
      res.send(trendingCoins);
    }
  } catch (trendingException) {
    logger.error("trendingException | error=" + trendingException.message);
    next();
  }
}

module.exports = { trending };
