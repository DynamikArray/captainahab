const ETHERSCAN = "https://etherscan.io";

const fieldHelpers = {
  truncateValue: function (value, fixed) {
    return value.toFixed(fixed);
  },

  buyOrSellColor: function (txActionString) {
    if (txActionString == "Buy") {
      return "green";
    }
    if (txActionString == "Sell") {
      return "red";
    }
  },

  truncateTextValue: function (txtValue) {
    const pieces = txtValue.split("");
    const length = pieces.length;
    const beg = [...pieces].splice(0, 6).join("");
    const end = [...pieces].splice(length - 6, length).join("");
    return beg + "...." + end;
  },

  linkToEtherscanAddress: function (value) {
    return `${ETHERSCAN}/address/${value}`;
  },

  linkToEtherscanTx: function (value) {
    return `${ETHERSCAN}/tx/${value}`;
  },
};

module.exports = fieldHelpers;
