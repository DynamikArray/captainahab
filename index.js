//alchemy
const { web3 } = require("./util/alchemy");
//our transaction halper
const transactionHelper = require("./helpers/transactionHelper");

//abi helper lib from npm
const abiHelper = require("./helpers/abiHelper");
const InputDataDecoder = require("ethereum-input-data-decoder");

//uniswap information
const uniswapHelper = require("./helpers/uniswapHelper");
const ADDRESS_UNISWAP_ROUTER = uniswapHelper.uniswapRouterAddress();

//main configs
const TRANASCTIONS_TO_SHOW = 100;
const TRANSACTION_AMOUNT_THRESHOLD_IN_ETH = 20;

async function main() {
  const abi = await abiHelper.getAbiByAddress(ADDRESS_UNISWAP_ROUTER);
  const decoder = new InputDataDecoder(abi);

  const txs = await transactionHelper.fetchTxs(
    ADDRESS_UNISWAP_ROUTER,
    [ADDRESS_UNISWAP_ROUTER],
    TRANASCTIONS_TO_SHOW,
    TRANSACTION_AMOUNT_THRESHOLD_IN_ETH
  );

  if (txs.length == 0) {
    console.log("No Transactions");
  } else {
    const formattedResults = await Promise.all(
      txs.map(async (tx) => {
        const result = await web3.eth.getTransaction(tx.hash);
        const input = decoder.decodeData(result.input);

        switch (input.method) {
          case "swapExactETHForTokens":
            return await uniswapHelper.swapExactETHForTokens(tx, input);
            break;
          case "swapETHForExactTokens":
            return await uniswapHelper.swapETHForExactTokens(tx, input);
            break;
          case "swapExactTokensForETH":
            return await uniswapHelper.swapExactTokensForETH(tx, input);
            break;
          case "swapTokensForExactETH":
            uniswapHelper.swapTokensForExactETH(tx, input);
            break;
          default:
            return "NOT CONFIGURED";
          //console.log(input);
        }
      })
    );

    console.log(formattedResults);
  }
}

main();

//
//unistake token
//  const ADDRESS_UNISTAKE_TOKEN = "0x9ed8e7c9604790f7ec589f99b94361d8aab64e5e";
//Wrapped Ether token
//  const ADDRESS_WETH_TOKEN = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
//chico crypto wallet
//  const ADDRESS_TO_CHECK = "0x74CeF352303224D97633B736872d2A8D91Dd6f59";
//  const ADDRESS_BALPHA_TOKEN = "0x7a5ce6abd131ea6b148a022cb76fc180ae3315a6";

//
//
//console.log(txs.transfers);
/*
  const logEvents = web3.eth.subscribe("logs", {
    address: "0x9Ed8e7C9604790F7Ec589F99b94361d8AAB64E5E",
  });

  logEvents
    .on("connected", (subscriptionId) => {
      console.log("Subscription Connected Id=" + subscriptionId);
    })
    .on("data", (log) => {
      console.log(log);
    });
  */
//console.log(events);
/*
  const transfers = await web3.alchemy.getAssetTransfers({
    contractAddress: "0x9ed8e7c9604790f7ec589f99b94361d8aab64e5e",
    maxCount: 10,
  });
  */
//console.log("Transfers Are " + transfers);
