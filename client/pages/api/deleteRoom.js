import excuteQuery from "@/utils/connect";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken";
import { allMiddleware } from "@/utils/handle";

const table = "roomReserve";

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

//     // if (authorizationHeader == process.env.NEXT_PUBLIC_TOKEN) {
//       try {
//         // const token = req.query.token;
//         const token = req.headers.authorization;

//         jwt.verify(token, process.env.JWT_SECRET);
//         next();
//       } catch (error) {
//         console.log("deleteRoom", error);
//         // Token is expired or invalid
//         if (error.name === "TokenExpiredError") {
//           // res.setHeader(
//           //   "Set-Cookie",
//           //   "token=; Max-Age=0; Secure; SameSite=None; Path=/"
//           // );

//           // Redirect to the home page
//           // res.writeHead(302, { Location: '/' });
//           // res.end();
//           res.json("TokenExpried")
//         }
//       }
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
  .delete(async (req, res) => {
    const roomId = req.body.roomId;

    await excuteQuery({
      query: `DELETE FROM ${table} WHERE roomId = ?`,
      values: [roomId],
    });
    await excuteQuery({
      query: `DELETE FROM statsRoomReserve WHERE roomId = ?`,
      values: [roomId],
    });
  });
