const { Schema, model } = require("mongoose")

const BooksModels = new Schema({
    ISBN: {type: Number, unique: true, required: true},
    authors: {type: Array},
    title: {type: String, required: true},
    imageURL: {type: String},
    genre: {type: Array},
    description: {type: String},
    releaseDate: {type: String, required: true},
    rating: {type: Schema.Types.ObjectId, ref: "Rating"}
})

//allows user to make search queries
BooksModels.index({'$**': 'text'})

const Book = model("book", BooksModels)

module.exports = Book
