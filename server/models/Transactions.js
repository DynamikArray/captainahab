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

transactionsSchema.plugin(mongoosePaginate);

const Transactions = mongoose.model("Transactions", transactionsSchema);

module.exports = Transactions;
