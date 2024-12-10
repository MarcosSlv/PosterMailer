import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Input from "../Input";
import FormButton from "../FormButton";
import HelpModal from "../HelpModal";

function EmailForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const image = "/assets/images/tabela-modelo-emails.png";
  const modelFilePath = "/assets/sheets/modelo-email.xlsx";

  useEffect(() => {
    setReqResponse("");
  }, [fileWatch]);


  const openHelpModal = () => setIsModalOpen(true);
  const closeHelpModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <form className="space-y-6">
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
          </div>
          <FormButton text="Enviar e-mail" disabled={true} />
          <p className="text-center text-red-500 font-bold">Serviço desabilitado temporariamente</p>
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
