const Book = require("../models/books");
const { Op } = require("sequelize");

//get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    if (!books) {
      return res.status(500).json({ error: "Error getting books" });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  create a new book 
*/
const createBook = async (req, res) => {
  try {
    const { title, author, isbn, quantity, shelf_location } = req.body;
    if (!title || !author || !isbn || !quantity || !shelf_location) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBook = await Book.create({
      title,
      author,
      isbn,
      quantity,
      shelf_location,
    });
    if (!newBook) {
      return res.status(500).json({ error: "Error creating book" });
    }
    res.status(200).json(newBook);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  update book by id 
*/
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const bookData = await Book.findByPk(bookId);
    if (!bookData) {
      return res.status(404).json({ error: "no book found with this id" });
    }
    const validKeys = ["title", "author", "isbn", "quantity", "shelf_location"];
    const updatedBookData = {};
    Object.keys(req.body).forEach((key) => {
      if (validKeys.includes(key) && req.body[key] !== undefined) {
        updatedBookData[key] = req.body[key];
      }
    });
    const updatedBook = await bookData.update(updatedBookData);
    if (!updateBook) {
      return res
        .status(400)
        .json({ message: "There is an error in update book" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  delete book by id 
*/
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBook = await Book.destroy({ where: { id: id } });
    if (deleteBook === 0) {
      return res.status(404).json({ error: "no book found with this id" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  find book by title, author, or ISBN.
*/
const findBook = async (req, res) => {
  try {
    const searchValue = req.params.value;
    const searchResult = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchValue}%` } },
          { author: { [Op.iLike]: `%${searchValue}%` } },
          { isbn: { [Op.iLike]: `%${searchValue}%` } },
        ],
      },
      raw: true,
    });
    if (searchResult.length === 0) {
      return res
        .status(404)
        .json({ message: "no books founded with this search value" });
    }
    res.status(200).json(searchResult);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};

module.exports = { getAllBooks, createBook, deleteBook, updateBook, findBook };
