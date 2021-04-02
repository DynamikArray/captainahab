const axios = require("axios");
const cheerio = require("cheerio");

const { web3 } = require("../../../util/alchemy");
const { logger } = require("../../../util/log");

const blockHelper = require("../../../helpers/blockHelper");

async function loadBlock(req, res, next) {
  const blockNumber = await web3.eth.getBlockNumber();
  logger.info("Attemp Loading Block | block=" + blockNumber);

  const results = blockHelper.loadBlock(blockNumber);

  res.send({ blockNumber, results });
}

async function search(req, res, next) {
  const address = req.query.address;
  const ETHERSCAN_URL = "https://etherscan.io";
  const html = await axios.get(`${ETHERSCAN_URL}/address/${address}`, {
    params,
  });

  console.log(html);
}

module.exports = { search, loadBlock };
