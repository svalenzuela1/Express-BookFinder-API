const favorites = require("../controllers/Favorites.controllers");
const router = require("express").Router();

router.get("/", favorites.findAllFavorites);

router.post("/:username/:bookISBN", favorites.addFavorite);

router.get("/:bookId", favorites.showFavoritesPerBook);

router.get("/:username/all", favorites.findUserFavorites);

router.delete("/:username/:favoriteId", favorites.removeFavorite);

module.exports = router;
