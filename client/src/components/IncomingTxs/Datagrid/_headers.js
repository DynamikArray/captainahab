export const rowHeaders = [
  {
    text: "Time",
    value: "timestamp",
    sortable: true,
    align: "center",
    width: "100px",
  },
  {
    text: "Action",
    value: "txAction",
    sortable: true,
    align: "center",
    width: "90px",
  },
  {
    text: "Value in ETH",
    value: "value",
    sortable: true,
    align: "center",
    width: "100px",
  },
  {
    text: "Token",
    value: "tokenMetaData",
    sortable: true,
    align: "right",
  },
  {
    text: "Chart",
    value: "tokenMetaData.address",
    sortable: true,
    align: "center",
    width: "70px",
  },
  {
    text: "Current Price",
    value: "tokenPricesData.price",
    sortable: true,
    align: "left",
  },
  {
    text: "Market Cap",
    value: "tokenPricesData.market_cap",
    sortable: true,
    align: "left",
  },
  {
    text: "1d Price Action",
    value: "tokenPricesData.1d",
    sortable: true,
    align: "center",
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
    value: "hash",
    sortable: true,
    align: "center",
    width: "70px",
  },
  {
    text: "Wallet",
    value: "from",
    sortable: true,
    align: "center",
    width: "70px",
  },
];
