require("dotenv").config();
const path = require("path");
const schedule = require("node-schedule");
const serveStatic = require("serve-static");
const morgan = require("morgan");
const history = require("connect-history-api-fallback");

const app = require("express")();
app.use(morgan("tiny"));

const server = require("http").createServer(app);
const io = require("socket.io")(server, { serveClient: false });

const { logger } = require("./server/util/log");
const { models, connectDb } = require("./server/models/mongoose");
const blockHelper = require("./server/helpers/blockHelper");
const tokenPricesHelper = require("./server/helpers/tokenPricesHelper");

const router = require("./server/routes/routes.js");

app.use(router);
app.use(
  history({
    verbose: true,
    index: "/client/dist/index.html",
  })
);
router.use("/", serveStatic(path.join(__dirname, "/client/dist")));
router.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

//Once connect launch our server
connectDb().then(async () => {
  logger.info("Ahab Connected to Mongo");

  const port = process.env.PORT || 8080;
  server.listen(port);

  const events = require("events");
  const em = new events.EventEmitter();

  if (process.env.NODE_ENV != "development") {
    require("newrelic");
    logger.info(`Ahab will listen for new blocks!`);
    await blockHelper.listenForNewBlocks(em);
  }

  if (process.env.RUN_PRICES_JOB == true) {
    const scheduleInterval = 2;
    logger.info(`Ahab will fetch prices every ${scheduleInterval} Minutes `);
    const pricesJob = schedule.scheduleJob(`*/${scheduleInterval} * * * * `, () => {
      tokenPricesHelper.runTokenPricesJob();
    });
  }

  require("./server/socketRoutes")(io, em);

  logger.info(`Ahab API is running on port: ${port}`);
});
