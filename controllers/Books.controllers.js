require("dotenv").config();

//book Schema
const Book = require("../models/Books.models");

//router
const { Router } = require("express");
const router = Router();

//Get all books
router.get("/", async (req, res) => {
  try {
    const allBooks = await Book.find({});

    //check if there are any books in database
    allBooks
      ? res.status(200).json({
          statusCode: 200,
          message: "Here all the books that currently exist",
          allBooks,
        })
      : res.status(400).json({
          statusCode: 400,
          error: "There are No Books",
        });
  } catch (error) {
    res.status(400).json({ statusCode: 400, error: "Could not find Books" });
  }
});

//Get all books by Query
//paged text search query
router.post("/search", async (req, res) => {
  try {
    //NOTE: research how to modify query alphabetically
    //instead of by release date
    //query should be formatted as {"$search": "text"} to work
    const query = req.body;
    const findQuery = await Book.find({
      $text: query,
    }); //.sort({releaseDate: -1 })

    res.status(200).json({
      statusCode: 200,
      message: "Here are all the books that match the query",
      findQuery,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      error: "Query didnt work",
    });
  }
});

//will create Book
router.post("/", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(200).json({
      statusCode: 200,
      newBook,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      error: "Could Not Create Book. Please Try Again",
    });
  }
});

//Search specific Book
router.get("/search/oneBook", async (req, res) => {
  try {
    const { title, ISBN } = req.body;
    const book = await Book.findOne({ title });
    const bookISBN = await Book.findOne({ ISBN });

    book
      ? res.status(200).json({ statusCode: 200, book })
      : bookISBN
      ? res.status(200).json({
          statusCode: 200,
          bookISBN,
        })
      : res.status(400).json({
          error: "No Book Found",
        });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      error: "Error Finding Book, Please Try Again",
    });
  }
});

//update a book
router.patch("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { useFindAndModify: false }
    );

    //line 104 is not sending me updated response through json
    //create another variable to attempt to get updated response
    const updatedBook = await Book.findOne({ _id: req.params.id });

    //check if theres book in database
    //if successful send updated book to user
    book
      ? res.status(200).json({
          statusCode: 200,
          updatedBook,
        })
      : res.status(400).json({
          statusCode: 400,
          error: "Error Updating Book Try Again",
        });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      error: error,
    });
  }
});

//delete a book
router.delete("/:id", async (req, res) => {
  try {
    const deleteBook = await Book.findByIdAndDelete({ _id: req.params.id });

    //check if theres book in database
    //if successful send updated book to user
    deleteBook
      ? res.status(200).json({
          statusCode: 200,
          message: "Book Has Been Deleted",
          deleteBook,
        })
      : res.status(400).json({
          statusCode: 400,
          error: "Could not find Book To Delete, Try Again",
        });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      error: "Could Not Delete Book",
    });
  }
});

module.exports = router;
