const { logger } = require("../util/log");
const { web3 } = require("../util/alchemy");
const { models } = require("../models/mongoose");

const walletActions = { BUY: "Buy", SELL: "Sell" };

const uniswapHelper = {
  uniswapRouterAddress: () => {
    return "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  },

  BuyOrder: async ({ category, hash, from, value, blockNum }, input) => {
    const tokenAddress = `0x${input.inputs[1][1]}`;
    try {
      const tokenMetaData = await uniswapHelper.checkTokenMetaData(tokenAddress);
      const numberBlock = web3.utils.hexToNumberString(blockNum);
      //const { timestamp } = await web3.eth.getBlock(numberBlock);
      return { txAction: walletActions.BUY, from, value, tokenMetaData, category, hash, timestamp: Date.now() };
    } catch (BuyOrderException) {
      logger.error("BuyOrderException | error=" + BuyOrderException.message + " | input=" + JSON.stringify(input));
      return false;
    }
  },

  SellOrder: async ({ to, value, hash, blockNum }, input) => {
    const from = input.inputs[3];
    const tokenAddress = `0x${input.inputs[2][0]}`;
    try {
      const tokenMetaData = await uniswapHelper.checkTokenMetaData(tokenAddress);
      const numberBlock = web3.utils.hexToNumberString(blockNum);
      //const { timestamp } = await web3.eth.getBlock(numberBlock);
      return { txAction: walletActions.SELL, from, value, hash, tokenMetaData, timestamp: Date.now() };
    } catch (SellOrderException) {
      logger.error("SellOrderException | error=" + SellOrderException.message + " | input=" + JSON.stringify(input));
      return false;
    }
  },

  checkTokenMetaData: async (tokenAddress) => {
    try {
      const result = await models.TokensMetaData.find({ address: tokenAddress });
      if (result.length == 0) return await uniswapHelper.getTokenMetaData(tokenAddress);
      if (result.length == 1) return result[0];
    } catch (checkTokenMetaDataException) {
      logger.error("checkTokenMetaDataException | error=" + checkTokenMetaDataException.message);
    }
  },

  getTokenMetaData: async (tokenAddress) => {
    try {
      const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
      const newToken = new models.TokensMetaData({ address: tokenAddress, ...tokenMetaData });
      try {
        return await newToken.save();
      } catch (savedTokenException) {
        logger.error("savedTokenException | error=" + savedTokenException.message);
        return await uniswapHelper.checkTokenMetaData(tokenAddress);
      }
    } catch (getTokenMetaDataExecption) {
      logger.error("getTokenMetaDataExecption | error=" + getTokenMetaDataExecption.message);
    }
  },
};

module.exports = uniswapHelper;
