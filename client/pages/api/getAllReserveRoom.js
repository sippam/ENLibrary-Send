import excuteQuery from "@/utils/connect";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken";
import handle from "@/utils/handle";
import { allMiddleware } from "@/utils/handle";

const table = "roomReserve";
const tableUserData = "userData";

// export default allMiddleware.
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
    const allReserveRoom = await excuteQuery({
      query: `
      SELECT *
      FROM \`${table}\` AS t1
      JOIN \`${tableUserData}\` AS t2 ON t1.id = t2.id
    `,
    });

    const decodeData = allReserveRoom.map((row) => ({
      ...row,
      email: Buffer.from(row.email, "base64").toString("utf-8"),
      title: Buffer.from(row.title, "base64").toString("utf-8"),
      name: Buffer.from(row.name, "base64").toString("utf-8"),
      surname: Buffer.from(row.surname, "base64").toString("utf-8"),
      cn: Buffer.from(row.cn, "base64").toString("utf-8"),
      faculty: Buffer.from(row.faculty, "base64").toString("utf-8"),
    }));

    if (decodeData) {
      res.json(decodeData);
    } else {
      res.json([]);
    }
  });
