// import { connectMYSQL } from "@/utils/connect";

// export default async function addData(req, res) {
//   const table = "customers";
//   const pool = connectMYSQL();
//   let connection; // Declare connection outside the try block to ensure it's accessible in the finally block
//   try {
//     connection = await pool.getConnection();

//     switch (req.method) {
//       case "GET": {
//         connect.query(`SELECT * FROM ${table}`, (err, result) => {
          
//           if (err) {
//             res.status(500).json({ error: "Error fetching data from the database." });
//           }
//           res.json(result);
//         });
//         break;
//       }
//       case "POST": {
//         const userData = req.body;
//         const sql = `INSERT INTO ${table} SET ?`;
//         connect.query(sql, userData, (err, result) => {
          
//           if (err) {
//             res.status(500).json({ error: "Error fetching data from the database." });
//           }
//           res.json(result);
//         });
//         break;
//       }
//       case "DELETE": {
//         const { id } = req.query;
//         const sqlDelete = `DELETE FROM ${table} WHERE _id = ?`;
//         connect.query(sqlDelete, id, (err, result) => {
          
//           if (err) {
//             res.status(500).json({ error: "Error fetching data from the database." });
//           }
//           res.json(result);
//         });
//         break;
//       }
//       case "PUT": {
//         const { id } = req.query;
//         const { inLibrary } = req.body;
//         const sqlUpdate = `UPDATE ${table} SET inLibrary = ? WHERE _id = ?`;
//         connect.query(sqlUpdate, [inLibrary, id], (err, result) => {
          
//           if (err) {
//             res.status(500).json({ error: "Error fetching data from the database." });
//           }
//           res.json(result);
//         });
//         break;
//       }
//       default: {
//         res.status(405).json({ error: "Method Not Allowed" });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }finally {
//     pool.releaseConnection(connection); // Release the connection back to the pool
//   }
// }


import { connectMYSQL } from "@/utils/connect";

export default async function addData(req, res) {
  const table = "customers";
  const pool = connectMYSQL();
  let connection;

  try {
    connection = await pool.getConnection();

    switch (req.method) {
      case "GET": {
        const [rows, fields] = await connection.execute(`SELECT * FROM ${table}`);
        res.json(rows);
        break;
      }
      case "POST": {
        const userData = req.body;
        const [result] = await connection.execute(`INSERT INTO ${table} SET ?`, [userData]);
        res.json(result);
        break;
      }
      case "DELETE": {
        const { id } = req.query;
        const [result] = await connection.execute(`DELETE FROM ${table} WHERE _id = ?`, [id]);
        res.json(result);
        break;
      }
      case "PUT": {
        const { id } = req.query;
        const { inLibrary } = req.body;
        const [result] = await connection.execute(`UPDATE ${table} SET inLibrary = ? WHERE _id = ?`, [inLibrary, id]);
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
