const cron = require("node-cron");
const Process = require("../models/borrowingProcesses");

const updateDueDateBooks = cron.schedule(
  "0 0 * * *",
  async () => {
    try {
      console.log("cron job started");
      const dateNow = new Date();
      const allProcess = await Process.findAll();

      for (const process of allProcess) {
        if (!process.dataValues.borrower_returned) {
          const dueDate = new Date(process.dataValues.due_date);
          if (dueDate < dateNow) {
            const daysOverdue = Math.floor(
              (dateNow.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            const updatedProcess = await Process.update(
              {
                over_due_date: `${daysOverdue} days`,
              },
              {
                where: {
                  id: process.dataValues.id,
                },
              }
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  {
    timezone: "Africa/Cairo",
  }
);
module.exports = { updateDueDateBooks };
