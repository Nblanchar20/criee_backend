const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const { config } = require("../config");

class EmailService {
  constructor() {
    this.link = config.urlFront;
    this.transporter = nodemailer.createTransport({
      service: "SendinBlue",
      host: config.hostNodemailer,
      port: config.portNodemailer,
      auth: {
        user: config.userNodemailer,
        pass: config.passwordNodemailer,
      },
    });
  }

  /** Crea el correo usando la plantilla html y el mensaje dado */
  async createEmail(file, replacements = null) {
    return new Promise((resolve, reject) => {
      const readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
          if (err) {
            callback(err);
            throw err;
          } else {
            callback(null, html);
          }
        });
      };

      readHTMLFile(`${__dirname}/${file}`, function (err, html) {
        if (err) reject(err);
        const template = handlebars.compile(html);
        const htmlToSend = template(replacements);
        resolve(htmlToSend);
      });
    });
  }

  /** parametriza el correo que será enviado */
  async enviarEmailPersonalizado(
    subject,
    destinatario,
    file,
    senderAlias = "",
    replacements = null,
    attachments = null
  ) {
    try {
      const content = await this.createEmail(file, replacements);

      let info = await this.transporter.sendMail({
        from: config.userNodemailer,
        to: destinatario,
        subject,
        html: content,
        attachments,
      });

      if (info.rejected.length > 0) {
        return {
          message: `Los siguientes destinatarios no recibieron la notificación: ${info.rejected.toString()}`,
        };
      }

      return { message: "Notificación enviada." };
    } catch (error) {
      throw new Error(`Error al enviar las notificaciones: ${error.message}`);
    }
  }
}

module.exports = EmailService;
