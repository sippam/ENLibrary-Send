// import { connectMongo } from "@/utils/connectMongo";
// import AllCustomer from "@/models/allcustomer";
// import { connectMYSQL } from "@/utils/connect";

// export default async function addAllCustumer(req, res) {
//   try {
//     // await connectMongo();
//     // if (req.method === "GET") {
//     //   const getAllCustomer = await AllCustomer.find({});
//     //   res.json({ getAllCustomer });
//     // } else if (req.method === "POST") {
//     //   const createAllCustomer = await AllCustomer.create(req.body);
//     //   res.json({ createAllCustomer });
//     // } else if (req.method === "DELETE") {
//     //   const { date, email, roomType, roomNumber, timeFrom, timeTo } = req.query;
//     //   // roomName,

//     //   const findData = await AllCustomer.findOne({
//     //     date,
//     //     roomType,
//     //     roomNumber,
//     //     timeFrom,
//     //     timeTo,
//     //   });
//     //   if (findData) {
//     //     if (
//     //       Buffer.from(findData.email, "base64").toString("utf-8") ==
//     //       Buffer.from(email, "base64").toString("utf-8")
//     //     ) {
//     //       const daleteData = await AllCustomer.findByIdAndDelete(findData._id);
//     //       res.json({ daleteData });
//     //     } else {
//     //       // If the email doesn't match, return an error
//     //       res
//     //         .status(400)
//     //         .json({ error: "Email doesn't match for decryption." });
//     //     }
//     //   } else {
//     //     // If the record is not found, return an error
//     //     res.status(404).json({ error: "Record not found." });
//     //   }
//     //   // const deleteAllCustomer = await AllCustomer.findOneAndDelete({
//     //   //   date,
//     //   //   email,
//     //   //   // roomName,
//     //   //   roomType,
//     //   //   roomNumber,
//     //   //   timeFrom,
//     //   //   timeTo,
//     //   // });
//     //   // res.json({ deleteAllCustomer });
//     // }
//     const connect = await connectMYSQL();

//     const table = "allcustomers";
//     switch (req.method) {
//       case "GET": {
//         const sql = `SELECT * FROM ${table}`;
//         connect.query(sql, (err, result) => {

//           if (err) {
//             res.status(500).json({ error: "Error fetching data from the database." });
//           }
//           res.json(result);
//         });
//         break;
//       }

//       case "POST": {
//         const userData = req.body;
//         const sqlPost = `INSERT INTO ${table} SET ?`;
//         console.log(userData);
//         connect.query(sqlPost, userData, (err, result) => {
//           if (err) res.status(500).json({ error: "Error fetching data from the database." });
//           console.log(result);
//           if (err) {
//             res.status(500).json({ error: "Error fetching data from the database." });
//           }
//           res.json(result);
//         });
//         break;
//       }

//       case "DELETE": {
//         const { date, email, roomType, roomNumber, timeFrom, timeTo } =
//           req.query;
//         const sql = `SELECT * FROM ${table} WHERE date = ? AND roomType = ? AND roomNumber = ? AND timeFrom = ? AND timeTo = ? LIMIT 1`;
//         connect.query(
//           sql,
//           [date, roomType, roomNumber, timeFrom, timeTo],
//           (err, result) => {

//             if (err) {
//               res.status(500).json({ error: "Error fetching data from the database." });
//             }
//             if (
//               Buffer.from(result[0].email, "base64").toString("utf-8") ==
//               Buffer.from(email, "base64").toString("utf-8")
//             ) {
//               const sqlDelete = `DELETE FROM ${table} WHERE _id = ?`;
//               connect.query(sqlDelete, result[0]._id, (err, result) => {
//                 if (err) {
//                   res.status(500).json({ error: "Error fetching data from the database." });
//                 }
//                 res.json(result);
//               });
//             }
//           }
//         );
//         break;
//       }
//       default: {
//         res.status(405).json({ error: "Method Not Allowed" });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// }

import { connectMYSQL } from "@/utils/connect";

export default async function addAllCustumer(req, res) {
  const pool = connectMYSQL();
  let connection;
  try {
    connection = await pool.getConnection();

    const table = "allcustomers";

    switch (req.method) {
      case "GET": {
        const [rows] = await connection.execute(`SELECT * FROM ${table}`);
        res.json(rows);
        break;
      }

      case "POST": {
        const userData = req.body;
        const [result] = await connection.execute(`INSERT INTO ${table} SET ?`, [
          userData,
        ]);
        res.json(result);
        break;
      }

      case "DELETE": {
        const { date, email, roomType, roomNumber, timeFrom, timeTo } =
          req.query;
        const [result] = await connection.execute(
          `SELECT * FROM ${table} WHERE date = ? AND roomType = ? AND roomNumber = ? AND timeFrom = ? AND timeTo = ? LIMIT 1`,
          [date, roomType, roomNumber, timeFrom, timeTo]
        );

        if (
          Buffer.from(result[0].email, "base64").toString("utf-8") ==
          Buffer.from(email, "base64").toString("utf-8")
        ) {
          const [deleteResult] = await connection.execute(
            `DELETE FROM ${table} WHERE _id = ?`,
            [result[0]._id]
          );
          res.json(deleteResult);
        } else {
          res
            .status(400)
            .json({ error: "Email doesn't match for decryption." });
        }
        break;
      }

      default: {
        res.status(405).json({ error: "Method Not Allowed" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (connection) {
      connection.release(); // Release the connection back to the pool
    }
  }
}
