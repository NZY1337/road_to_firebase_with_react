const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/send_mail", cors(), async (req, res) => {
  let { text, fromUser } = req.body;

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport
    .sendMail({
      from: fromUser,
      to: process.env.MAIL_TO,
      subject: "test email",
      html: `
            <span>${text}</span>
            <p>All the best, Andrei</p>
        `,
    })
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

app.listen(process.env.PORT || 4000, () => console.log("Server is running on port 4000"));
