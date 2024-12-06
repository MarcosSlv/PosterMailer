import { useState } from 'react';
import Header from "../../components/Header";
import PosterForm from "../../components/PosterForm";
import EmailForm from "../../components/EmailForm";
import { SegmentedControl } from "@radix-ui/themes";

function PosterMailer() {
  const [activeForm, setActiveForm] = useState("cartazes");
  const [fadeTransition, setFadeTransition] = useState(false);


  const handleFormChange = (value) => {
    setFadeTransition(true);
    setTimeout(() => {
      setActiveForm(value);
      setFadeTransition(false);
    }, 160);
  };

  return (
    <>
      <div className="overflow-hidden">
        <Header title={"Ferramentas"} />
        <div className="container mx-auto my-5">
          <div className="flex justify-center">
            <SegmentedControl.Root
              value={activeForm}
              onValueChange={handleFormChange}
              className="flex justify-center"
              size="3"
            >
              <SegmentedControl.Item value="cartazes" className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cartazes</SegmentedControl.Item>
              <SegmentedControl.Item value="emails" className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Emails</SegmentedControl.Item>
            </SegmentedControl.Root>
          </div>
          <div className="form-container bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <div className={`transition-opacity duration-300 ${fadeTransition ? 'opacity-0' : 'opacity-100'}`}>
              {activeForm === 'cartazes' ? <PosterForm /> : <EmailForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PosterMailer;
