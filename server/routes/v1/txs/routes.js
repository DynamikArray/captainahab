var express = require("express");
var router = express.Router();

const txsController = require("./txsController");

router.get("/search", txsController.search);
router.get("/txsCount", txsController.txsCount);

module.exports = router;
