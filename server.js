require("dotenv").config();
const express = require("express");
const app = express();
const bookRoutes = require("./routes/books");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/book", bookRoutes);
app.listen(8080, () => {
  console.log("server is running on port 8080");
});
