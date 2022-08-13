import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useGlobal } from "../../contexts/GlobalContext";
import { User } from "../User";

const UserInfo: React.FC = () => {
  const { userInfoOpen, closeUserInfo } = useGlobal();

  return (
    <>
      <Transition appear show={userInfoOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[12]" onClose={closeUserInfo}>
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
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-4 shadow-xl transition-all">
                  <User showSearch={false} parentClass="text-left" />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UserInfo;
