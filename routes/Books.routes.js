const books = require("../controllers/Books.controllers");
const router = require("express").Router();

router.get("/", books.getAllBooks);

router.post("/search", books.searchBooks);

router.post("/", books.createBook);

router.get("/search/oneBook", books.searchSpecificBook);

router.patch("/:id", books.updateBook);

router.delete("/:id", books.deleteBook);

module.exports = router;
