require("dotenv").config();
const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
const app = express();
var morgan = require("morgan");
app.use(morgan("tiny"));

const { logger } = require("./server/util/log");

const { models, connectDb } = require("./server/models/mongoose");

const router = require("./server/routes/routes.js");
app.use(router);
router.use("/", serveStatic(path.join(__dirname, "/client/dist")));
router.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

connectDb().then(async () => {
  logger.info("Connected to Mongo");

  const port = process.env.PORT || 8080;
  app.listen(port);

  logger.info(`Ahab is running on port: ${port}`);
});
