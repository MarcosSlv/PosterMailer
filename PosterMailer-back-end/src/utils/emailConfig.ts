import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import 'dotenv/config';

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  }
});

transport.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    layoutsDir: path.resolve(__dirname, '../templates/mail'),
    partialsDir: path.resolve(__dirname, '../templates/mail'),
    defaultLayout: 'email.hbs'
  },
  viewPath: path.resolve(__dirname, '../templates/mail'),
  extName: '.hbs'
}));

export default transport;