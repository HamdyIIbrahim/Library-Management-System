const Sequelize = require("sequelize");
const dbConnection = () => {
  try {
    const sequelize = new Sequelize(process.env.DB_CONNECTION, {
      dialect: "postgres",
      logging: false,
      timezone: "Africa/Cairo",
    });
    return sequelize;
  } catch (err) {
    return `There was an error: ${err}`;
  }
};
module.exports = dbConnection;
