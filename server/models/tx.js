const mongoose = require("mongoose");

const txSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Tx = mongoose.model("Tx", txSchema);

module.exports = Tx;
