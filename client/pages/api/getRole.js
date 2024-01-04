import nextConnect from "next-connect";
import jwt from "jsonwebtoken";
import adminList from "../../data/adminList.json";

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
        console.log("getRole", error);
        // Token is expired or invalid
        if (error.name === "TokenExpiredError") {
          res.setHeader(
            "Set-Cookie",
            "token=; Max-Age=0; Secure; SameSite=None; Path=/"
          );

          // Redirect to the home page
          // res.writeHead(302, { Location: '/' });
          res.end();
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

    if (
      adminList.email.includes(
        Buffer.from(decoded.email, "base64").toString("utf-8")
      )
    ) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
