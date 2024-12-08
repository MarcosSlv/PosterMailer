"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const transport = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});
transport.use('compile', (0, nodemailer_express_handlebars_1.default)({
    viewEngine: {
        extname: '.hbs',
        layoutsDir: path_1.default.resolve(__dirname, '../templates/mail'),
        partialsDir: path_1.default.resolve(__dirname, '../templates/mail'),
        defaultLayout: 'email.hbs'
    },
    viewPath: path_1.default.resolve(__dirname, '../templates/mail'),
    extName: '.hbs'
}));
exports.default = transport;
