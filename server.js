//read .env file
require("dotenv").config()
const {PORT = 3000} = process.env

const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")

//import controllers
const BookRouter = require('./controllers/BookControllers')
//import mongoose connection from DB
const mongoose = require('./db/db')


//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))

//insert Routers here
app.use("/books", BookRouter)

app.get("/", (req, res) => {
    res.send("Welcome To BookFinder API")
})

//listener when server is running
app.listen(PORT, () =>{
    console.log(`Port is listening, currently on ${PORT}`)
})

