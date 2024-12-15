import { useState } from 'react';
import PosterForm from "../../components/PosterForm";
import EmailForm from "../../components/EmailForm";
import { SegmentedControl } from "@radix-ui/themes";
import Header from "../../components/Header";

import { motion, AnimatePresence } from "framer-motion";

function PosterMailer() {
  const [activeForm, setActiveForm] = useState("cartazes");

  const handleFormChange = (value) => {
    setActiveForm(value);
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
            <AnimatePresence mode="wait">
              {activeForm === "cartazes" && (
                <motion.div
                  key="cartazes"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <PosterForm />
                </motion.div>
              )}
              {activeForm === "emails" && (
                <motion.div
                  key="emails"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <EmailForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

export default PosterMailer;
