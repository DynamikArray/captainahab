require("dotenv").config();
const path = require("path");
const express = require("express");
const serveStatic = require("serve-static");
const app = express();

const router = require("./server/routes/routes.js");
var morgan = require("morgan");
app.use(morgan("tiny"));

app.use(router);
//here we are configuring dist to serve app files
router.use("/", serveStatic(path.join(__dirname, "/client/dist")));
// this * route is to serve project on different page routes except root `/`
router.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Ahab is running on port: ${port}`);
