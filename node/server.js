const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("./config");

const dbName = "Projekt_Štefan";

const { MongoClient } = require("mongodb");
const client = new MongoClient(config.databaseURL);

async function main() {
  try {
    await client.connect();
    console.log("Connected to database");
    const db = client.db(dbName);
    startServer(db);
  } catch (e) {
    console.error(e);
    console.error("Problem connecting to database");
  }
}

function startServer(database) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  /* app.use(express.static(__dirname + "/public/app")); */

  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Authorization"
    );
    next();
  });

  const authRouter = require("./app/routes/authenticate")(
    express,
    database,
    config.secret,
    jwt,
    bcrypt
  );

  app.use("/auth", authRouter);

  const apiRouter = require("./app/routes/api")(
    express,
    database,
    config.secret,
    jwt,
    bcrypt
  );

  app.use("/api", apiRouter);

  /* app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/app/index.html"));
  }); */

  app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
}

main();
