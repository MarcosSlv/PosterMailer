import { Request, Response } from "express";
import { SendEmailService } from "../services/SendEmailService";

import emailContent from "../types/emailContent";

const sendEmailservice = new SendEmailService();

const expectedHeaders = ["destinatario", "fornecedor", "valor", "metodo", "vencimento", "referencia"];

export default class EmailsController {
  async execute(req: Request, res: Response) {
    const emails: emailContent[] = req.body;

    const sheetHeaders = emails.every(item =>
      expectedHeaders.every(header => item.hasOwnProperty(header))
    );

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
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        status: "Fail",
        message: "Something went wrong"
      });
    }
  }
}
