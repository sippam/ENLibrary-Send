import nextConnect from "next-connect";
import uuid from "react-uuid";
import excuteQuery from "@/utils/connect";
import jwt from "jsonwebtoken";
// import { setCookie } from "cookies-next";
// import { cookies } from 'next/headers'

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
//     const authorizationHeader = req.headers.authorization;

//     if (authorizationHeader == process.env.NEXT_PUBLIC_TOKEN) {
//       console.log("Authorization passed");
//       next();
//     } else {
//       // No authorization header, return an empty response
//       console.log("No authorization header");
//       res.status(401).json({ error: "Unauthorized" });
//     }
//   })

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const dataForm = req.query;
      let id = uuid();
      const email = dataForm.email;
      const title = dataForm.title;
      const name = dataForm.name;
      const surname = dataForm.surname;
      const faculty = dataForm.faculty;
      const cn = dataForm.cn;
    
      const duplicate = await excuteQuery({
        query: `SELECT * FROM userID WHERE email = ?`,
        values: [email],
      });
      // console.log("duplicate", duplicate);
  
      if (duplicate.length == 0) {
        await excuteQuery({
          query: `INSERT INTO userID (id, email) VALUES (?, ?)`,
          values: [id, email],
        })
        // .then((result) => {
        //   console.log(result);
        // });
  
        await excuteQuery({
          query: `INSERT INTO userData (id, email, title, name, surname, cn, faculty) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          values: [id, email, title, name, surname, cn, faculty],
        })
        // .then((result) => {
        //   console.log(result);
        // });
      } else {
        id = duplicate[0].id;
      }
  
      const rawDataToken = {
        id: id,
        email: email,
      };
  
      jwt.sign(
        rawDataToken,
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) {
            console.log(err);
          } else {
            // cookies().set("token-next", token);
            // setCookie("token", token)
            // res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
            res.json({ token });
          }
        }
      );
      break;
    }
}
  // .get(async (req, res) => {
  //   const dataForm = req.query;
  //   let id = uuid();
  //   const email = dataForm.email;
  //   const title = dataForm.title;
  //   const name = dataForm.name;
  //   const surname = dataForm.surname;
  //   const faculty = dataForm.faculty;
  //   const cn = dataForm.cn;
  
  //   const duplicate = await excuteQuery({
  //     query: `SELECT * FROM userID WHERE email = ?`,
  //     values: [email],
  //   });
  //   console.log("duplicate", duplicate);

  //   if (duplicate.length == 0) {
  //     await excuteQuery({
  //       query: `INSERT INTO userID (id, email) VALUES (?, ?)`,
  //       values: [id, email],
  //     }).then((result) => {
  //       console.log(result);
  //     });

  //     await excuteQuery({
  //       query: `INSERT INTO userData (id, email, title, name, surname, cn, faculty) VALUES (?, ?, ?, ?, ?, ?, ?)`,
  //       values: [id, email, title, name, surname, cn, faculty],
  //     }).then((result) => {
  //       console.log(result);
  //     });
  //   } else {
  //     id = duplicate[0].id;
  //   }

  //   const rawDataToken = {
  //     id: id,
  //     email: email,
  //   };

  //   jwt.sign(
  //     rawDataToken,
  //     process.env.JWT_SECRET,
  //     { expiresIn: "7d" },
  //     (err, token) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         // cookies().set("token-next", token);
  //         // setCookie("token", token)
  //         // res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);
  //         res.json({ token });
  //       }
  //     }
  //   );
  // });
