const { logger } = require("../util/log");

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const transactionsSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
    },
    from: {
      type: String,
    },
    txAction: {
      type: String,
    },
    value: {
      type: Number,
    },
    timestamp: {
      type: String,
    },
    tokenMetaData: {
      address: {
        type: String,
      },
      decimals: {
        type: Number,
      },
      logo: {
        type: String,
      },
      name: {
        type: String,
      },
      symbol: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

transactionsSchema.plugin(mongoosePaginate);
transactionsSchema.plugin(aggregatePaginate);

const Transactions = mongoose.model("Transactions", transactionsSchema);

Transactions.searchTxList = async function (minEth, maxEth, symbol, page, limit) {
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
    const txs = await Transactions.aggregatePaginate(
      Transactions.aggregate([
        {
          $match: matchCriteria,
        },
        { $sort: { createdAt: -1 } },
        { $limit: 5000 },
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
      { sort: { _id: -1 }, page, limit }
    );

    return txs;
  } catch (e) {
    logger.error("searchTxList | error=" + e.message);
    return [];
  }
};

Transactions.getTxsByIds = async function (txIds) {
  try {
    const txs = await Transactions.aggregate([
      {
        $match: {
          _id: { $in: txIds },
        },
      },
      { $sort: { createdAt: -1 } },
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
    ]);
    return txs;
  } catch (GetTxsByIdsException) {
    logger.error("GetTxsByIdsException | error=" + JSON.stringify(GetTxsByIdsException.message));
    return [];
  }
};

module.exports = Transactions;
