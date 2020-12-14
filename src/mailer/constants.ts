const nodemailer = require('nodemailer')

export const transporter = nodemailer.createTransport({
    host: "bluewebca.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'mailer@bluewebca.com',
        pass: 'O2Ti;1LF#Te(',
    },
});