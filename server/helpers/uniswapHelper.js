const { web3 } = require("../util/alchemy");

const uniswapHelper = {
  uniswapRouterAddress: () => {
    return "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  },

  swapExactETHForTokens: async ({ from, value }, input) => {
    const tokensAmount = input.inputs[1];
    const tokenAddress = `0x${input.inputs[1][1]}`;
    const { symbol, name } = await web3.alchemy.getTokenMetadata(tokenAddress);
    return "(BUY) WALLET: " + from + " swapExactETHForTokens " + value + " ETH for " + symbol + " - " + name;
  },

  swapETHForExactTokens: async ({ from, value }, input) => {
    const tokenAddress = `0x${input.inputs[1][1]}`;
    const { symbol, name } = await web3.alchemy.getTokenMetadata(tokenAddress);
    return "(BUY) WALLET: " + from + " swapETHForExactTokens " + value + " ETH for " + symbol + " - " + name;
  },

  swapExactTokensForETH: async ({ from, value }, input) => {
    const tokenAddress = `0x${input.inputs[2][1]}`;
    const { symbol, name } = await web3.alchemy.getTokenMetadata(tokenAddress);
    return "(SELL) WALLET: " + from + " swapExactTokensForETH " + value + " ETH for " + symbol + " - " + name;
  },

  swapTokensForExactETH: async ({ from, value }, input) => {
    const tokenAddress = `0x${input.inputs[2][1]}`;
    const { symbol, name } = await web3.alchemy.getTokenMetadata(tokenAddress);
    return "(SELL) WALLET: " + from + " swapTokensForExactETH " + value + " ETH for " + symbol + " - " + name;
  },
};

module.exports = uniswapHelper;
