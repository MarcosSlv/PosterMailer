import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions, Content } from "pdfmake/interfaces";
import * as fs from "fs";
import path from "path";

import dataRow from "../types/posterContent";

const urbaneFontPath = path.join(__dirname, "..", "utils", "fonts", "Urbane-Bold.ttf");
const urbaneFont = fs.readFileSync(urbaneFontPath).toString("base64");

pdfMake.vfs = {
  "Urbane-Bold.ttf": urbaneFont,
};

pdfMake.fonts = {
  Urbane: {
    bold: "Urbane-Bold.ttf",
  },
};
class GeneratePostersService {
  async execute(data: dataRow[], outputFilePath: string, tamanho: string,): Promise<void> {

    const validRows = data.filter(
      (row) => row.produto != "" && row.preco != "" && row.medida != "");

    const documentDefinitions = tamanho === "cartaz-pequeno" ? this.generateSmallPoster(validRows) : this.generateBigPoster(validRows);

    const pdfDocGenerator = pdfMake.createPdf(documentDefinitions);

    pdfDocGenerator.getBuffer((buffer) => {
      fs.writeFile(outputFilePath, buffer, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("PDF criado com sucesso.");
        }
      });
    });
  }

  private generateBigPoster(data: dataRow[]): TDocumentDefinitions {
    const content = data.map((row, index) => {
      const pageContent: Content = {
        stack: [
          {
            text: row.produto,
            bold: true,
            fontSize: 50,
            alignment: "center",
            absolutePosition: { x: 208, y: 180 },
          },
          {
            text: "POR:",
            bold: true,
            fontSize: 30,
            alignment: "left",
            absolutePosition: { x: 50, y: 500 },
          },
          {
            text: "R$",
            bold: true,
            fontSize: 30,
            alignment: "left",
            absolutePosition: { x: 17, y: 720 },
          },
          {
            text: row.preco.replace(".", ","),
            bold: true,
            fontSize: 170,
            alignment: "center",
            absolutePosition: { x: 10, y: 520 },
          },
          {
            text: row.medida,
            bold: true,
            fontSize: 30,
            alignment: "right",
            absolutePosition: { x: 0, y: 720 },
          },

        ],
        margin: [0, 0, 0, 20],
      };

      if (row.limite) {
        pageContent.stack.push({
          text: `LIMITADO A ${row.limite} POR CLIENTE`,
          bold: true,
          fontSize: 24,
          alignment: "center",
          absolutePosition: { x: 10, y: 760 }
        });
      }

      if (index < data.length - 1) {
        pageContent.stack.push({ text: "", pageBreak: "after" });
      }
      return pageContent;
    });

    return {
      pageSize: "A4",
      pageMargins: [10, 10, 20, 10],
      content: content,
      defaultStyle: {
        font: "Urbane",
        bold: true
      },
    };
  }

  private generateSmallPoster(data: dataRow[]): TDocumentDefinitions {
    const content: Content[] = [];

    for (let i = 0; i < data.length; i += 2) {
      const row = data[i];
      const nextRow = data[i + 1] ? data[i + 1] : null;

      console.log(nextRow);

      if (nextRow) {
        const pageContent: Content = {
          stack: [
            {
              text: row.produto,
              fontSize: 37,
              alignment: "center",
              absolutePosition: { x: 280, y: 80 },
            },
            {
              text: "R$",
              fontSize: 20,
              alignment: "left",
              absolutePosition: { x: 280, y: 335 },
            },
            {
              text: row.preco,
              bold: true,
              fontSize: 76,
              alignment: "center",
              absolutePosition: { x: 280, y: 276 },
            },
            {
              text: row.medida,
              fontSize: 20,
              alignment: "right",
              absolutePosition: { x: 0, y: 335 },
            },
            ...(row.limite
              ? [
                {
                  text: `LIMITADO A ${row.limite} POR CLIENTE`,
                  fontSize: 12,
                  bold: true,
                  alignment: "center",
                  absolutePosition: { x: 280, y: 370 },
                } as Content,
              ]
              : []),
            {
              text: nextRow.produto,
              fontSize: 37,
              alignment: "center",
              absolutePosition: { x: 280, y: 510 },
            },
            {
              text: "R$",
              fontSize: 20,
              alignment: "left",
              absolutePosition: { x: 280, y: 745 },
            },
            {
              text: nextRow.preco,
              fontSize: 76,
              alignment: "center",
              absolutePosition: { x: 280, y: 688 },
            },
            {
              text: nextRow.medida,
              fontSize: 20,
              alignment: "right",
              absolutePosition: { x: 0, y: 745 },
            },
            ...(nextRow.limite
              ?
              [
                {
                  text: `LIMITADO A ${nextRow.limite} POR CLIENTE`,
                  fontSize: 12,
                  bold: true,
                  alignment: "center",
                  absolutePosition: { x: 280, y: 780 },
                } as Content
              ]
              : []),
          ],
          margin: [0, 0, 0, 20],
        };
        if (i + 2 < data.length) {
          pageContent.stack.push({ text: "", pageBreak: "after" });
        }
        content.push(pageContent);
      } else {
        const pageContent: Content = {
          stack: [
            {
              text: row.produto,
              fontSize: 37,
              alignment: "center",
              absolutePosition: { x: 280, y: 80 },
            },
            {
              text: "R$",
              fontSize: 20,
              alignment: "left",
              absolutePosition: { x: 280, y: 335 },
            },
            {
              text: row.preco,
              bold: true,
              fontSize: 76,
              alignment: "center",
              absolutePosition: { x: 280, y: 276 },
            },
            {
              text: row.medida,
              fontSize: 20,
              alignment: "right",
              absolutePosition: { x: 0, y: 335 },
            },
            ...(row.limite
              ? [
                {
                  text: `LIMITADO A ${row.limite} POR CLIENTE`,
                  fontSize: 12,
                  bold: true,
                  alignment: "center",
                  absolutePosition: { x: 280, y: 370 },
                } as Content,
              ]
              : []),
          ],
          margin: [0, 0, 0, 20],
        };
        if (i + 2 < data.length) {
          pageContent.stack.push({ text: "", pageBreak: "after" });
        }
        content.push(pageContent);
      }
    }

    return {
      pageSize: "A4",
      pageMargins: [10, 10, 28, 10],
      content: content,
      defaultStyle: {
        font: "Urbane",
        bold: true
      },
    };
  }
}

export { GeneratePostersService };
