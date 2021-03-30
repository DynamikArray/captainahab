const client = require("node-rest-client-promise").Client();
const API_KEY = process.env.ETHERSCAN_API_KEY;

const abiHelper = {
  getAbiByAddress: async function (contractAddress) {
    const etherescan_url = `http://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${API_KEY}`;
    const etherescan_response = await client.getPromise(etherescan_url);
    const CONTRACT_ABI = JSON.parse(etherescan_response.data.result);
    return CONTRACT_ABI;
  },
};

module.exports = abiHelper;
