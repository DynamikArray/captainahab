var express = require("express");
var router = express.Router();

const dataController = require("./dataController");

router.get("/tx", dataController.search);

module.exports = router;
