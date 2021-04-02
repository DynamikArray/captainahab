const mongoose = require("mongoose");

const Transactions = require("./Transactions");
const TokensMetaData = require("./TokensMetaData");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

const models = { Transactions, TokensMetaData };
//export default models;
module.exports = { models, connectDb };
