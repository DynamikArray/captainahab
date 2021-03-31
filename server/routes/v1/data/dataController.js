const axios = require("axios");
const cheerio = require("cheerio");

const ETHERSCAN_URL = "https://etherscan.io";

async function search(req, res, next) {
  const address = req.query.address;

  const html = await axios.get(`${ETHERSCAN_URL}/address/${address}`, {
    params,
  });

  console.log(html);
}
module.exports = { search };
