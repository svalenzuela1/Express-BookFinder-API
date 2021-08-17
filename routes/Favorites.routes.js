const favorites = require("../controllers/Favorites.controllers");
const router = require("express").Router();

router.get("/", favorites.findAll);

router.post("/:username/:bookTitle", favorites.addFavorite);

module.exports = router;
