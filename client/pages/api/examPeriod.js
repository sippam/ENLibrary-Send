// // import { connectMongo } from "@/utils/connectMongo";
// // import Exam from "@/models/exam";
// import { connectMYSQL } from "@/utils/connect";

// export default async function getDataExam(req, res) {
//   try {
// //     // await connectMongo();
// //     // if (req.method === "GET") {
// //     //   const getDataExam = await Exam.find({});
// //     //   res.json({ getDataExam });
// //     // } else if (req.method === "PUT") {
// //     //   const { id } = req.query;
// //     //   const { examStart, examEnd, isEnable } = req.body;
// //     //   const updatedDataExam = await Exam.findByIdAndUpdate(
// //     //     id,
// //     //     { examStart, examEnd, isEnable },
// //     //     { new: true }
// //     //   );
// //     //   res.json({ updatedDataExam });
// //     // } else if (req.method === "POST") {
// //     //   const postDataWxam = await Exam.create(req.body);
// //     //   res.json({ postDataWxam });
// //     // } else {
// //     //   throw new Error(`Unsupported HTTP method: ${req.method}`);
// //     // }
//     const connect = await connectMYSQL();
    
//     const table = "examperiods";
//     switch (req.method) {
//       case "GET": {
//         const sql = `SELECT * FROM ${table}`;
//         connect.query(sql, (err, result) => {
          
//           if (err) res.status(500).json({ error: "Error fetching data from the database." });
//           res.json(result);
//         });
//         break;
//       }
//       case "POST": {
//         const data = req.body;
//         const sql = `INSERT INTO ${table} SET ?`;
//         connect.query(sql, data, (err, result) => {
          
//           if (err) res.status(500).json({ error: "Error fetching data from the database." });
//           res.json(result);
//         });
//         break;
//       }
//       case "PUT": {
//         const { id } = req.query;
//         const { examStart, examEnd, isEnable } = req.body;
//         const sql = `UPDATE ${table} SET examStart = ?, examEnd = ?, isEnable = ? WHERE _id = ?`;
//         connect.query(
//           sql,
//           [examStart, examEnd, isEnable, id],
//           (err, result) => {
//             if (err) res.status(500).json({ error: "Error fetching data from the database." });
//             res.json(result);
//           }
//         );
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

export default async function getDataExam(req, res) {
  const table = "examperiods";
  const pool = connectMYSQL();
  let connection;

  try {
    connection = await pool.getConnection();

    switch (req.method) {
      case "GET": {
        const [rows] = await connection.execute(`SELECT * FROM ${table}`);
        res.json(rows);
        break;
      }
      case "POST": {
        const data = req.body;
        const [result] = await connection.execute(`INSERT INTO ${table} SET ?`, [data]);
        res.json(result);
        break;
      }
      case "PUT": {
        const { id } = req.query;
        const { examStart, examEnd, isEnable } = req.body;
        const [result] = await connection.execute(
          `UPDATE ${table} SET examStart = ?, examEnd = ?, isEnable = ? WHERE _id = ?`,
          [examStart, examEnd, isEnable, id]
        );
        res.json(result);
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
