const Web3 = require("web3");
const { logger } = require("./log");

const WSS_URL = process.env.CHAINSTACK_WSS_URL;
const USERNAME = process.env.CHAINSTACK_USERNAME;
const PASSWORD = process.env.CHAINSTACK_PASSWORD;

const provider = new Web3.providers.WebsocketProvider(`wss://${USERNAME}:${PASSWORD}@${WSS_URL}`, {
  clientConfig: {
    keepalive: true,
    keepaliveInterval: 60000,
  },
  reconnect: {
    auto: true,
    delay: 2500,
    maxAttempts: 10,
  },
});

provider.on("close", (err) => {
  logger.error(`WebSocket connection closed. Error code ${err.code}, reason "${err.reason}"`);
  // invert your own error handling here
});

const chainstack = new Web3(provider);

module.exports = { chainstack };
