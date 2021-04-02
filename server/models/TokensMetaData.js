const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TokensMetaDataSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      unique: true,
      required: true,
    },
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
  { timestamps: true }
);

TokensMetaDataSchema.plugin(mongoosePaginate);

const TokensMetaData = mongoose.model("TokensMetaData", TokensMetaDataSchema);

module.exports = TokensMetaData;
