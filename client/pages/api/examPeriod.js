import excuteQuery from "@/utils/connect";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken";
import handle from "@/utils/handle";
import { allMiddleware } from "@/utils/handle";

const table = "examperiods";

// export default allMiddleware
// export default nextConnect({
//   onError(error, req, res) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// })
//   .use(async (req, res, next) => {
//     // const authorizationHeader = req.headers.authorization;
//     next();
//     // if (authorizationHeader == process.env.NEXT_PUBLIC_TOKEN) {
//     //   console.log("send Email");
//     //   next();
//     // } else {
//     //   // No authorization header, return an empty response
//     //   res.status(401).json({ error: "Unauthorized" });
//     // }
//   })

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
  const token = authorizationHeader.split(" ")[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded) {
          next();
        } else {
          // res.setHeader(
          //   "Set-Cookie",
          //   "token=; Max-Age=0; Secure; SameSite=None; Path=/"
          // );
          res.status(403).json({ error: "Forbidden" });
        }
      } catch (error) {
        console.log("error", error);

        // res.setHeader(
        //   "Set-Cookie",
        //   "token=; Max-Age=0; Secure; SameSite=None; Path=/"
        // );
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      // res.setHeader(
      //   "Set-Cookie",
      //   "token=; Max-Age=0; Secure; SameSite=None; Path=/"
      // );
      res.status(401).json({ error: "Unauthorized" });
    }
  })
  .get(async (req, res) => {
    // Get data from database
    const result = await excuteQuery({ query: `SELECT * FROM ${table}` });
    res.json(result);
  })
  .post(async (req, res) => {
    // Post data into database
    const data = req.body;
    const result = await excuteQuery({
      query: `INSERT INTO ${table} SET ?`,
      values: [data],
    });
    res.json(result);
  })
  .put(async (req, res) => {
    // Update data from database
    const { id } = req.query;
    const { examStart, examEnd, isEnable } = req.body;
    const result = await excuteQuery({
      query: `UPDATE ${table} SET examStart = ?, examEnd = ?, isEnable = ? WHERE _id = ?`,
      values: [examStart, examEnd, isEnable, id],
    });
    res.json(result);
  });
