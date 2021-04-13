const { logger } = require("../../util/log");
const { sub } = require("date-fns");

module.exports = (MODEL) => ({
  trendingWallets: async function () {
    try {
      const hoursAgo = (sub(Date.now(), { hours: 24 }).getTime() / 1000).toFixed(0);

      let trendingWallets = await MODEL.aggregate([
        {
          $match: {
            timestamp: { $gte: hoursAgo },
          },
        },
        {
          $group: {
            _id: "$from",
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
        { $limit: 10 },

        {
          $lookup: {
            from: "transactions",
            as: "tx",
            let: { indicator_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$from", "$$indicator_id"] },
                },
              },
              { $sort: { value: -1, createdAt: -1 } }, // add sort if needed (for example, if you want first 100 comments by creation date)
              { $limit: 5 },
            ],
          },
        },
        { $unwind: "$tx" },
        {
          $lookup: {
            from: "tokensmetadatas",
            localField: "tx.tokenMetaData.address",
            foreignField: "address",
            as: "tx.tokenMetaData",
          },
        },
        { $unwind: "$tx.tokenMetaData" },

        {
          $lookup: {
            from: "tokenspricedatas",
            localField: "tx.tokenMetaData.symbol",
            foreignField: "symbol",
            as: "tx.tokenPricesData",
          },
        },
        { $unwind: "$tx.tokenPricesData" },
        {
          $sort: {
            txsCount: -1,
          },
        },
      ]);
      return trendingWallets;
    } catch (trendingWalletsModelException) {
      logger.error("trendingWalletsModelException | error=" + JSON.stringify(trendingWalletsModelException.message));
      return [];
    }
  },
});
