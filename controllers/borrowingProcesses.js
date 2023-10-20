const Process = require("../models/borrowingProcesses");
const getDate = async (date) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const newDate = `${year}-${month}-${day}`;
  return newDate;
};
const borrowBook = async (req, res) => {
  try {
    const { book_id, borrower_id, due_date } = req.body;
    if (!book_id || !borrower_id || !due_date) {
      return res
        .status(400)
        .json({ error: "book_id , borrower_id and due_date are required" });
    }
    const processData = {
      book_id,
      borrower_id,
    };
    processData["due_date"] = await getDate(due_date);
    processData["borrow_date"] = await getDate();
    console.log({ processData });
    const new_borrowing_process = await Process.create(processData);
    if (!new_borrowing_process) {
      return res
        .status(400)
        .json({ message: "Error creating borrowing process" });
    }
    res.status(200).json(new_borrowing_process);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error });
  }
};

module.exports = { borrowBook };
