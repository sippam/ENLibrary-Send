import excuteQuery from "@/utils/connect";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken";

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
      try {
        const token = req.query.token;

        jwt.verify(token, process.env.JWT_SECRET);
        next();
      } catch (error) {
        console.log("updateStatus", error);
        // Token is expired or invalid
        if (error.name === "TokenExpiredError") {
          // res.setHeader(
          //   "Set-Cookie",
          //   "token=; Max-Age=0; Secure; SameSite=None; Path=/"
          // );

          // Redirect to the home page
          // res.writeHead(302, { Location: '/' });
          // res.end();
          res.json("TokenExpried")
        }
      }
    } else {
      // No authorization header, return an empty response
      res.status(401).json({ error: "Unauthorized" });
    }
  })
  .get(async (req, res) => {
    const token = req.query.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const haveRoom = await excuteQuery({
      query: `SELECT * FROM ${table} WHERE id = ?`,
      values: [decoded.id],
    });

    res.json(haveRoom);
  })
  .put(async (req, res) => {
    const { id, inLibrary } = req.body;

    await excuteQuery({
      query: `UPDATE ${table} SET inLibrary = ? WHERE id = ?`,
      values: [inLibrary, id],
    });
  });
