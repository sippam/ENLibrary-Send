const express = require("express");
const differenceInMinutes = require("date-fns/differenceInMinutes");
const mysql = require("mysql2/promise");
require("dotenv").config();

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

  const roomReserve = "roomReserve";
  const statsRoomReserve = "statsRoomReserve";

  const [data] = await connection.execute(`SELECT * FROM ${roomReserve}`);
  const deleteUsers = data?.filter(
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
      ) > 15 &&
      data.inLibrary === 0
  );

  console.log("deleteUsers", deleteUsers);

  const deleteResults = [];

  for (const deleteUser of deleteUsers) {
    if (deleteUser.id != undefined) {
      const [deleteData] = await connection.execute(
        `DELETE FROM ${roomReserve} WHERE id = ?`,
        [deleteUser.id]
      );

      const deleteInAllCustomer = await connection.execute(
        `DELETE FROM ${statsRoomReserve} WHERE id = ?`,
        [deleteUser.id]
      );

      deleteResults.push(deleteData);
      deleteResults.push(deleteInAllCustomer);
    } else {
      console.log("notthing to delete");
    }
  }

  const deleteWhenTimePass = [];

  data?.map((data) => {
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
    if (deleteUserWhenTimePass._id != undefined) {
      const [deleteData] = await connection.execute(
        `DELETE FROM ${roomReserve} WHERE id = ?`,
        [deleteUserWhenTimePass._id]
      );

      deleteResults.push(deleteData);
    } else {
      console.log("notthing to delete");
    }
  }

  pool.end();

  setTimeout(loop, 5 * 60 * 1000);
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
