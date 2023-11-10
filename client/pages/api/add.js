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
  }
  //  finally {
  //   if (connection) {
  //     connection.release(); // Release the connection back to the pool
  //   }
  // }
}
