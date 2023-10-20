const express = require("express");
const router = express.Router();
const prossesController = require("../controllers/borrowingProcesses");

router.post("/borrow-book", prossesController.borrowBook);

module.exports = router;
