import nodemailer from 'nodemailer';
require('dotenv').config();
import { resolve } from 'path';

const GmailTransport = nodemailer.createTransport({
  service: process.env.GMAIL_SERVICE_NAME,
  host: process.env.GMAIL_SERVICE_HOST,
  secure: process.env.GMAIL_SERVICE_SECURE,
  port: process.env.GMAIL_SERVICE_PORT,
  auth: {
    user: process.env.GMAIL_USER_NAME,
    pass: process.env.GMAIL_USER_PASSWORD,
  },
});

const ViewOption = (transport, hbs) => {
  transport.use('compile', hbs({
    viewPath: resolve(__dirname, '..', 'emails'),
    extName: '.hbs',
  }));
};
export { ViewOption, GmailTransport };
