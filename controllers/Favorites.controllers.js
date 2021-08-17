require("dotenv").config;

const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const Favorites = require("../models/Favorites.models");
const Books = require("../models/Books.models");
const User = require("../models/User.models");

exports.addFavorite = async (req, res) => {
  const { username, bookTitle } = req.params;

  const user = await User.findOne({ username: username });
  const book = await Books.findOne({ title: bookTitle });

  const favorite = await Favorites.create({ user: user._id, book: book._id });

  res.status(200).json({
    message: "Book has been added to favorites",
    favorite,
  });
};

exports.findAll = async (req, res) => {
  const favorites = await Favorites.find({});

  res.status(200).json({
    message: "temp route",
    favorites,
  });
};
