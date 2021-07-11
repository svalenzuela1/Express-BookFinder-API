//allows us to read from env file
require("dotenv").config()
const Book = require('../models/BookSchema')
//mongoose manages relationship between Node.js & MongoDB
const mongoose = require("mongoose")
const config = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
}

//destructure URI from .env file
const {MONGODBURI} = process.env

mongoose.connect(MONGODBURI, config)

//events for mongo
mongoose.connection
    .on("open", () => console.log("BookFinder API is Connected to Mongo"))
    .on("close", () => console.log("Mongo Connection Closed"))
    .on("error", (error) => console.log(error))

//KEEP UNCOMMENTED IN CASE I NEED TO DROP DATABASE AGAIN
//seed
//let addBooks = [
    // {
    //     "authors": ["J.D Salinger"],
    //     "ISBN": 255,
    //     "title": "The Catcher in the Rye",
    //     "genre": "Fiction",
    //     "releaseDate": "July 16, 1951",
    // },
    //     {
    //     "authors": [],
    //     "ISBN": 135,
    //     "title": "They Both Die at the End",
    //     "genre": "Fiction",
    //     "releaseDate": "December 18, 2018",
    // },
    // {
    //     "authors": [],
    //     "ISBN": 223,
    //     "title": "The Fault in Our Stars",
    //     "genre": "Fiction",
    //     "releaseDate": "January 10, 2012",
    // },
    // {
    //     "authors": [],
    //     "ISBN": 344,
    //     "title": "Looking for Alaska",
    //     "genre": "Fiction",
    //     "releaseDate": "March 3, 2005",
    // },
    // {
    //     "authors": [
    //         "Truman Capote"
    //     ],
    //     "ISBN": 400,
    //     "title": "In Cold Blood",
    //     "genre": "True Crime",
    //     "releaseDate": "January 17, 1966",
    // },
//]

// addBooks.forEach(book =>{
//     Book.create(book)
//
// })


module.exports = mongoose
