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
  }
  //  finally {
  //   if (connection) {
  //     connection.release(); // Release the connection back to the pool
  //   }
  // }
}
