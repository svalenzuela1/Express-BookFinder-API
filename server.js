//read .env file
require("dotenv").config();
const { PORT } = process.env;

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//import controllers
const BookRouter = require("./routes/Books.routes");
const UserRouter = require("./routes/User.routes");
const FavoritesRouter = require("./routes/Favorites.routes");
//import mongoose connection from DB
const mongoose = require("./db/db");

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//insert Routers here
app.use("/books", BookRouter);
app.use("/user", UserRouter);
app.use("/user/favorites", FavoritesRouter);

app.get("/", (req, res) => {
  res.send("Welcome To BookFinder API");
});

//listener when server is running
app.listen(PORT, () => {
  console.log(`Port is listening, currently on ${PORT}`);
});
