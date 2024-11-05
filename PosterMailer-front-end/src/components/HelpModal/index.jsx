import { RiCloseLargeFill } from "react-icons/ri";
import { MdDownload } from "react-icons/md";
import FormButton from "../FormButton";

function HelpModal({ fileDownloadPath, imagePath, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-white w-11/12 max-w-md mx-auto rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h5 className="text-lg font-bold">Layout de importação</h5>
          <RiCloseLargeFill
            onClick={onClose}
            className="m-1 hover:cursor-pointer hover:text-gray-500 duration-200"
          />
        </div>
        <div className="p-4">
          <p>O arquivo a ser importado deverá ser um arquivo .csv ou .xlsx (Excel), contendo a estrutura abaixo:</p>
          <div className="overflow-auto mt-4">
            <img className="w-full" src={imagePath} alt="Modelo de tabela" />
          </div>
          <div className="flex items-center space-x-2">
            <p>Se desejar um modelo é só clicar:</p>
            <a href={fileDownloadPath} download className="flex items-center">
              <FormButton text={<MdDownload className="mr-1 text-xl" />} />
            </a>
          </div>
        </div>
        <div className="flex justify-center p-4 border-t">
          <FormButton
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={onClose}
            text={"Ok, entendi."}
          />
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
