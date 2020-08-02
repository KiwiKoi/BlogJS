"use strict";
require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");

const path = require("path");
const app = express();
const port = 3000;

app.use(cors());

// Connect to database
const connection = mysql.createConnection({
  // DB properties
  host: root,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

connection.connect((error) => {
  if (!!error) {
    console.log("Error");
  } else {
    console.log("Connected");
  }
});

app.use(express.static(__dirname + "/public"));

// Setup view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
// Home page route

app.get("/", (req, res) => {
  res.render("index");
});
// Create Article page route
app.get("/create", function (req, res) {
  res.sendFile(__dirname + "/client/create-article.html");
});
// Article list page route
app.get("/articles", (req, res) => {
  connection.query("SELECT * FROM articles", (err, articles) => {
    if (err) {
      throw err;
    } else {
      console.log(articles);
      res.render("articles", { data: articles });
    }
  });
});
// Individual Article page route
app.get("/article/:id", (req, res) => {
  connection.query(
    `SELECT * FROM articles WHERE id = ${req.params.id}`,
    (err, article) => {
      if (err) throw err;
      console.log(article);
      res.render("article", { article });
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
