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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailService = void 0;
const emailConfig_1 = __importDefault(require("../utils/emailConfig"));
class SendEmailService {
    execute(emails) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const emailData of emails) {
                const emailOptions = {
                    from: process.env.EMAIL_USER,
                    to: emailData.destinatario,
                    subject: "Lembrete de Cobrança - Comercial de Alimentos Caíque LTDA",
                    template: "email",
                    context: {
                        supplier: emailData.fornecedor,
                        chargedAmount: emailData.valor,
                        paymentMethod: emailData.metodo,
                        dueDate: emailData.vencimento,
                        debitReference: emailData.referencia
                    }
                };
                try {
                    const res = yield emailConfig_1.default.sendMail(emailOptions);
                    console.log(res);
                }
                catch (error) {
                    throw new Error(`Erro ao enviar email para ${emailData.destinatario}: ${error}`);
                }
            }
            emailConfig_1.default.close();
        });
    }
}
exports.SendEmailService = SendEmailService;
