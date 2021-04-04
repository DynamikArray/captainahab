const axios = require("axios");
const cheerio = require("cheerio");

const { web3 } = require("../../../util/alchemy");
const { logger } = require("../../../util/log");

const { sub } = require("date-fns");

const Transactions = require("../../../models/Transactions");
const tokenPricesHelper = require("../../../helpers/tokenPricesHelper");

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
      { $limit: 50 },
      {
        $lookup: {
          from: "tokensmetadatas",
          localField: "_id",
          foreignField: "symbol",
          as: "tokenMetaData",
        },
      },
      { $unwind: "$tokenMetaData" },
      {
        $lookup: {
          from: "tokenspricedatas",
          localField: "_id",
          foreignField: "symbol",
          as: "tokenPricesData",
        },
      },
      { $unwind: "$tokenPricesData" },
      {
        $sort: {
          symbolCount: -1,
        },
      },
    ]);
    res.send(trendingCoins);
  } catch (trendingException) {
    logger.error("trendingException | error=" + trendingException.message);
    next();
  }
}

module.exports = { trending };
