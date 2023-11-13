import excuteQuery from "@/utils/connect";

export default async function addData(req, res) {
  const table = "customers";

  try {
    switch (req.method) {
      case "GET": {
        const result = await excuteQuery({ query: `SELECT * FROM ${table}` });
        res.json(result);
        break;
      }
      case "POST": {
        const userData = req.body;
        const result = await excuteQuery({
          query: `INSERT INTO ${table} SET ?`,
          values: [userData],
        });
        res.json(result);
        break;
      }
      case "DELETE": {
        const { id } = req.query;
        const result = await excuteQuery({ query: `DELETE FROM ${table} WHERE _id = ?`, values: [id] });
        res.json(result);
        break;
      }
      case "PUT": {
        const { id } = req.query;
        const { inLibrary } = req.body;
        const result = await excuteQuery({ query: `UPDATE ${table} SET inLibrary = ? WHERE _id = ?`, values: [inLibrary, id]})
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
}
