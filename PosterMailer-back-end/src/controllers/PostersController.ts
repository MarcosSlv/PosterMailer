import { Request, Response } from "express";
import path from 'path';
import { GeneratePostersService } from "../services/GeneratePostersService";
import { createDirectory } from "../utils/createDirectory";

import posterContent from "../types/posterContent";

const generatePostersService = new GeneratePostersService();

const expectedHeaders = ["produto", "medida", "preco"];

export default class PosterController {
  async execute(req: Request, res: Response) {
    try {
      const sheet: posterContent[] = req.body.sheet;
      const tamanho = req.body.tamanho;

      const sheetHeaders = sheet.every(item =>
        expectedHeaders.every(header => item.hasOwnProperty(header))
      );

      console.log(sheet);
      if (!sheetHeaders) {
        return res.status(400).json({
          status: "Fail",
          message: "Verifique se o conteúdo enviado na planilha está correto"
        });
      }

      const pdfDirectory = path.resolve(__dirname, '../../pdfs');
      createDirectory(pdfDirectory);

      const pdfFileName = `Cartaz_${new Date().
        getDate()}_${new Date().getMonth() + 1}_${Math.random().toFixed(2)}.pdf`;

      const pdfFilePath = path.resolve(pdfDirectory, pdfFileName);

      await generatePostersService.execute(sheet, pdfFilePath, tamanho);

      const downloadUrl = `${req.protocol}://${req.get('host')}/pdfs/${pdfFileName}`;
      return res.status(200).json({
        status: "Success",
        message: "Cartazes criados com sucesso!",
        download: downloadUrl
      });
    } catch (e) {
      return res.status(500).json({
        status: "Error",
        message: "Something went wrong"
      });
    }
  }
}

