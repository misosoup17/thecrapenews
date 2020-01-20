//Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const logger = require("morgan");
// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

//Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

//Initialize express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraper", {
  useNewUrlParser: true
});

//Necc. for heroku to read public folder
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//routes
require("./config/routes");

//start server
app.listen(PORT, function() {
  console.log("http://localhost:" + PORT);
});

module.exports = app;