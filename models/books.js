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
      required: true,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(13),
      required: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
    },
    shelf_location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "books",
  }
);

books
  .sync()
  .then(() => {
    console.log("Table books created successfully");
  })
  .catch((error) => {
    console.error("Error creating table books:", error);
  });

module.exports = Book;
