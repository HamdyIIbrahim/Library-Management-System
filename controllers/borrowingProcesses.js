const Book = require("../models/books");
const Borrower = require("../models/borrowers");
const Process = require("../models/borrowingProcesses");
const { Op } = require("sequelize");
const { exportExcelSheet } = require("../shared/sharedFunction");
/*
  getDate function to make the date into YYYY-MM_DD format.
*/
const getDate = async (date) => {
  let formattedDate;
  if (date) {
    const [day, month, year] = date.split("-") || date.split("/");
    formattedDate = new Date(`${year}-${month}-${day}`);
  } else {
    formattedDate = new Date();
  }
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const newDate = `${year}-${month}-${day}`;
  return newDate;
};
/*
  borrow book with book id , borrower id and due_date.
*/
const borrowBook = async (req, res) => {
  try {
    const { book_id, borrower_id, due_date } = req.body;
    if (!book_id || !borrower_id || !due_date) {
      return res
        .status(400)
        .json({ error: "book_id , borrower_id and due_date are required" });
    }
    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(404).json({ err: "no book found with this id" });
    }

    if (book.quantity === 0) {
      return res.status(404).json({ err: "book not available" });
    }
    const borrower = await Borrower.findByPk(borrower_id);
    if (!borrower) {
      return res.status(404).json({ err: "no borrower found with this id" });
    }
    const processData = {
      book_id,
      borrower_id,
    };
    processData["borrow_date"] = await getDate();
    const dueDate = await getDate(due_date);
    processData["due_date"] = dueDate;

    const new_borrowing_process = await Process.create(processData);
    if (!new_borrowing_process) {
      return res
        .status(400)
        .json({ message: "Error creating borrowing process" });
    }
    const updatedBookQuantity = await Book.update(
      { quantity: book.quantity - 1 },
      { where: { id: book_id } }
    );
    if (!updatedBookQuantity) {
      return res.status(400).json({ message: "Error updating book quatity" });
    }

    res.status(200).json(new_borrowing_process);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  get all checked out books.
*/
const checkedOutBooks = async (req, res) => {
  try {
    const allCheckedOutBooks = await Process.findAll({
      include: [
        {
          model: Book,
          attributes: ["title", "isbn"],
          required: true,
        },
        {
          model: Borrower,
          attributes: ["name", "email"],
          required: true,
        },
      ],
    });
    if (!allCheckedOutBooks) {
      return res.status(404).json({ message: "checked out books not founded" });
    }
    res.status(200).json(allCheckedOutBooks);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  get all borrower books they currently have by id .
*/
const checkBorrowerBooks = async (req, res) => {
  try {
    const borrowerId = req.params.id;
    const borrowerBooks = await Process.findAll({
      include: [
        {
          model: Book,
          attributes: ["title", "author", "isbn"],
        },
      ],
      where: {
        borrower_id: borrowerId,
        borrower_returned: false,
      },
    });
    if (!borrowerBooks) {
      return res
        .status(404)
        .json({ message: "no books found for this borrower" });
    }
    if (borrowerBooks.length === 0) {
      return res.status(200).json({ message: "you don't have any books" });
    }
    res.status(200).json(borrowerBooks);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  borrower return a book.
*/
const borrowerReturnBook = async (req, res) => {
  try {
    const { book_id, borrower_id, borrow_date } = req.body;
    if (!book_id || !borrower_id || !borrow_date) {
      return res
        .status(400)
        .json({ error: "book_id , borrower_id and borrow_date are required" });
    }
    const borrowDate = await getDate(borrow_date);
    const borrowedProcess = await Process.findOne({
      where: { book_id, borrower_id, borrow_date: borrowDate },
    });
    if (!borrowedProcess) {
      return res
        .status(404)
        .json({ message: "there is an error while finding checked out books" });
    }
    if (borrowedProcess.borrower_returned) {
      return res.status(400).json({ message: "the book already returned" });
    }
    const updatedProcess = await Process.update(
      { borrower_returned: true },
      { where: { id: borrowedProcess.id } }
    );
    if (!updatedProcess) {
      return res
        .status(500)
        .json({ message: "there is an error while returning this book" });
    }
    const bookData = await Book.findByPk(book_id);
    if (!bookData) {
      return res.status(404).json({ error: "no book found with this id" });
    }
    const updatedBookQuantity = await Book.update(
      { quantity: bookData.quantity + 1 },
      { where: { id: book_id } }
    );
    if (!updatedBookQuantity) {
      return res.status(400).json({ message: "Error updating book quatity" });
    }
    res.status(200).json({ message: "book returned successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error });
  }
};

/*
  get all list books that are overdue .
*/

const overDueBooks = async (req, res) => {
  try {
    const overDueBooksData = await Process.findAll({
      include: [
        {
          model: Book,
          attributes: ["title", "isbn"],
          required: true,
        },
        {
          model: Borrower,
          attributes: ["name", "email"],
          required: true,
        },
      ],
      where: {
        borrower_returned: false,
        over_due_date: {
          [Op.ne]: null,
        },
      },
    });
    if (!overDueBooksData) {
      return res.status(404).json({ message: "no over Due books found" });
    }
    res.status(200).json(overDueBooksData);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error });
  }
};
/*
  reports of the borrowing process in a specific period .
*/
const borrowingProcessesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "startDate and endDate are required" });
    }
    const start = await getDate(startDate);
    const end = await getDate(endDate);
    const startDateObject = new Date(start);
    const endDateObject = new Date(end);
    const borrowingData = await Process.findAll({
      include: [
        {
          model: Book,
          attributes: ["title", "isbn"],
        },
        {
          model: Borrower,
          attributes: ["name", "email"],
        },
      ],
      where: {
        borrow_date: {
          [Op.between]: [startDateObject, endDateObject],
        },
      },
    });
    if (!borrowingData) {
      return res
        .status(404)
        .json({ message: "not processes found during this dates" });
    }
    const excelData = [];
    borrowingData.forEach((element) => {
      excelData.push(element.dataValues);
    });
    const excelSheetUrl = await exportExcelSheet(
      excelData,
      "borrowing Report.xlsx"
    );
    if (!excelSheetUrl) {
      return res.status(500).json({ message: "can't export excel sheet" });
    }
    res.status(200).json(excelSheetUrl);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error });
  }
};
/*
  Exports all borrowing processes of the last month. .
*/
const borrowingProcessesLastMonth = async (req, res) => {
  try {
    const dateNow = new Date();
    const dateOneMonthAgo = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth() - 1,
      dateNow.getDate()
    );
    const borrowingDataLastMonth = await Process.findAll({
      include: [
        {
          model: Book,
          attributes: ["title", "isbn"],
        },
        {
          model: Borrower,
          attributes: ["name", "email"],
        },
      ],
      where: {
        borrow_date: {
          [Op.between]: [dateOneMonthAgo, dateNow],
        },
      },
    });
    if (!borrowingDataLastMonth) {
      return res
        .status(404)
        .json({ message: "not processes found during this dates" });
    }
    const excelData = [];
    borrowingDataLastMonth.forEach((element) => {
      excelData.push(element.dataValues);
    });
    const excelSheetUrl = await exportExcelSheet(
      excelData,
      "borrowing Processes last month.xlsx"
    );
    if (!excelSheetUrl) {
      return res.status(500).json({ message: "can't export excel sheet" });
    }
    res.status(200).json(excelSheetUrl);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error });
  }
};
module.exports = {
  borrowBook,
  checkedOutBooks,
  borrowerReturnBook,
  checkBorrowerBooks,
  overDueBooks,
  borrowingProcessesReport,
  borrowingProcessesLastMonth,
};
