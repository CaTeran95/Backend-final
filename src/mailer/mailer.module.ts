import { Module } from '@nestjs/common';
import { MailerService } from './services/mailer.service';
import * as nodemailer from 'nodemailer';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
