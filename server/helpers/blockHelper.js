const { web3 } = require("../util/alchemy");
const { infura } = require("../util/infura");
const { chainstack } = require("../util/chainstack");

const { logger } = require("../util/log");

const Transactions = require("../models/Transactions");

const abiHelper = require("./abiHelper");
const InputDataDecoder = require("ethereum-input-data-decoder");

const uniswapHelper = require("./uniswapHelper");
const ADDRESS_UNISWAP_ROUTER = uniswapHelper.uniswapRouterAddress();

const blockHelper = {
  decoder: false,

  //
  //
  //
  listenForNewBlocks: async function (em) {
    const blocks = [];

    infura.eth.subscribe("newBlockHeaders", async (err, result) => {
      if (!err) {
        logger.info("New Block Headers | block=" + result.number);
        blocks.push(result.number);

        if (blocks.length >= 2) {
          const startingBlock = blocks.sort().shift();
          const endingBlock = blocks.sort().shift();
          logger.info("Loading Blocks | startingBlock=" + startingBlock + " | endingBlock=" + endingBlock);

          const txIds = await blockHelper.loadBlocks(startingBlock, endingBlock);
          await em.emit("IncomingTxs", { txIds }); //emit to socketRoutes for handling

          const txsCount = await Transactions.countDocuments({});
          await em.emit("NewBlocksLoaded", { txsCount, blockNumber: result.number }); //emit to socketRoutes for handling
        } else {
          logger.info("Block added to queue | block=" + result.number);
        }
      }
    });
  },

  //
  //
  /* DEPRECATED FOR loadBlocks PLURAL to save API CREDITS
  loadBlock: async function (blockNumber) {
    try {
      const hexBlock = web3.utils.numberToHex(blockNumber);

      const abi = await abiHelper.getAbiByAddress(ADDRESS_UNISWAP_ROUTER);
      blockHelper.decoder = new InputDataDecoder(abi);

      const { transfers } = await web3.alchemy.getAssetTransfers({
        fromBlock: hexBlock,
        toBlock: hexBlock,
        category: ["external", "internal", "token"],
        toAddress: ADDRESS_UNISWAP_ROUTER,
        contractAddresses: [ADDRESS_UNISWAP_ROUTER],
      });

      const results = await blockHelper.formatBlocks(transfers);
      const savedResults = await Transactions.insertMany(results);

      logger.info("Total Results Saved: " + savedResults.length);
    } catch (loadBlockException) {
      logger.error("loadBlockException error=", loadBlockException.message);
    }
  },
  -- END DEPRECATED METHOID */

  loadBlocks: async function (startingBlock, endingBlock) {
    try {
      const hexStartBlock = web3.utils.numberToHex(startingBlock);
      const hexEndBlock = web3.utils.numberToHex(endingBlock);

      const abi = await abiHelper.getAbiByAddress(ADDRESS_UNISWAP_ROUTER);
      blockHelper.decoder = new InputDataDecoder(abi);

      const { transfers } = await web3.alchemy.getAssetTransfers({
        fromBlock: hexStartBlock,
        toBlock: hexEndBlock,
        category: ["external", "internal", "token"],
        toAddress: ADDRESS_UNISWAP_ROUTER,
        contractAddresses: [ADDRESS_UNISWAP_ROUTER],
      });

      const results = await blockHelper.formatBlocks(transfers);
      const savedResults = await Transactions.insertMany(results);

      logger.info("Total Results Saved: " + savedResults.length);

      return savedResults.reduce((acc, tx) => {
        acc.push(tx._id);
        return acc;
      }, []);
    } catch (loadBlocksException) {
      logger.error("loadBlocksException error=", JSON.stringify(loadBlocksException));
    }
  },

  //
  //
  //
  formatBlocks: async function (transfers) {
    const formattedResults = await Promise.all(
      transfers.map(async (tx) => {
        return await blockHelper.formatBlock(tx);
      })
    );

    return formattedResults.filter(Boolean);
  },

  //
  //
  //
  formatBlock: async function (tx) {
    try {
      //const result = await web3.eth.getTransaction(tx.hash);
      //moved to infuria?
      const result = await chainstack.eth.getTransaction(tx.hash);

      const input = blockHelper.decoder.decodeData(result.input);

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
          //logger.error("Unable to find method formatter in formatBlocks | hash=" + tx.hash);
          return false;
      }
    } catch (formatBlockException) {
      logger.error("Format Block Execption | error=" + formatBlockException.message + " | hash=" + tx.has);
    }
  },
};

module.exports = blockHelper;
