const Borrower = require("../models/borrowers");
/*
  get all borrowers.
*/
const getAllBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.findAll();
    if (!borrowers) {
      return res.status(500).json({ error: "Error getting borrowers" });
    }
    res.status(200).json(borrowers);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  create new borrower.
*/
const createBorrower = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }
    const newBorrower = await Borrower.create({
      name,
      email,
    });
    if (!newBorrower) {
      return res.status(500).json({ error: "Error creating borrower" });
    }
    res.status(200).json(newBorrower);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  update borrower by id .
*/
const updateBorrower = async (req, res) => {
  try {
    const borrowerId = req.params.id;
    const borrowerData = await Borrower.findByPk(borrowerId);
    if (!borrowerData) {
      return res.status(404).json({ error: "no borrower found with this id" });
    }
    const validKeys = ["name", "email"];
    const updatedBorrowerData = {};
    Object.keys(req.body).forEach((key) => {
      if (validKeys.includes(key) && req.body[key] !== undefined) {
        updatedBorrowerData[key] = req.body[key];
      }
    });
    const updatedBorrower = await borrowerData.update(updatedBorrowerData);
    res.status(200).json(updatedBorrower);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  delete borrower by id.
*/
const deleteBorrower = async (req, res) => {
  try {
    const borrowerId = req.params.id;
    const deleteBorrower = await Borrower.destroy({
      where: { id: borrowerId },
    });
    if (deleteBorrower === 0) {
      return res.status(404).json({ error: "no borrower found with this id" });
    }
    res.status(200).json({ message: "Borrower deleted successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};
/*
  find borrower by email .
*/
const findBorrowerByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json("email is required");
    }
    const borrower = await Borrower.findOne({ where: { email: email } });
    if (!borrower) {
      return res
        .status(404)
        .json({ message: "no borrower founded with this email" });
    }
    res.status(200).json(borrower);
  } catch (error) {
    res.status(error.statusCode || 500).json({ err: error.errors[0].message });
  }
};

module.exports = {
  getAllBorrowers,
  createBorrower,
  deleteBorrower,
  updateBorrower,
  findBorrowerByEmail,
};
