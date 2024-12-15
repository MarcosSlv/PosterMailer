import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import useSheetReader from "../../hooks/useSheetReader";
import HelpModal from "../HelpModal";
import Input from "../Input";
import FormButton from "../FormButton";
import { SegmentedControl } from "@radix-ui/themes";

import { MdDownload } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

function PosterForm() {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm();
  const [typeForm, setTypeForm] = useState("unico");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [reqResponse, setReqResponse] = useState("");

  const image = "/assets/images/tabela-modelo-cartazes.png";
  const modelFilePath = "/assets/sheets/modelo-cartaz.xlsx";

  const fileWatch = watch('file');
  const { dataArray, loading: dataLoading, error } = useSheetReader(fileWatch, "cartazes");
  console.log(dataArray);

  console.log(dataArray);

  useEffect(() => {
    setValue("tamanho", "cartaz-grande");
    setDownloadUrl("");
    setReqResponse("");
  }, [fileWatch, setValue]);

  const onSubmit = async (data) => {
    setDownloadUrl("");
    setReqResponse("");
    setIsSubmiting(true);

    const body = typeForm == "planilha"
      ? { tamanho: data.tamanho, sheet: dataArray }
      : {
        tamanho: data.tamanho, sheet: [
          {
            produto: data.produto,
            preco: data.preco.replace(".", ","),
            medida: data.medida,
            limite: data.limite
          }
        ]
      };

    try {

      console.log(body);

      const response = await fetch('https://postermailerbackend.onrender.com/api/posters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === "Success") {
        setDownloadUrl(responseData.download);
        setReqResponse(responseData.message);
      }
    } catch (err) {
      console.error("Erro ao criar cartaz: ", err);
    }
  };

  const handleTypeChange = (value) => {
    setTypeForm(value);
    setDownloadUrl("");
  };

  const handleSizeChange = (value) => {
    setValue("tamanho", value);
    setDownloadUrl("");
    setIsSubmiting(false);
  };

  const openHelpModal = () => {
    setIsModalOpen(true);
  };
  const closeHelpModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-center text-3xl font-bold mb-4 text-gray-800">Criação de Cartaz</h2>
        <div className="flex justify-center">
          <SegmentedControl.Root
            value={typeForm}
            onValueChange={handleTypeChange}
            className="flex justify-center"
            size="3"
          >
            <SegmentedControl.Item value="unico" className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cartaz único</SegmentedControl.Item>
            <SegmentedControl.Item value="planilha" className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Planilha</SegmentedControl.Item>
          </SegmentedControl.Root>
        </div>

        <AnimatePresence mode="wait">
          {typeForm === "unico" && (
            <motion.div
              key="unico"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <label htmlFor="produto" className="block text-gray-600 mb-2 text-center">Produto</label>
                  <Input
                    type="text"
                    name="produto"
                    placeholder="Descrição do Produto"
                    register={register}
                    validation={{ required: 'A descrição é obrigatória' }}
                    className="w-full text-center"
                  />
                  {errors.produto && <p className="text-red-500 font-bold text-sm text-center">{errors.produto.message}</p>}
                </div>

                <div className="flex items-start">
                  <div className="flex flex-col items-center w-1/2">
                    <label htmlFor="preco" className="block text-gray-600 mb-1 text-center">Preço</label>
                    <Input
                      type="number"
                      name="preco"
                      step="0.01"
                      placeholder="9,99"
                      register={register}
                      validation={{
                        required: 'O preço é obrigatório',
                        min: { value: 0, message: 'O preço deve ser maior que 0' }
                      }}
                      className="w-28 text-center border border-gray-300 rounded-md p-2"
                    />
                    {errors.preco && <p className="text-red-500 font-bold text-sm text-center mt-1">{errors.preco.message}</p>}
                  </div>

                  <div className="flex flex-col items-center w-1/2">
                    <label htmlFor="medida" className="block text-gray-600 mb-1 text-center">Medida</label>
                    <select
                      id="medida"
                      {...register("medida", { required: 'A medida é obrigatória' })}
                      className="w-28 border border-gray-300 rounded-md p-2"
                    >
                      <option value="UN">UN</option>
                      <option value="KG">KG</option>
                    </select>
                    {errors.medida && <p className="text-red-500 text-sm text-center mt-1">{errors.medida.message}</p>}
                  </div>

                  <div className="flex flex-col items-center w-1/2">
                    <label htmlFor="limite" className="block text-gray-600 mb-1 text-center">Limite</label>
                    <Input
                      type="text"
                      name="limite"
                      placeholder="02 UN."
                      register={register}
                      className="w-28 border border-gray-300 rounded-md p-2"
                    />
                    {errors.limite && <p className="text-red-500 text-sm text-center">{errors.limite.message}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {typeForm === "planilha" && (
            <motion.div
              key="planilha"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div>
                <label className="block text-gray-600 mb-2 text-center">Selecione o Arquivo</label>
                <Input
                  type="file"
                  name="file"
                  placeholder="Selecione o arquivo"
                  accept=".xlsx, .xls, .csv"
                  register={register}
                  validation={{ required: 'O arquivo é obrigatório' }}
                />
                {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
            {errors.tamanho && <p className="text-red-500 text-sm mt-1">{errors.tamanho.message}</p>}
          </div>
        </div>


        <div className="text-center">
          {dataLoading ? (
            <FormButton type="submit" text={
              <div className="animate-spin inline-block w-6 h-6 border-2 mx-8 border-gray-500 border-t-transparent rounded-full" role="status">
              </div>
            } disabled={true} />
          ) : (
            <FormButton type="submit" text="Criar Cartaz" disabled={error || dataLoading || downloadUrl || isSubmiting} />
          )}
        </div>
      </form>
      {downloadUrl && (
        <div>
          <p className="text-center mt-4 text-green-500">{reqResponse} Clique no botão abaixo para fazer o download</p>
          <a href={downloadUrl} target="_blank" className="flex items-center mt-4">
            <FormButton text={<MdDownload className="mr-1 text-xl" />} />
          </a>
          <div className="text-center mt-4">
            <FormButton
              onClick={() => {
                setDownloadUrl("");
                setReqResponse("");
                setIsSubmiting(false);
                reset();
              }}
              text="Criar outro cartaz" />

          </div>
        </div>
      )}
      <AnimatePresence>
        {typeForm == "planilha" &&
          <motion.div
            key="planilha"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex justify-center my-2 py-2">
              <label className="form-label-custom fs-2">
                Dúvidas quanto ao modelo da planilha? <a
                  id="button-click-here"
                  className="btn btn-link p-0 font-extrabold underline hover:cursor-pointer hover:text-gray-500 hover:duration-200"
                  onClick={openHelpModal}
                >
                  Veja aqui
                </a>
              </label>
            </div>
          </motion.div>
        }
      </AnimatePresence>


      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-40 flex justify-center items-center backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: [0.3, 0.5, 1] }}
            exit={{ opacity: 0, scale: [1, 0.5, 0] }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <HelpModal
              fileDownloadPath={modelFilePath}
              imagePath={image}
              onClose={closeHelpModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PosterForm;
