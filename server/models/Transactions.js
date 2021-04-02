const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const transactionsSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
    },
    from: {
      type: String,
    },
    txAction: {
      type: String,
    },
    value: {
      type: Number,
    },
    timestamp: {
      type: String,
    },
    tokenMetaData: {
      decimals: {
        type: Number,
      },
      logo: {
        type: String,
      },
      name: {
        type: String,
      },
      symbol: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

/*
transactionsSchema.post("insertMany", function (docs, next) {
  console.log("%s has been saved", docs.length);
});
*/

transactionsSchema.plugin(mongoosePaginate);

const Transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = Transactions;
