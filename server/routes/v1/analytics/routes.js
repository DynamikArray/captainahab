var express = require("express");
var router = express.Router();

const analyticsController = require("../../../controllers/v1/analytics/analyticsController");

router.get("/trending", analyticsController.trendingCoins);
router.get("/wallets", analyticsController.trendingWallets);

module.exports = router;
