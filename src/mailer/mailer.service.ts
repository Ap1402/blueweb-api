import { Injectable } from '@nestjs/common';
import { transporter } from './constants';

@Injectable()
export class MailerService {
    constructor() {

    }

    async sendRegisterEmail(registeredEmail: string) {

        let info = await transporter.sendMail({
            from: '"Blueweb 👻"<mailer@bluewebca.com>', // sender address
            to: registeredEmail, // list of receivers
            subject: "Bienvenido a BlueWeb", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Bienvenido a Blueweb</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);


    }

    async sendFactibilityRegisteredEmail(typedEmail: string) {
        let info = await transporter.sendMail({
            from: '"Blueweb 👻"<mailer@bluewebca.com>', // sender address
            to: typedEmail, // list of receivers
            subject: "Evaluación de factibilidad Blueweb", // Subject line
            text: "Su solicitud de factibilidad ha sido registrada con éxito. Pronto nos pondremos en contacto con usted a través de este correo o el número teléfonico que ingresó", // plain text body
            html: "<b>Su solicitud de factibilidad ha sido registrada con éxito. Pronto nos pondremos en contacto con usted a través de este correo o el número teléfonico que ingresó</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);


    }

}
