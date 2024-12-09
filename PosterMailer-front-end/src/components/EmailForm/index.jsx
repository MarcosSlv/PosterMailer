import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Input from "../Input";
import FormButton from "../FormButton";
import HelpModal from "../HelpModal";

import useSheetReader from "../../hooks/useSheetReader";

function EmailForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reqResponse, setReqResponse] = useState("");

  const fileWatch = watch('file');
  const { dataArray, loading: dataLoading, error } = useSheetReader(fileWatch, "emails");
  console.log(dataArray);

  const image = "/assets/images/tabela-modelo-emails.png";
  const modelFilePath = "/assets/sheets/modelo-email.xlsx";

  useEffect(() => {
    setReqResponse("");
  }, [fileWatch]);

  const onSubmit = async () => {
    setReqResponse("Ferramenta desabiltada por enquanto.");
  };

  const openHelpModal = () => setIsModalOpen(true);
  const closeHelpModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-center text-3xl font-bold mb-4 text-gray-800">Envio de E-mail</h2>
          <div className="mb-5">
            <label className="block text-gray-600 mb-2 text-center">Selecione o Arquivo</label>
            <Input
              type="file"
              name="file"
              placeholder="Selecione o arquivo"
              register={register}
              validation={{ required: 'O arquivo é obrigatório' }}
            />
            {errors.file && <p className="text-center text-red-500 text-sm mt-1 w-full">{errors.file.message}</p>}
            {error && <p className="text-center text-red-500 text-sm mt-1 w-full">{error}</p>}
          </div>
          <p className="text-center mt-4 text-red-500">{reqResponse}</p>

          <div className="text-center">
            {dataLoading ? (
              <FormButton type="submit" text={
                <div className="animate-spin inline-block w-6 h-6 border-2 mx-8 border-gray-500 border-t-transparent rounded-full" role="status">
                </div>
              } disabled={true} />
            ) : (
              <FormButton type="submit" text="Criar Cartaz" disabled={error || dataLoading || reqResponse} />
            )}
          </div>
        </form>
        <div className="flex justify-center my-2 py-2">
          <label className="form-label-custom fs-2">
            Dúvidas quanto ao Layout? <a
              id="button-click-here"
              className="btn btn-link p-0 font-extrabold underline hover:cursor-pointer hover:text-gray-500 hover:duration-200"
              onClick={openHelpModal}
            >
              Clique aqui
            </a>
          </label>
        </div>
        {isModalOpen && (
          <HelpModal fileDownloadPath={modelFilePath} imagePath={image} onClose={closeHelpModal} />
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
        )}
      </div>
    </>
  );
};

export default EmailForm;
