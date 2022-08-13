import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useGlobal } from "../../contexts/GlobalContext";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const Modal: React.FC<ModalProps> = ({ children, title, description }) => {
  const { modalOpen, closeModal } = useGlobal();

  return (
    <>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[12]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
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
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
