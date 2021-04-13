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

//Now import our queries passing the Model along
const { trendingCoins } = require("./Transactions/trendingCoins.js")(Transactions);
const { trendingWallets } = require("./Transactions/trendingWallets.js")(Transactions);
const { searchTxList } = require("./Transactions/searchTxList.js")(Transactions);

Transactions.trendingCoins = trendingCoins;
Transactions.trendingWallets = trendingWallets;
Transactions.searchTxList = searchTxList;

/**
 * [description]
 * @param  {[type]} txIds [description]
 * @return {[type]}       [description]
 */
Transactions.getTxsByIds = async function (txIds) {
  if (!txIds) {
    logger.error("getTxsByIds | error=No TxIds | txIds=" + JSON.stringify(txIds));
    return [];
  }

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

/**
 * [description]
 * @param  {[type]} limit [description]
 * @return {[type]}       [description]
 */
Transactions.getMostRecentTxs = async function (limit) {
  try {
    const txs = await Transactions.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: limit },
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
  } catch (getMostRecentTxsException) {
    logger.error("getMostRecentTxsException | error=" + JSON.stringify(getMostRecentTxsException.message));
    return [];
  }
};

module.exports = Transactions;
