"use strict";
const nodemailer = require("nodemailer");

export default async function addAllCustumer(req, res) {
  const {
    email,
    name,
    roomName,
    roomType,
    roomNumber,
    date,
    getTimeFrom,
    getTimeTo,
  } = req.body;
  nodemailer.createTestAccount(async (err, account) => {
    // create reusable transporter object using the default SMTP transport
    try {  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD,
        }
        });

      const info = await transporter.sendMail({
        from: '"EN-Library" <no-reply@exalple.com>', // sender address
        to: `${email}, ${email}`, // list of receivers
        subject: "EN-Library booking", // Subject line
        // text: "Hello world?", // plain text body
        html: `<table style="max-width: 37.5em; height: 611.391px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr style="width: 100%; height: 611.391px;">
        <td style="height: 611.391px; text-align: left;">
        <table style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 3px; overflow: hidden; width: 100.161%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td style="width: 100%;"><img style="display: block; outline: none; border: none; text-decoration: none; margin-left: auto; margin-right: auto;" src="https://i.imgur.com/q5KxchW.png" width="400">
        <table style="padding: 20px 40px; padding-bottom: 0;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
        <tbody style="width: 100%;">
        <tr style="width: 100%;">
        <td>
        <h1 style="font-size: 32px; font-weight: bold; text-align: center;">Hi ${name},</h1>
        <h2 style="font-size: 26px; font-weight: bold; text-align: center;">This is an email to confirm your successful booking.</h2>
        <p style="font-size: 16px; line-height: 24px; margin: 16px 0;"><strong>Reservation name: </strong>${roomName}</p>
        <p style="font-size: 16px; line-height: 24px; margin: 16px 0; margin-top: -5px;"><strong>Room type and number : </strong>${roomType}, ${roomNumber}</p>
        <p style="font-size: 16px; line-height: 24px; margin: 16px 0; margin-top: -5px;"><strong>Time: </strong>${date}, ${getTimeFrom} - ${getTimeTo}</p>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table style="padding: 45px 0 0 0;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
        <tbody>
        <tr>
        <td><img style="outline: none; border: none; text-decoration: none; float: left;" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-footer.png" width="650"></td>
        </tr>
        </tbody>
        </table>
        <div style="text-align: center;">&copy; 2023 <a href="https://library.kku.ac.th/elementor-158/enlib/?fbclid=IwAR2HMQPWD0C0jplTRgHFC8LF6SWonvr-i1minfSyj6y-gy4JZ8m1uC6AmzY" target="_blank" rel="noopener"> KKUL&trade; สำนักหอสมุด </a>&nbsp;. All Rights Reserved. Icons by Storyset</div>
        </td>
        </tr>
        </tbody>
        </table>`, // html body
      });
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({
        message: "success",
        info: info,
        preview: nodemailer.getTestMessageUrl(info),
      });
    } catch (error) {
      console.log(error);
    }
  });
}
