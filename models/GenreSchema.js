const {Schema, model} = require("mongoose")
const Book = require('./BookSchema');

const genreSchema = new Schema({
    genre: [{type: String, required: true, ref: Book}]
})

const Genre = model("genre", genreSchema)

module.exports = Genre
