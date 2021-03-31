const { web3 } = require("../util/alchemy");

const walletActions = { BUY: "Buy", SELL: "Sell" };

const uniswapHelper = {
  uniswapRouterAddress: () => {
    return "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  },

  BuyOrder: async ({ category, hash, from, value, blockNum }, input) => {
    const tokenAddress = `0x${input.inputs[1][1]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    const numberBlock = web3.utils.hexToNumberString(blockNum);
    const { timestamp } = await web3.eth.getBlock(numberBlock);
    return { txAction: walletActions.BUY, from, value, tokenMetaData, category, hash, timestamp };
  },

  SellOrder: async ({ to, value, hash, blockNum }, input) => {
    const from = input.inputs[3];
    const tokenAddress = `0x${input.inputs[2][0]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    const numberBlock = web3.utils.hexToNumberString(blockNum);
    const { timestamp } = await web3.eth.getBlock(numberBlock);
    return { txAction: walletActions.SELL, from, value, hash, tokenMetaData, timestamp };
  },
  /*
  swapExactETHForTokens: async ({ category, hash, from, value, blockNum }, input) => {
    const tokenAddress = `0x${input.inputs[1][1]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    const numberBlock = web3.utils.hexToNumberString(blockNum);
    const { timestamp } = await web3.eth.getBlock(numberBlock);
    return { txAction: walletActions.BUY, from, value, tokenMetaData, category, hash, timestamp };
  },

  swapETHForExactTokens: async ({ category, hash, from, value, blockNum }, input) => {
    const tokenAddress = `0x${input.inputs[1][1]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    const numberBlock = web3.utils.hexToNumberString(blockNum);
    const { timestamp } = await web3.eth.getBlock(numberBlock);
    return { txAction: walletActions.BUY, from, value, tokenMetaData, category, hash, timestamp };
  },

  swapExactTokensForETH: async ({ hash, value, blockNum }, input) => {
    const from = input.inputs[3];
    const tokenAddress = `0x${input.inputs[2][0]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    const numberBlock = web3.utils.hexToNumberString(blockNum);
    const { timestamp } = await web3.eth.getBlock(numberBlock);
    return { txAction: walletActions.SELL, from, value, hash, tokenMetaData, timestamp };
  },

  swapTokensForExactETH: async ({ to, value, hash, blockNum }, input) => {
    const from = input.inputs[3];
    const tokenAddress = `0x${input.inputs[2][0]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    const numberBlock = web3.utils.hexToNumberString(blockNum);
    const { timestamp } = await web3.eth.getBlock(numberBlock);
    return { txAction: walletActions.SELL, from, value, hash, tokenMetaData, timestamp };
  },
  */
};

module.exports = uniswapHelper;
