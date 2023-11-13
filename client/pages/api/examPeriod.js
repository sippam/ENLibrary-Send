import excuteQuery from "@/utils/connect";

export default async function getDataExam(req, res) {
  const table = "examperiods";
  try {
    switch (req.method) {
      case "GET": {
        const result = await excuteQuery({ query: `SELECT * FROM ${table}` })
        res.json(result);
        break;
      }
      case "POST": {
        const data = req.body;
        const result = await excuteQuery({ query: `INSERT INTO ${table} SET ?`, values: [data]})
        res.json(result);
        break;
      }
      case "PUT": {
        const { id } = req.query;
        const { examStart, examEnd, isEnable } = req.body;
        const result = await excuteQuery({ query: `UPDATE ${table} SET examStart = ?, examEnd = ?, isEnable = ? WHERE _id = ?`, values: [examStart, examEnd, isEnable, id]})
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
