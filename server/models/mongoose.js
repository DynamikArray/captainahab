const mongoose = require("mongoose");

const Transactions = require("./Transactions");
const TokensMetaData = require("./TokensMetaData");
const TokensPriceData = require("./TokensPriceData");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

const models = { Transactions, TokensMetaData, TokensPriceData };
//export default models;
module.exports = { models, connectDb };
