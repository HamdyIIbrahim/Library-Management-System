const Book = require("../models/books");
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    if (!books) {
      return res.status(500).json({ error: "Error getting books" });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.message });
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
    res.status(error.statusCode || 500).json({ err: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookData = await Book.findByPk(bookId);
    if (!bookData) {
      return res.status(404).json({ error: "Book not found" });
    }
    const validKeys = ["title", "author", "ISBN", "quantity", "shelf_location"];
    const updatedBookData = {};
    Object.keys(req.body).forEach((key) => {
      if (validKeys.includes(key) && req.body[key] !== undefined) {
        updatedBookData[key] = req.body[key];
      }
    });
    const updatedBook = await bookData.update(updatedBookData);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.message });
  }
};
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBook = await Book.destroy({ where: { id: id } });
    if (deleteBook === 0) {
      return res.status(400).json({ error: "no book found with this id" });
    }
    res.status(200).json("Book deleted successfully");
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.message });
  }
};

module.exports = { getAllBooks, createBook, deleteBook, updateBook };
