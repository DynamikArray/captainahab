const { logger } = require("../../util/log");

module.exports = (MODEL) => ({
  searchTxList: async function (minEth, maxEth, symbol, page, limit) {
    try {
      /* Build Conditions */
      const andCondition = [{ value: { $gte: Number(minEth) } }];
      if (maxEth) andCondition.push({ value: { $lte: Number(maxEth) } });
      if (symbol) andCondition.push({ "tokenMetaData.symbol": { $regex: symbol } });

      /* Join All Conditions */
      const matchCriteria = {
        $and: andCondition,
      };

      /* Query Conditions for recordset page of ids to lookup and unwind in next steps */
      const txs = await MODEL.aggregatePaginate(
        MODEL.aggregate([
          {
            $match: matchCriteria,
          },
          { $sort: { createdAt: -1 } },
          { $limit: 2500 },
          {
            $lookup: {
              from: "tokensmetadatas",
              localField: "tokenMetaData.address",
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
        ]),
        { sort: { createdAt: -1 }, page, limit }
      );

      return txs;
    } catch (searchTxListException) {
      logger.error("searchTxListException | error=" + JSON.stringify(searchTxListException.message));
      return [];
    }
  },
});
