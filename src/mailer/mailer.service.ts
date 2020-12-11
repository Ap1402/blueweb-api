import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer')

@Injectable()
export class MailerService {
    constructor() {

    }

    async sendRegisterEmail(registeredEmail: string) {
        let transporter = nodemailer.createTransport({
            host: "bluewebca.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'mailer@bluewebca.com',
                pass: 'O2Ti;1LF#Te(',
            },
        });

        let info = await transporter.sendMail({
            from: '"Blueweb 👻"<mailer@bluewebca.com>', // sender address
            to: registeredEmail, // list of receivers
            subject: "Bienvenido a BlueWeb", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Bienvenido a Blueweb</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);


    }

}
