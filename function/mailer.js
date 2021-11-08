const nodemailer = require("nodemailer");
require('dotenv').config();
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.user, // generated ethereal user
      pass: process.env.password, // generated ethereal password
    },
});