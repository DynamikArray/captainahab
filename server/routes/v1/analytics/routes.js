var express = require("express");
var router = express.Router();

const analyticsController = require("../../../controllers/v1/analytics/analyticsController");

router.get("/trending/coins", analyticsController.trendingCoins);
router.get("/trending/wallets", analyticsController.trendingWallets);

module.exports = router;
