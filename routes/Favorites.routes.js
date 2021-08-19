const favorites = require("../controllers/Favorites.controllers");
const router = require("express").Router();

router.get("/all", favorites.findAllFavorites);

router.post("/:username/:bookISBN", favorites.addFavorite);

router.get("/:bookId", favorites.showFavoritesPerBook);

router.get("/:username/all", favorites.findUserFavorites);

module.exports = router;
