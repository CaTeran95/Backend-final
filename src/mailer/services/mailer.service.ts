import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { Transporter, createTransport } from 'nodemailer';
import { join } from 'path';

const mailOptions = (input, template, subject) => {
  let html = '';
  renderFile(
    join(__dirname, '../../../', `/src/mailer/htmlMessages/${template}.ejs`),
    { input },
    (err, data) => {
      if (err) {
        throw new Error(err.message);
      } else {
        html = data;
      }
    },
  );
  return {
    from: 'CBC Final',
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  };
};

@Injectable()
export class MailerService {
  private transporter: Transporter;
  
  constructor() {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PW,
      },
    });
  }

  async sendMail(input, templateName: string, subject: string) {
    try {
      await this.transporter.sendMail(
        mailOptions(input, templateName, subject),
      );
    } catch (err) {
      console.error(err);
    }
  }
}
