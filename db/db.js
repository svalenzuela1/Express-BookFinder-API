//allows us to read from env file
require("dotenv").config()

//mongoose manages relationship between Node.js & MongoDB
const mongoose = require("mongoose")
const config = {useUnifiedTopology: true, useNewUrlParser: true}

//destructure URI from .env file
const {MONGODBURI} = process.env

mongoose.connect(MONGODBURI, config)

//events for mongo
mongoose.connection
    .on("open", () => console.log("BookFinder API is Connected to Mongo"))
    .on("close", () => console.log("Mongo Connection Closed"))
    .on("error", (error) => console.log(error))

module.exports = mongoose
