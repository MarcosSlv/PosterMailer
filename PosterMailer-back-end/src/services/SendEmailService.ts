import transport from "../utils/emailConfig";
import emailContent from "../types/emailContent";

class SendEmailService {
  async execute(emails: emailContent[]) {
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
        const res = await transport.sendMail(emailOptions);
        console.log(res);
      } catch (error) {
        throw new Error(`Erro ao enviar email para ${emailData.destinatario}: ${error}`);
      }
    }
    transport.close();
  }
}

export { SendEmailService };
