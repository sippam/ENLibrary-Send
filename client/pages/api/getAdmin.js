import { connectMongo } from "@/utils/connectMongo";
import Admin from "@/models/admin";

export default async function getAdmin(req, res) {
  try {
    await connectMongo();
    if (req.method === "GET") {
      const getAdmin = await Admin.find({});
      res.json({ getAdmin });
    } else if (req.method === "POST") {
      const createAdmin = await Admin.create(req.body);
      res.json({ createAdmin });
    } else {
      throw new Error(`Unsupported HTTP method: ${req.method}`);
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}