var express = require("express");
var router = express.Router();

const txsRouter = require("./txs/routes");

router.use("/txs", txsRouter);

module.exports = router;
