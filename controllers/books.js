const Book = require("../models/books");
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    if (!books) {
      return res.status(500).json({ error: "Error getting books" });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(error.statuscode || 500).json({ err: error });
  }
};
const createBook = async (req, res) => {
  try {
    const { title, author, ISBN, quantity, shelf_location } = req.body;
    if (!title || !author || !ISBN || !quantity || !shelf_location) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBook = await Book.create({
      title,
      author,
      ISBN,
      quantity,
      shelf_location,
    });
    if (!newBook) {
      return res.status(500).json({ error: "Error creating book" });
    }
    res.status(200).json(newBook);
  } catch (error) {
    res.status(error.statuscode || 500).json({ err: error });
  }
};

module.exports = { getAllBooks, createBook };
