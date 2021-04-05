require("dotenv").config();
const Web3 = require("web3");
const infura = new Web3(process.env.INFURA_RPC_URL);

module.exports = { infura };
