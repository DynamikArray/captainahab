const { web3 } = require("../util/alchemy");

const transactionHelper = {
  fetchPage: async function (options, pageKey = false) {
    console.log("Fetching Page: options=" + JSON.stringify(options) + " pageKey=" + pageKey || "NA");
    if (!pageKey) return await web3.alchemy.getAssetTransfers({ ...options });
    return await web3.alchemy.getAssetTransfers({ ...options, pageKey });
  },

  fetchTxs: async function (toAddress, contractAddresses, numberOfTxsToShow, tokenAmount = false, trim = false) {
    const blockNumber = await web3.eth.getBlockNumber();
    const fromBlock = web3.utils.numberToHex(blockNumber - 5);

    let txsCount = 0;
    let txsResults = [];
    let txsLimit = numberOfTxsToShow;
    let pageKey = false;
    do {
      //get our page with options
      const results = await transactionHelper.fetchPage(
        {
          fromBlock: fromBlock,
          category: ["external", "internal", "token"],
          toAddress: toAddress,
          contractAddresses: contractAddresses,
          maxCount: numberOfTxsToShow,
        },
        pageKey
      );
      //set for future request
      pageKey = results.pageKey;

      //Filter by value of  Token Amount
      if (tokenAmount) {
        const filtered = results.transfers.filter((tx) => tx.value > tokenAmount);
        if (filtered.length > 0) txsResults = [...txsResults, ...filtered];
      } else {
        if (results.transfers.length > 0) txsResults = [...txsResults, ...results.transfers];
      }

      //handler incrementors
      txsCount = txsResults.length;
      if (!pageKey) txsCount = txsLimit;
    } while (txsCount < txsLimit);

    //trim results to our exact amount and return?
    if (trim && txsResults.length > numberOfTxsToShow) return txsResults.slice(0, numberOfTxsToShow);
    //just return results no filter needed
    return txsResults;
  },
};

module.exports = transactionHelper;
