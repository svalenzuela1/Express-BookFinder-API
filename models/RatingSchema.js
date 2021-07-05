const {Schema, model} = require("mongoose")
const { Book } = require('./BookSchema')

const ratingSchema = new Schema({
    book: {type: String, required: true, ref: Book.title},
    ISBN: {type: Number, required: true, ref: Book.ISBN},
    rating: {type: Number, required: true}
})

const Rating = model("rating", ratingSchema)

module.exports = Rating
