const express = require("express");
const router = express.Router();
const prossesController = require("../controllers/borrowingProcesses");

router.post("/borrow-book", prossesController.borrowBook);
router.get("/checked-out-books", prossesController.checkedOutBooks);
router.get("/check-borrower-books/:id", prossesController.checkBorrowerBooks);
router.patch("/return-book", prossesController.borrowerReturnBook);
router.get("/get-overdue-books", prossesController.overDueBooks);
router.post(
  "/get-report-in-specific-period",
  prossesController.borrowingProcessesReport
);
router.get(
  "/export-borrowing-processes-last-month",
  prossesController.borrowingProcessesLastMonth
);

module.exports = router;
