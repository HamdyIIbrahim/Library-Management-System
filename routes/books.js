const express = require("express");
const router = express.Router();
const bookControllers = require("../controllers/books");

router.get("/get-all-books", bookControllers.getAllBooks);
router.post("/add-book", bookControllers.createBook);
router.patch("/update-book/:id", bookControllers.updateBook);
router.delete("/delete-book/:id", bookControllers.deleteBook);
router.post("/search/:value", bookControllers.findBook);

module.exports = router;
