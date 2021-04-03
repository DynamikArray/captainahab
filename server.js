require("dotenv").config();
const path = require("path");
const schedule = require("node-schedule");

const express = require("express");
const serveStatic = require("serve-static");
const morgan = require("morgan");

const app = express();
app.use(morgan("tiny"));

const { logger } = require("./server/util/log");
const { models, connectDb } = require("./server/models/mongoose");
const blockHelper = require("./server/helpers/blockHelper");
const tokenPricesHelper = require("./server/helpers/tokenPricesHelper");

const router = require("./server/routes/routes.js");

app.use(router);
router.use("/", serveStatic(path.join(__dirname, "/client/dist")));
router.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

connectDb().then(async () => {
  logger.info("Ahab Connected to Mongo");

  const port = process.env.PORT || 8080;
  app.listen(port);

  if (process.env.NODE_ENV != "development") {
    require("newrelic");
    logger.info(`Ahab will listen for new blocks!`);
    blockHelper.listenForNewBlocks();
  }

  if (process.env.RUN_PRICES_JOB == true) {
    const scheduleInterval = 2;
    logger.info(`Ahab will fetch prices every ${scheduleInterval} Minutes `);
    const pricesJob = schedule.scheduleJob(`*/${scheduleInterval} * * * * `, () => {
      tokenPricesHelper.runTokenPricesJob();
    });
  }

  logger.info(`Ahab is running on port: ${port}`);
});
