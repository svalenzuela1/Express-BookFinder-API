require("dotenv").config;

const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const Favorites = require("../models/Favorites.models");
const Books = require("../models/Books.models");
const User = require("../models/User.models");

exports.addFavorite = async (req, res) => {
  const { username, bookISBN } = req.params;

  const user = await User.findOne({ username: username });
  const book = await Books.findOne({ ISBN: bookISBN });

  const favorite = await Favorites.create({ user: user._id, book: book._id });

  res.status(200).json({
    message: "Book has been added to favorites",
    favorite,
  });
};

exports.showFavoritesPerBook = async (req, res) => {
  try {
    const targetBook = await Books.findById({ _id: req.params.bookId });

    const favorites = await Favorites.find({ book: targetBook._id });
  } catch (error) {}
};

exports.findAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorites.find({});

    res.status(200).json({
      message: "temp route",
      favorites,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findUserFavorites = async (req, res) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = await jwt.verify(token, SECRET);

      if (payload.username === req.params.username) {
        req.payload = payload;

        if (req.params.username) {
          const user = await User.find({ username: req.params.username });
          const userFavorites = await Favorites.find({ username: user._id });

          const data = [];

          await Promise.all(
            userFavorites.map(async (element) => {
              element.book = await Books.findOne({ _id: element.book });
              // console.log("data for books", element.book);
              // console.log(element);
              data.push(element);
              return element;
            })
          );

          console.log("data outside the map function", data);

          res.status(200).json({
            message: "it works",
            favorites: data,
          });
        }
      } else {
        res.status(400).json({ error: "Not Authorized" });
      }
    } else {
      res.status(400).json({ error: "No Token Provided" });
    }
  } catch (error) {
    res.status(500).json("The findUser Favorites didn't work");
  }
};

// exports.showFavoriteByID = async (req, res) => {
//   try {
//     const favorite = await Favorites.findById(req.params.id).populate("book");
//
//     res.status(200).json({
//       message: "Favorite Added",
//       favorite,
//     });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };
