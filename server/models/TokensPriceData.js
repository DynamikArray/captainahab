const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TokensPriceDataSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      unique: true,
      required: true,
    },
    currency: {
      type: String,
    },
    name: {
      type: String,
    },
    logo_url: {
      type: String,
    },
    status: {
      type: String,
    },
    price: {
      type: String,
    },
    price_date: {
      type: String,
    },
    price_timestamp: {
      type: String,
    },
    circulating_supply: {
      type: String,
    },
    max_supply: {
      type: String,
    },
    market_cap: {
      type: String,
    },
    num_exchanges: {
      type: String,
    },
    num_pairs: {
      type: String,
    },
    rank: {
      type: String,
    },
    high: {
      type: String,
    },
    high_timestamp: {
      type: String,
    },
    "1d": {
      volume: {
        type: String,
      },
      price_change: {
        type: String,
      },
      price_change_pct: {
        type: String,
      },
      volume_change: {
        type: String,
      },
      volume_change_pct: {
        type: String,
      },
      market_cap_change: {
        type: String,
      },
      market_cap_change_pct: {
        type: String,
      },
    },
    "7d": {
      volume: {
        type: String,
      },
      price_change: {
        type: String,
      },
      price_change_pct: {
        type: String,
      },
      volume_change: {
        type: String,
      },
      volume_change_pct: {
        type: String,
      },
      market_cap_change: {
        type: String,
      },
      market_cap_change_pct: {
        type: String,
      },
    },
    "30d": {
      volume: {
        type: String,
      },
      price_change: {
        type: String,
      },
      price_change_pct: {
        type: String,
      },
      volume_change: {
        type: String,
      },
      volume_change_pct: {
        type: String,
      },
      market_cap_change: {
        type: String,
      },
      market_cap_change_pct: {
        type: String,
      },
    },
    "365d": {
      volume: {
        type: String,
      },
      price_change: {
        type: String,
      },
      price_change_pct: {
        type: String,
      },
      volume_change: {
        type: String,
      },
      volume_change_pct: {
        type: String,
      },
      market_cap_change: {
        type: String,
      },
      market_cap_change_pct: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

TokensPriceDataSchema.plugin(mongoosePaginate);

const TokensPriceData = mongoose.model("TokensPriceData", TokensPriceDataSchema);

module.exports = TokensPriceData;
