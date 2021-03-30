const { web3 } = require("../util/alchemy");

const walletActions = { BUY: "Buy", SELL: "Sell" };

const uniswapHelper = {
  uniswapRouterAddress: () => {
    return "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  },

  swapExactETHForTokens: async ({ category, hash, from, value }, input) => {
    const tokenAddress = `0x${input.inputs[1][1]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    return { action: walletActions.BUY, from, value, tokenMetaData, category, hash };
  },

  swapETHForExactTokens: async ({ category, hash, from, value }, input) => {
    const tokenAddress = `0x${input.inputs[1][1]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    return { action: walletActions.BUY, from, value, tokenMetaData, category, hash };
  },

  swapExactTokensForETH: async ({ hash, value }, input) => {
    const from = input.inputs[3];
    const tokenAddress = `0x${input.inputs[2][0]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    return { action: walletActions.SELL, from, value, hash, tokenMetaData };
  },

  swapTokensForExactETH: async ({ to, value }, input) => {
    const from = input.inputs[3];
    const tokenAddress = `0x${input.inputs[2][0]}`;
    const tokenMetaData = await web3.alchemy.getTokenMetadata(tokenAddress);
    return { action: walletActions.SELL, from, value, hash, tokenMetaData };
  },
};

module.exports = uniswapHelper;
