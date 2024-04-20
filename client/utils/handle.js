import nextConnect from "next-connect";
import jwt from "jsonwebtoken";
import adminList from "./../data/adminList.json";

// export default nextConnect({
//   onError(error, req, res) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// }).use(async (req, res, next) => {
//   const authorizationHeader = req.headers.authorization;
//   // console.log("authorizationHeader", authorizationHeader);

//   // if (authorizationHeader == process.env.NEXT_PUBLIC_TOKEN) {
//   next();
//   // } else {
//   // No authorization header, return an empty response
//   // res.status(401).json({ error: "Unauthorized" });
//   // }
// });

// function checkRole() {
//   return function (req, res, next) {
//     const authorizationHeader = req.headers.authorization;
//     if (authorizationHeader) {
//       try {
//         const decoded = jwt.verify(authorizationHeader, process.env.JWT_SECRET);
//         const email = Buffer.from(decoded.email, "base64").toString("utf-8");

//         const userRole = adminList.email.includes(email);

//         if (userRole) {
//           next();
//         } else {
//           // res.setHeader(
//           //   "Set-Cookie",
//           //   "token=; Max-Age=0; Secure; SameSite=None; Path=/"
//           // );
//           res.status(403).json({ error: "Forbidden" });
//         }
//       } catch (error) {
//         console.log("error", error);

//         // res.setHeader(
//         //   "Set-Cookie",
//         //   "token=; Max-Age=0; Secure; SameSite=None; Path=/"
//         // );
//         res.status(401).json({ error: "Unauthorized" });
//       }
//     } else {
//       // res.setHeader(
//       //   "Set-Cookie",
//       //   "token=; Max-Age=0; Secure; SameSite=None; Path=/"
//       // );
//       res.status(401).json({ error: "Unauthorized" });
//     }
//   };
// }

export const adminMiddleware = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
}).use(async (req, res, next) => {
  // checkRole()
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    try {
      const decoded = jwt.verify(authorizationHeader, process.env.JWT_SECRET);
      const email = Buffer.from(decoded.email, "base64").toString("utf-8");

      const userRole = adminList.email.includes(email);

      if (userRole) {
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
});

export const allMiddleware = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
}).use(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    try {
      const decoded = jwt.verify(authorizationHeader, process.env.JWT_SECRET);
      // console.log("adminMiddleware", decoded);

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
});
