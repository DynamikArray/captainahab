const { logger } = require("../../util/log");
const { sub } = require("date-fns");

module.exports = (MODEL) => ({
  trendingCoins: async function () {
    try {
      const hoursAgo = (sub(Date.now(), { hours: 24 }).getTime() / 1000).toFixed(0);

      let trending = await MODEL.aggregate([
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
      res.send(trending);
    } catch (trendingCoinsModelException) {
      logger.error("trendingCoinsModelException | error=" + JSON.stringify(trendingCoinsModelException.message));
      return [];
    }
  },
});
