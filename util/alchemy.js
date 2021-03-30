require("dotenv").config();
const ALCHEMY_WSS_URL = process.env.ALCHEMY_WSS_URL;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const web3 = createAlchemyWeb3(ALCHEMY_WSS_URL);

module.exports = { web3 };
