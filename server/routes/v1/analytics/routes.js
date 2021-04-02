var express = require("express");
var router = express.Router();

const analyticsController = require("./analyticsController");

router.get("/trending", analyticsController.trending);

module.exports = router;
