const express = require("express");
const user = require("./models/customer");
const allcustomer = require("./models/allcustomer");
const differenceInMinutes = require("date-fns/differenceInMinutes");
const mysql = require("mysql2/promise");
require('dotenv').config();

const app = express();

const timezone = "Asia/Bangkok";

const formatTime = (year, month, day, hour, minute, sec) => {
  return new Date(
    new Date(year, month, day, hour, minute, sec).toLocaleString("en-US", {
      timeZone: timezone,
    })
  );
};

async function loop() {
  const getTime = new Date(
    new Date().toLocaleString("en-US", { timeZone: timezone })
  );
  const fullYear =
    getTime.getFullYear() +
    "/" +
    (getTime.getMonth() + 1) +
    "/" +
    getTime.getDate();

  console.log("Still running");

  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 1, // Adjust the limit as needed
  });

  const connection = await pool.getConnection();

  const [data] = await connection.execute("SELECT * FROM customers");
  const deleteUsers = data.filter(
    (data) =>
      data.date === fullYear &&
      differenceInMinutes(
        getTime,
        new Date(
          new Date(
            Number(data.year),
            Number(data.month) - 1,
            Number(data.day),
            data.timeFrom,
            0,
            0
          ).toLocaleString("en-US", { timeZone: timezone })
        )
      ) > 30 &&
      data.inLibrary === 0
  );

  console.log("deleteUsers", deleteUsers);

  const deleteResults = [];

  for (const deleteUser of deleteUsers) {
    const [deleteData] = await connection.execute(
      "DELETE FROM customers WHERE _id = ?",
      [deleteUser._id]
    );

    const deleteInAllCustomer = await connection.execute(
      "DELETE FROM allcustomers WHERE date = ? AND roomType = ? AND roomNumber = ? AND timeFrom = ? AND timeTo = ?",
      [
        deleteUser.date,
        deleteUser.roomType,
        deleteUser.roomNumber,
        deleteUser.timeFrom,
        deleteUser.timeTo,
      ]
    );

    deleteResults.push(deleteData);
    deleteResults.push(deleteInAllCustomer);
  }

  const deleteWhenTimePass = [];
  
  data.map((data) => {
    if (!data.between2days) {
      if (
        formatTime(data.year, data.month - 1, data.day, data.timeTo, 0, 0) <=
        getTime
      )
        deleteWhenTimePass.push(data);
    } else {
      if (
        formatTime(
          data.year,
          data.month - 1,
          Number(data.day) + 1,
          data.timeTo,
          0,
          0
        ) <= getTime
      )
        deleteWhenTimePass.push(data);
    }
  });

  console.log("deleteWhenTimePass", deleteWhenTimePass);

  for (const deleteUserWhenTimePass of deleteWhenTimePass) {
    const [deleteData] = await connection.execute(
      "DELETE FROM customers WHERE _id = ?",
      [deleteUserWhenTimePass._id]
    );

    deleteResults.push(deleteData);
  }

  pool.end();

  setTimeout(loop, 15 * 60 * 1000);
}

loop();

app.get("/", async (req, res) => {
  const response = {
    message: "Hi",
    deleteResults,
  };
  res.json(response);
});

module.exports = app;