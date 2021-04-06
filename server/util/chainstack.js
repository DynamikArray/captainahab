const Web3 = require("web3");

const WSS_URL = process.env.CHAINSTACK_WSS_URL;
const USERNAME = process.env.CHAINSTACK_USERNAME;
const PASSWORD = process.env.CHAINSTACK_PASSWORD;

const chainstack = new Web3(new Web3.providers.WebsocketProvider(`wss://${USERNAME}:${PASSWORD}@${WSS_URL}`));

module.exports = { chainstack };
