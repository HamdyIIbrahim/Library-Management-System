const express = require("express");
const router = express.Router();
const borrowerControllers = require("../controllers/borrowers");

router.get("/get-all-borrowers", borrowerControllers.getAllBorrowers);
router.post("/add-borrower", borrowerControllers.createBorrower);
router.put("/update-borrower/:id", borrowerControllers.updateBorrower);
router.delete("/delete-borrower/:id", borrowerControllers.deleteBorrower);
router.post("/get-borrower", borrowerControllers.findBorrowerByEmail);

module.exports = router;
