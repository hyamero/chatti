import React, { useRef, useContext, createContext, useState } from "react";

interface GlobalContextProps {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const GlobalContext = createContext<GlobalContextProps>(
  {} as GlobalContextProps
);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <GlobalContext.Provider value={{ isOpen, closeModal, openModal }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => {
  const data = useContext(GlobalContext);
  return { ...data };
};

export { GlobalContextProvider, useGlobal };
