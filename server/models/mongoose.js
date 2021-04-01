const mongoose = require("mongoose");

const Tx = require("./tx");

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

const models = { Tx };
//export default models;
module.exports = { models, connectDb };
