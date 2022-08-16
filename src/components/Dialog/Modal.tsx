import { Dialog } from "@headlessui/react";
import { useGlobal } from "../../contexts/GlobalContext";
import TransitionWrap from "./TransitionWrap";

interface ModalProps {
  children: React.ReactNode;
  description: string;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ children, title, description }) => {
  const { modalOpen, closeModal } = useGlobal();

  return (
    <TransitionWrap show={modalOpen} onClose={closeModal}>
      <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-6 py-5 text-center align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          {title}
        </Dialog.Title>
        <div className="mt-2 mb-8">
          <p className="text-gray-80000 text-base">{description}</p>
        </div>
        {children}
      </Dialog.Panel>
    </TransitionWrap>
  );
};

export default Modal;
