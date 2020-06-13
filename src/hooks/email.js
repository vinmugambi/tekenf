const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ford20@ethereal.email",
    pass: "Fr2M4yKQNE4MYWs9ch",
  },
});

module.exports = async (to, subject, content) => {
  try {
    await transporter.sendMail({
      from: "ford20@ethereal.email",
      to: to,
      subject: subject,
      text: content,
    });
  } catch (error) {
    throw new Error("Not sent: " + error);
  }
};
