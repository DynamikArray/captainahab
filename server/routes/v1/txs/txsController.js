//alchemy
const { web3 } = require("../../../util/alchemy");
const transactionHelper = require("../../../helpers/transactionHelper");
//abi helper lib from npm
const abiHelper = require("../../../helpers/abiHelper");
const InputDataDecoder = require("ethereum-input-data-decoder");

//uniswap information
const uniswapHelper = require("../../../helpers/uniswapHelper");
const ADDRESS_UNISWAP_ROUTER = uniswapHelper.uniswapRouterAddress();

//main configs send from client
const TRANASCTIONS_TO_SHOW = 50;
const TRANSACTION_AMOUNT_THRESHOLD_IN_ETH = 0.5;

async function search(req, res, next) {
  const abi = await abiHelper.getAbiByAddress(ADDRESS_UNISWAP_ROUTER);
  const decoder = new InputDataDecoder(abi);

  const ADDRESS_CONTRACT_TO_WATCH = "0x8b0E42F366bA502d787BB134478aDfAE966C8798";

  const txs = await transactionHelper.fetchTxs(
    ADDRESS_UNISWAP_ROUTER,
    [ADDRESS_UNISWAP_ROUTER],
    TRANASCTIONS_TO_SHOW,
    TRANSACTION_AMOUNT_THRESHOLD_IN_ETH
  );

  if (txs.length == 0) {
    res.send({ results: [] });
  } else {
    const formattedResults = await Promise.all(
      txs.map(async (tx) => {
        const result = await web3.eth.getTransaction(tx.hash);
        const input = decoder.decodeData(result.input);

        switch (input.method) {
          case "swapExactETHForTokens":
            return await uniswapHelper.BuyOrder(tx, input);
            break;
          case "swapETHForExactTokens":
            return await uniswapHelper.BuyOrder(tx, input);
            break;
          case "swapExactTokensForETH":
            return await uniswapHelper.SellOrder(tx, input);
            break;
          case "swapTokensForExactETH":
            return await uniswapHelper.SellOrder(tx, input);
            break;
          default:
            console.log("COULD NT FIND MATCH FOR TX=>\n", tx.hash, "\n\n");
            return false;
        }
      })
    );

    const filteredResults = formattedResults.filter(Boolean);

    res.send(filteredResults);
  }
}

module.exports = { search };
