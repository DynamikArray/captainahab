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
    const hoursAgo = (sub(Date.now(), { hours: 24 }).getTime() / 1000).toFixed(0);

    let trendingCoins = await Transactions.aggregate([
      {
        $match: {
          timestamp: { $gte: hoursAgo },
          "tokenMetaData.address": {
            $exists: true,
            $ne: null,
          },
        },
      },
      {
        $group: {
          _id: "$tokenMetaData.address",
          txsCount: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          txsCount: -1,
        },
      },
      { $limit: 50 },
      {
        $lookup: {
          from: "tokensmetadatas",
          localField: "_id",
          foreignField: "address",
          as: "tokenMetaData",
        },
      },
      { $unwind: "$tokenMetaData" },

      {
        $lookup: {
          from: "tokenspricedatas",
          localField: "tokenMetaData.symbol",
          foreignField: "symbol",
          as: "tokenPricesData",
        },
      },
      { $unwind: "$tokenPricesData" },
    ]);
    res.send(trendingCoins);
  } catch (trendingException) {
    logger.error("trendingException | error=" + trendingException.message);
    next();
  }
}

module.exports = { trending };
