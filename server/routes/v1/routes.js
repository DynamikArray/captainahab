var express = require("express");
var router = express.Router();

const txsRouter = require("./txs/routes");
const analyticsRouter = require("./analytics/routes");

router.use("/txs", txsRouter);
router.use("/analytics", analyticsRouter);

module.exports = router;
