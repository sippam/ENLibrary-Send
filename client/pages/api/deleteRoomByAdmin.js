import excuteQuery from "@/utils/connect";
import nextConnect from "next-connect";

const table = "roomReserve";

export default nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})
  .use(async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader == process.env.NEXT_PUBLIC_TOKEN) {
      next();
    } else {
      // No authorization header, return an empty response
      res.status(401).json({ error: "Unauthorized" });
    }
  })
  .delete(async (req, res) => {
    const id = req.body.id;
    console.log(id);
    await excuteQuery({
      query: `DELETE FROM ${table} WHERE id = ?`,
      values: [id],
    });
    await excuteQuery({
      query: `DELETE FROM statsRoomReserve WHERE id = ?`,
      values: [id],
    });
  });
