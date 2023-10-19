const express = require("express");
const router = express.Router();
const bookControllers = require("../controllers/books");

router.get("/get-all-books", bookControllers.getAllBooks);
router.post("/add-book", bookControllers.createBook);

module.exports = router;