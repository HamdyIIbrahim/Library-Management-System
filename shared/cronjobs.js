const cron = require("node-cron");
const Process = require("../models/borrowingProcesses");

const updateDueDateBooks = cron.schedule(
  "58 14 * * *",
  //   "0 0 * * *",
  async () => {
    try {
      console.log("cron job started");
      const allProcess = await Process.findAll();
      console.log(allProcess);
    } catch (error) {
      console.log(error);
    }
  },
  {
    timezone: "Africa/Cairo",
  }
);

updateDueDateBooks.start();
