var express = require("express");
var router = express.Router();

const txsController = require("../../../controllers/v1/txs/txsController");

router.get("/search", txsController.search);
router.get("/txsCount", txsController.txsCount);

module.exports = router;
