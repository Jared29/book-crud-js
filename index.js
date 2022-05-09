// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://jstull29:4mS69fOTPJe6x1T1@book.ezg04.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { dbName: "bookDB", useNewUrlParser: true }
);
