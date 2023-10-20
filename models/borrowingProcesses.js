const { DataTypes } = require("sequelize");
const dbConnection = require("../DB_Config");
const borrowingProcesses = dbConnection();

const Process = borrowingProcesses.define(
  "Process",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "books",
        key: "id",
      },
    },
    borrower_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "borrowers",
        key: "id",
      },
    },
    borrow_date: {
      type: DataTypes.DATE,
    },
    due_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    borrower_returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    over_due_date: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "borrowing_processes",
  }
);

borrowingProcesses
  .sync()
  .then(() => {
    console.log("Table borrowing Processes created successfully");
  })
  .catch((error) => {
    console.error("Error creating table borrowing Processes:", error);
  });

module.exports = Process;
