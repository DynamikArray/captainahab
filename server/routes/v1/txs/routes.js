var express = require("express");
var router = express.Router();

const txsController = require("./txsController");

router.get("/search", txsController.search);

module.exports = router;
