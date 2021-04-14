export const rowHeaders = [
  {
    text: "Time",
    value: "tx.timestamp",
    sortable: true,
    align: "center",
    width: "100px",
  },
  {
    text: "Action",
    value: "tx.txAction",
    sortable: true,
    align: "center",
    width: "90px",
  },
  {
    text: "Value in ETH",
    value: "tx.value",
    sortable: true,
    align: "center",
    width: "100px",
  },
  {
    text: "Token",
    value: "tx.tokenMetaData",
    sortable: true,
    align: "right",
  },
  {
    text: "Chart",
    value: "tx.tokenMetaData.address",
    sortable: true,
    align: "center",
    width: "70px",
  },
  {
    text: "Current Price",
    value: "tx.tokenPricesData.price",
    sortable: true,
    align: "left",
  },
  {
    text: "Market Cap",
    value: "tx.tokenPricesData.market_cap",
    sortable: true,
    align: "left",
  },
  {
    text: "1d Price Action",
    value: "tx.tokenPricesData.1d",
    sortable: true,
    align: "left",
  },
  /*
  {
    text: "7d Price Action",
    value: "tokenPricesData.7d",
    sortable: true,
    align: "center",
  },
  */
  {
    text: "TX",
    value: "tx.hash",
    sortable: true,
    align: "center",
    width: "70px",
  },
  {
    text: "Wallet",
    value: "tx.from",
    sortable: true,
    align: "center",
    width: "70px",
  },
];
