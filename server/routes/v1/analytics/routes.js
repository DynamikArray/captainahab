var express = require("express");
var router = express.Router();

const analyticsController = require("../../../controllers/v1/analytics/analyticsController");

router.get("/trending", analyticsController.trending);

module.exports = router;
