// init project
require("dotenv").config();
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/:api?", (req, res, next) => {
  let api = req.params.api;

  api === "api" ? next() : res.json({ "error 404": "API" });
});

app.get("/api/:whoami?", (req, res) => {
  let whoami = req.params.whoami;

  let ipaddress = req.ip;
  let language = req.headers["accept-language"];
  let software = req.headers["user-agent"];

  whoami === "whoami"
    ? res.json({
        ipaddress: ipaddress,
        language: language,
        software: software,
      })
    : res.json({
        "error 404": "whoami",
      });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
