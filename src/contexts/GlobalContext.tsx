import React, { useRef, useContext, createContext, useState } from "react";

interface GlobalContextProps {
  modalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  userInfoOpen: boolean;
  closeUserInfo: () => void;
  openUserInfo: () => void;
}

const GlobalContext = createContext<GlobalContextProps>(
  {} as GlobalContextProps
);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const [userInfoOpen, setUserInfoOpen] = useState(false);

  const closeUserInfo = () => {
    setUserInfoOpen(false);
  };

  const openUserInfo = () => {
    setUserInfoOpen(true);
  };

  return (
    <GlobalContext.Provider
      value={{
        modalOpen,
        closeModal,
        openModal,
        userInfoOpen,
        closeUserInfo,
        openUserInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => {
  const data = useContext(GlobalContext);
  return { ...data };
};

export { GlobalContextProvider, useGlobal };
