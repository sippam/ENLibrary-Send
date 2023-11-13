const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail(req, res) {
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
  const msg = {
    to: email,
    from: "sippakornicem@gmail.com",
    subject: "EN-Library",
    templateId: process.env.SENDGRID_TEM_ID,
    dynamic_template_data: {
      name: name,
      roomName: roomName,
      roomType: roomType,
      roomNumber: roomNumber,
      date: date,
      getTimeFrom: getTimeFrom,
      getTimeTo: getTimeTo,
    },
  };
  try {
    console.log(msg);
    await mail.send(msg);
    res.status(200).json({ message: "success" });
    console.log("good");
  } catch (error) {
    res.status(400).json({ message: "error" });
    console.log("bad");
  }
}
