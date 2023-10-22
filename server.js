require("dotenv").config();
const express = require("express");
const app = express();
const bookRoutes = require("./routes/books");
const borrowerRoutes = require("./routes/borrowers");
const borrowingProcessesRoutes = require("./routes/borrowingProcesses");
const { updateDueDateBooks } = require("./shared/cronjobs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/book", bookRoutes);
app.use("/borrower", borrowerRoutes);
app.use("/process", borrowingProcessesRoutes);

updateDueDateBooks.start();

app.listen(8080, () => {
  console.log("server is running on port 8080");
});

module.exports = app;
