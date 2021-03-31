var express = require("express");
var router = express.Router();

const txsRouter = require("./txs/routes");
const dataRouter = require("./data/routes");

router.use("/txs", txsRouter);
router.use("/data", dataRouter);

module.exports = router;
