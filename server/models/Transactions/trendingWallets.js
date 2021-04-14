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
        { $limit: 30 },
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
              { $sort: { _id: -1 } },
              { $limit: 10 },
            ],
          },
        },
        { $unwind: { path: "$tx", preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: "tokenspricedatas",
            localField: "tx.tokenMetaData.symbol",
            foreignField: "symbol",
            as: "tx.tokenPricesData",
          },
        },
        { $unwind: { path: "$tx.tokenPricesData", preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: "tokensmetadatas",
            localField: "tx.tokenMetaData.address",
            foreignField: "address",
            as: "tx.tokenMetaData",
          },
        },
        { $unwind: { path: "$tx.tokenMetaData", preserveNullAndEmptyArrays: true } },
      ]);

      let formatted = trendingWallets.reduce((acc, item) => {
        const numbers = item._id.replace(/[^0-9.]/g, "");
        item.rowOrder = `${item.txsCount}${numbers.substr(0, 5)}`;
        acc.push(item);
        return acc;
      }, []);

      return formatted;
      //return trendingWallets;
    } catch (trendingWalletsModelException) {
      logger.error("trendingWalletsModelException | error=" + JSON.stringify(trendingWalletsModelException.message));
      return [];
    }
  },
});
