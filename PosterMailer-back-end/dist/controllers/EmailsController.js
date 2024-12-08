"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SendEmailService_1 = require("../services/SendEmailService");
const sendEmailservice = new SendEmailService_1.SendEmailService();
const expectedHeaders = ["destinatario", "fornecedor", "valor", "metodo", "vencimento", "referencia"];
class EmailsController {
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const emails = req.body;
            const sheetHeaders = emails.every(item => expectedHeaders.every(header => item.hasOwnProperty(header)));
            if (!sheetHeaders || !emails) {
                return res.status(400).json({
                    status: "Fail",
                    message: "Verifique se o conteúdo enviado na planilha está correto"
                });
            }
            try {
                sendEmailservice.execute(emails);
                return res.status(200).json({
                    status: "Success",
                    message: "E-mails enviados com sucesso!"
                });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({
                    status: "Fail",
                    message: "Something went wrong"
                });
            }
        });
    }
}
exports.default = EmailsController;
