// import { connectMYSQL } from "@/utils/connect";

// export default async function addAllCustumer(req, res) {
//   const pool = connectMYSQL();
//   let connection;
//   try {
//     connection = await pool.getConnection();

//     const table = "allcustomers";

//     switch (req.method) {
//       case "GET": {
//         const [rows] = await connection.execute(`SELECT * FROM ${table}`);
//         res.json(rows);
//         break;
//       }

//       case "POST": {
//         const userData = req.body;
//         const [result] = await connection.execute(`INSERT INTO ${table} SET ?`, [
//           userData,
//         ]);
//         res.json(result);
//         break;
//       }

//       case "DELETE": {
//         const { date, email, roomType, roomNumber, timeFrom, timeTo } =
//           req.query;
//         const [result] = await connection.execute(
//           `SELECT * FROM ${table} WHERE date = ? AND roomType = ? AND roomNumber = ? AND timeFrom = ? AND timeTo = ? LIMIT 1`,
//           [date, roomType, roomNumber, timeFrom, timeTo]
//         );

//         if (
//           Buffer.from(result[0].email, "base64").toString("utf-8") ==
//           Buffer.from(email, "base64").toString("utf-8")
//         ) {
//           const [deleteResult] = await connection.execute(
//             `DELETE FROM ${table} WHERE _id = ?`,
//             [result[0]._id]
//           );
//           res.json(deleteResult);
//         } else {
//           res
//             .status(400)
//             .json({ error: "Email doesn't match for decryption." });
//         }
//         break;
//       }

//       default: {
//         res.status(405).json({ error: "Method Not Allowed" });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   } 
//   // finally {
//   //   if (connection) {
//   //     connection.release(); // Release the connection back to the pool
//   //   }
//   // }
// }


import excuteQuery from "@/utils/connect";

export default async function addAllCustumer(req, res) {
  try {
    const table = "allcustomers";
    switch (req.method) {
      case "GET": {
        // const [rows] = await connection.execute(`SELECT * FROM ${table}`);
        const result = await excuteQuery({ query: `SELECT * FROM ${table}` })
        res.json(result);
        break;
      }

      case "POST": {
        const userData = req.body;
        // const [result] = await connection.execute(`INSERT INTO ${table} SET ?`, [
        //   userData,
        // ]);
        const result = await excuteQuery({ query: `INSERT INTO ${table} SET ?`, values: [userData]})
        res.json(result);
        break;
      }

      case "DELETE": {
        const { date, email, roomType, roomNumber, timeFrom, timeTo } =
          req.query;
        // const [result] = await connection.execute(
        //   `SELECT * FROM ${table} WHERE date = ? AND roomType = ? AND roomNumber = ? AND timeFrom = ? AND timeTo = ? LIMIT 1`,
        //   [date, roomType, roomNumber, timeFrom, timeTo]
        // );
        const result = await excuteQuery({ query: `SELECT * FROM ${table} WHERE date = ? AND roomType = ? AND roomNumber = ? AND timeFrom = ? AND timeTo = ? LIMIT 1`, values: [date, roomType, roomNumber, timeFrom, timeTo]})

        if (
          Buffer.from(result[0].email, "base64").toString("utf-8") ==
          Buffer.from(email, "base64").toString("utf-8")
        ) {
          // const [deleteResult] = await connection.execute(
          //   `DELETE FROM ${table} WHERE _id = ?`,
          //   [result[0]._id]
          // );
          const deleteResult = await excuteQuery({ query: `DELETE FROM ${table} WHERE _id = ?`, values: [result[0]._id]})
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
  } 
}
