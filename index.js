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

const bookSchema = {
  title: String,
  author: String,
  start: String,
  finish: String,
  chapters: Number,
};

const Book = mongoose.model("Book", bookSchema);

// Target all books
app
  .route("/books")
  .get(function (req, res) {
    Book.find(function (err, foundBooks) {
      if (!err) {
        res.send(foundBooks);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      start: req.body.start,
      finish: req.body.finish,
      chapters: req.body.chapters,
    });

    newBook.save(function (err) {
      if (!err) {
        res.send("Book added successfully.");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Book.deleteMany(function (err) {
      if (!err) {
        res.send("All books deleted.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
