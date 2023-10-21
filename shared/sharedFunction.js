const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const exportExcelSheet = async (data, fileName) => {
  try {
    const excelData = [];
    excelData.push([
      "Book Title",
      "ISBN",
      "Borrower Name",
      "Borrower Email",
      "Borrow Date",
      "Due Date",
      "Returned",
      "Over due date",
    ]);
    data.forEach((record) => {
      excelData.push([
        record.Book.dataValues.title,
        record.Book.dataValues.isbn,
        record.Borrower.dataValues.name,
        record.Borrower.dataValues.email,
        record.borrow_date,
        record.due_date,
        record.borrower_returned,
        record.over_due_date,
      ]);
    });
    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.aoa_to_sheet(excelData);
    xlsx.utils.book_append_sheet(workBook, workSheet, "ExcelSheet");
    workSheet["!cols"] = excelData.map((ele) => {
      return { wpx: 140 };
    });
    const saveDirectory = "./assets";
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
    }

    const filePath = path.join(saveDirectory, fileName);

    xlsx.writeFile(workBook, filePath);

    return filePath;
  } catch (err) {
    throw err;
  }
};

module.exports = { exportExcelSheet };
