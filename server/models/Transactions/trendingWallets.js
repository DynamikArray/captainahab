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
        { $limit: 25 },

        {
          $lookup: {
            from: "transactions",
            as: "txs",
            let: { indicator_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$from", "$$indicator_id"] },
                },
              },
              { $sort: { value: -1, createdAt: -1 } }, // add sort if needed (for example, if you want first 100 comments by creation date)
              { $limit: 10 },
            ],
          },
        },
        { $unwind: "$txs" },
      ]);
      return trendingWallets;
    } catch (trendingWalletsModelException) {
      logger.error("trendingWalletsModelException | error=" + JSON.stringify(trendingWalletsModelException.message));
      return [];
    }
  },
});
