const {Schema, model} = require("mongoose")
const { BookRef } = require('./BookSchema')

const ratingSchema = new Schema({
    book: {type: String, required: true, ref: BookRef.title},
    ISBN: {type: Number, required: true, ref: BookRef.ISBN},
    rating: {type: Number, required: true}
})

const Book = model("Rating", ratingSchema)

module.exports = Book
