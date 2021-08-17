//read .env file
require("dotenv").config();
const { PORT } = process.env;

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//import controllers
const BookRouter = require("./controllers/Books.controllers");
const UserRouter = require("./routes/User.routes");

//import mongoose connection from DB
const mongoose = require("./db/db");

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//insert Routers here
app.use("/books", BookRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.send("Welcome To BookFinder API");
});

//listener when server is running
app.listen(PORT, () => {
  console.log(`Port is listening, currently on ${PORT}`);
});
