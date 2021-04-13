const axios = require("axios");
const cheerio = require("cheerio");

const { web3 } = require("../../../util/alchemy");
const { logger } = require("../../../util/log");

const Transactions = require("../../../models/Transactions");
const tokenPricesHelper = require("../../../helpers/tokenPricesHelper");

//
async function trendingCoins(req, res, next) {
  try {
    const trendingCoins = await Transactions.trendingCoins();
    res.send(trendingCoins);
  } catch (trendingCoinsException) {
    logger.error("trendingCoinsException | error=" + trendingCoinsException.message);
    next();
  }
}

//
async function trendingWallets(req, res, next) {
  try {
    const trendingWallets = await Transactions.trendingWallets();
    res.send(trendingWallets);
  } catch (trendingWalletsException) {
    logger.error("trendingWalletsException | error=" + trendingWalletsException.message);
    next();
  }
}

module.exports = { trendingCoins, trendingWallets };
