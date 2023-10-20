const { DataTypes } = require("sequelize");
const dbConnection = require("../DB_Config");
const borrowers = dbConnection();
const Borrower = borrowers.define(
  "Borrower",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      required: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      required: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "borrowers",
  }
);

borrowers
  .sync()
  .then(() => {
    console.log("Table borrowers created successfully");
  })
  .catch((error) => {
    console.error("Error creating table borrowers:", error);
  });

module.exports = Borrower;
