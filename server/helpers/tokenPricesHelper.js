const { logger } = require("../util/log");
const axios = require("axios");
const { models } = require("../models/mongoose");

const NOMICS_URL = process.env.NOMICS_URL;
const NOMICS_KEY = process.env.NOMICS_KEY;

const tokenPricesHelper = {
  runTokenPricesJob: async function () {
    tokenPricesHelper.fetchTokenPrices();
  },

  lookupTokenPrices: async function (symbols) {
    try {
      return await models.TokensPriceData.find({
        symbol: {
          $in: symbols,
        },
      });
    } catch (lookupTokenPrices) {
      logger.info("lookupTokenPrices | error=" + lookupTokenPrices.message);
      return false;
    }
  },

  fetchTokenPrices: async function () {
    try {
      const prices = await axios.get(`${NOMICS_URL}/v1/currencies/ticker?key=${NOMICS_KEY}`);
      if (prices.data) await tokenPricesHelper.saveTokenPrices(prices.data);
      if (!prices.data) logger.info("fetchTokenPrices | error=" + "No data object in repsonse");
    } catch (fetchTokenPrices) {
      logger.error("fetchTokenPrices | error=" + fetchTokenPrices.message);
    }
  },

  saveTokenPrices: async function (prices) {
    try {
      const results = await models.TokensPriceData.bulkWrite(
        prices.map((price) => ({
          updateOne: {
            filter: { symbol: price.symbol },
            update: { $set: price },
            upsert: true,
          },
        }))
      );
      logger.info(
        `saveTokenPrices | Inserted Count=${results.inserertedCount} | Matched Count=${results.matchedCount} | Modified Count=${results.modifiedCount} `
      );
    } catch (saveTokenPricesException) {
      logger.error("saveTokenPricesException | error=" + saveTokenPricesException.message);
    }
  },

  joinPricesWithTxs: function (prices, txs) {
    let returnTxs = txs;
    try {
      const fullTxData = returnTxs.reduce((acc, tx) => {
        if (tx.tokenMetaData.symbol) {
          const tokenPrices = prices.filter((price) => price.symbol === tx.tokenMetaData.symbol);
          const newItem = { ...tx._doc, tokenPricesData: tokenPrices[0] };
          acc.push(newItem);
        }
        return acc;
      }, []);
      returnTxs = fullTxData;
    } catch (e) {
      logger.error("joinPricesWithTxsException | error=" + e.message);
    } finally {
      return returnTxs;
    }
  },

  joinPricesWithTrendingCoins: function (prices, trendingCoins) {
    let returnTrendingCoins = trendingCoins;
    try {
      const fullTrending = returnTrendingCoins.reduce((acc, coin) => {
        const tokenPrices = prices.filter((price) => price.symbol == coin._id);
        const newItem = { ...coin, tokenPricesData: tokenPrices[0] };
        acc.push(newItem);
        return acc;
      }, []);
      returnTrendingCoins = fullTrending;
    } catch (e) {
      logger.error("joinPricesWithTrendingCoins | error=" + e.message);
    } finally {
      return returnTrendingCoins;
    }
  },
};

module.exports = tokenPricesHelper;
