const express = require("express");
const nodemailer = require("nodemailer");

const server = express();

server.use(express.static(__dirname + '/public'));
server.use(express.json());

server.get("*", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname });
});

server.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "Вставьте свои данные",
        pass: "Вставьте свои данные",
      },
    });

    const { name, phone, message } = req.body;

    await transporter.sendMail({
      from: "ООО 'Тестовая компания' <test@test.ru>",
      to: "test@test.ru",
      subject: `${name} (${phone})`,
      text: message,
      html: `
        <p>${name}</p>
        <p>${phone}</p>
        <p>${message}</p>
        `,
    });

    return res.status(200).send({ status: 200, message: "Success" });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
});

server.listen(3000, () => {
  console.log(`App listening on port 3000:`);
});
