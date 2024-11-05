import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import HelpModal from "../HelpModal";
import Input from "../Input";
import FormButton from "../FormButton";
import { SegmentedControl } from "@radix-ui/themes";

import useSheetReader from "../../hooks/useSheetReader";
import { MdDownload } from "react-icons/md";


function PosterForm() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [reqResponse, setReqResponse] = useState("");


  const image = "public/assets/images/tabela-modelo-cartazes.png";
  const modelFilePath = "public/assets/sheets/modelo-cartaz.xlsx";

  const fileWatch = watch('file');
  const { dataArray, loading: dataLoading, error } = useSheetReader(fileWatch, "cartazes");
  console.log(dataArray);

  useEffect(() => {
    setValue("tamanho", "cartaz-grande");
    setDownloadUrl("");
    setReqResponse("");
  }, [fileWatch, setValue]);

  const onSubmit = async (data) => {
    setDownloadUrl("");
    setReqResponse("");

    try {
      const response = await fetch('http://localhost:3333/api/posters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tamanho: data.tamanho, sheet: dataArray })
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.status === "Success") {
        setDownloadUrl(responseData.download);
        setReqResponse(responseData.message);
      }
    } catch (err) {
      console.log("Erro ao criar cartaz: ", err);
    }
  };

  const handleSizeChange = (value) => {
    console.log(value);
    setValue("tamanho", value);
    setDownloadUrl("");
  };

  const openHelpModal = () => setIsModalOpen(true);
  const closeHelpModal = () => setIsModalOpen(false);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-center text-3xl font-bold mb-4 text-gray-800">Criação de Cartaz</h2>
        <div className="mb-5">
          <label className="block text-gray-600 mb-2 text-center">Selecione o Arquivo</label>
          <Input
            type="file"
            name="file"
            placeholder="Selecione o arquivo"
            accept=".xlsx, .xls, .csv"
            register={register}
            validation={{ required: 'O arquivo é obrigatório' }}
          />
          {errors.file && <p className="text-center text-red-500 text-sm mt-1 w-full">{errors.file.message}</p>}
          {error && <p className="text-center text-red-500 text-sm mt-1 w-full">{error}</p>}
        </div>

        <div className="mb-5">
          <h5 className="text-center text-lg font-medium text-gray-600 mb-3">Qual o Modelo do Cartaz?</h5>
          <div className="flex justify-center">
            <SegmentedControl.Root
              onValueChange={handleSizeChange}
              defaultValue="cartaz-grande"
              className="flex justify-center"
              size="3"
            >
              <SegmentedControl.Item value="cartaz-grande" className="flex-1 text-center py-2 rounded-lg border border-gray-300">
                Cartaz Grande - A4
              </SegmentedControl.Item>
              <SegmentedControl.Item value="cartaz-pequeno" className="flex-1 text-center py-2 rounded-lg border border-gray-300">
                Cartaz Pequeno - A5
              </SegmentedControl.Item>
            </SegmentedControl.Root>
            {errors.tamanho && <p className="text-center text-red-500 text-sm mt-1 w-full">{errors.tamanho.message}</p>}
          </div>

        </div>

        <div className="text-center">
          {dataLoading ? (
            <FormButton type="submit" text={
              <div className="animate-spin inline-block w-6 h-6 border-2 mx-8 border-gray-500 border-t-transparent rounded-full" role="status">
              </div>
            } disabled={true} />
          ) : (
            <FormButton type="submit" text="Criar Cartaz" disabled={error || dataLoading || downloadUrl} />
          )}
        </div>
      </form >
      {downloadUrl && (
        <div>
          <p className="text-center mt-4 text-green-500">{reqResponse} Clique no botão abaixo para fazer o download</p>
          <a href={downloadUrl} target="_blank" className="flex items-center mt-4">
            <FormButton text={<MdDownload className="mr-1 text-xl" />} />
          </a>
        </div>

      )}
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
    </div >
  );
};

export default PosterForm;
