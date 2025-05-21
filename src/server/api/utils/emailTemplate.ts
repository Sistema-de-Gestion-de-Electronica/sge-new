import { env } from "@/env";

const hostUrl = env.NEXTAUTH_URL;
const emisor = env.SMTP_MAIL_EMISOR;
const utnLogoRuta = hostUrl + "/utn-logo.png";

export const emailTemplate = ({
  usuario,
  textoMail,
  hipervinculo,
}: {
  usuario: string;
  hipervinculo: string;
  textoMail: string;
}) => {
  return `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>${textoMail}</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
            body { margin: 0; padding: 0; background-color: #f9f9f9; font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.5; }
            table { border-collapse: collapse; width: 100%; }
            img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            p { margin: 0 0 15px; }
            a { color: #007bff; text-decoration: none; }
            .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #dddddd; }
            .email-header { background-color: #2F67F6; padding: 35px; text-align: center; }
            .email-body img { width: 100%; max-width: 150px; height: auto; }
            .email-body { padding: 20px; color: #555555; }
            .email-footer { text-align: center; padding: 20px; font-size: 12px; color: #888888; }
            .cta-button { display: inline-block; padding: 15px 25px; background-color: #2F67F6; color: #ffffff !important; border-radius: 5px; text-decoration: none; }
            @media only screen and (max-width: 600px) {
                .email-container { width: 100%; }
                .email-body { padding: 15px; font-size: 14px; }
            }
        </style>
    </head>
    <body>
        <table role="presentation" class="email-container">
            <tr>
                <td class="email-header"></td>
            </tr>
            <tr>
                <td class="email-body">
                    <p style="text-align: center;"><img src="${utnLogoRuta}" alt="Logo UTN" width="150" height="auto" /></p>
                    <p style="text-align: center;"><strong>¡Hola${usuario?.length > 1 ? ", " + usuario : ""}!</strong></p>
                    ${textoMail}
                    <p>Gracias por usar nuestros sistemas.</p>
                    <p style="text-align: center; margin-top: 30px;">
                        <a href="${hipervinculo}" class="cta-button">Ver más detalles</a>
                    </p>
                </td>
            </tr>
            <tr>
                <td class="email-footer">
                    Este correo fue generado automáticamente por el Sistema de Gestión Electrónica de UTN-FRBA.<br/>
                    Si necesitas asistencia, contáctanos en <a href="mailto:${emisor}">${emisor}</a>.
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};
