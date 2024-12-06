import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

const useSheetReader = (sheet, type) => {
  const [dataArray, setDataArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const expectedTypes = ["cartazes", "emails"];

  const expectedHeadersForPosters = ["produto", "medida", "preco", "limite"];
  const expectedHeadersForEmails = ["destinatario", "fornecedor", "valor", "metodo", "vencimento", "referencia"];

  useEffect(() => {
    if (!sheet && !type || !expectedTypes.includes(type)) {
      setError("Envie os parâmetros corretamente");
      setDataArray([]);
      return;
    }

    if (sheet && sheet.length > 0) {
      setLoading(true);
      setError(null);
      setDataArray([]);

      const file = sheet[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target.result;
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const headers = jsonData[0].map(header => header.trim().toLowerCase());

          const isPosterHeaders = expectedHeadersForPosters.every(header => headers.includes(header));
          const isEmailHeaders = expectedHeadersForEmails.every(header => headers.includes(header));

          if (type === "cartazes" && !isPosterHeaders) {
            setError('Cabeçalhos incorretos para fazer cartazes.');
            setDataArray([]);
            return;
          } else if (type === "emails" && !isEmailHeaders) {
            setError('Cabeçalhos incorretos para enviar emails.');
            setDataArray([]);
            return;
          }

          const dataObjects = jsonData.slice(1).filter(row => row.some(cell => cell !== null && cell !== ''))
            .map((row) => {
              const obj = {};
              headers.forEach((header, index) => {
                let cellValue = row[index] ?? "";

                if (header === 'preco' || header === 'valor') {
                  cellValue = cellValue.toString().replace('.', ',');
                }

                if (header === "vencimento") {
                  const newCellValue = new Date((cellValue - 25569) * 86400 * 1000);
                  cellValue = newCellValue.toLocaleDateString("pt-BR");
                }

                if (cellValue !== '' && cellValue !== null) {
                  obj[header] = cellValue;
                }
              });
              return obj;
            });

          setDataArray(dataObjects);
        } catch (err) {
          setError('Erro ao ler o arquivo. Certifique-se de que está tudo correto na planilha.');
        } finally {
          setLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }, [sheet, type]);

  return { dataArray, loading, error };
};

export default useSheetReader;