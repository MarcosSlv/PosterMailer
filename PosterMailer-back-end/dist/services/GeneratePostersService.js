"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.GeneratePostersService = void 0;
const pdfmake_1 = __importDefault(require("pdfmake/build/pdfmake"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const urbaneFontPath = path_1.default.join(__dirname, "..", "utils", "fonts", "Urbane-Bold.ttf");
const urbaneFont = fs.readFileSync(urbaneFontPath).toString("base64");
pdfmake_1.default.vfs = {
    "Urbane-Bold.ttf": urbaneFont,
};
pdfmake_1.default.fonts = {
    Urbane: {
        bold: "Urbane-Bold.ttf",
    },
};
class GeneratePostersService {
    execute(data, outputFilePath, tamanho) {
        return __awaiter(this, void 0, void 0, function* () {
            const validRows = data.filter((row) => row.produto != "" && row.preco != "" && row.medida != "");
            const documentDefinitions = tamanho === "cartaz-pequeno" ? this.generateSmallPoster(validRows) : this.generateBigPoster(validRows);
            const pdfDocGenerator = pdfmake_1.default.createPdf(documentDefinitions);
            pdfDocGenerator.getBuffer((buffer) => {
                fs.writeFile(outputFilePath, buffer, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        console.log("PDF criado com sucesso.");
                    }
                });
            });
        });
    }
    generateBigPoster(data) {
        const content = data.map((row, index) => {
            const pageContent = {
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
    generateSmallPoster(data) {
        const content = [];
        for (let i = 0; i < data.length; i += 2) {
            const row = data[i];
            const nextRow = data[i + 1] ? data[i + 1] : null;
            console.log(nextRow);
            if (nextRow) {
                const pageContent = {
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
                                },
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
                                    }
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
            else {
                const pageContent = {
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
                                },
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
exports.GeneratePostersService = GeneratePostersService;
