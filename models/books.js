const { DataTypes } = require("sequelize");
const dbConnection = require("../DB_Config");
const books = dbConnection();
const Book = books.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ISBN: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shelf_location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

books
  .sync()
  .then(() => {
    console.log("Table and Indexes created successfully");
  })
  .catch((error) => {
    console.error("Error creating table:", error);
  });

module.exports = Book;
