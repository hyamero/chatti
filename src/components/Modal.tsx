import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useGlobal } from "../contexts/GlobalContext";

export default function MyModal() {
  const { isOpen, closeModal } = useGlobal();
  const { signOut } = useAuth();

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
                    Sign out?
                  </Dialog.Title>
                  <div className="mt-2 mb-8">
                    <p className="text-gray-80000 text-base">
                      Are you sure you want to sign out?
                    </p>
                  </div>

                  <div className=" absolute bottom-0 left-0 flex w-full justify-around border-t border-t-gray-300 pt-2 pb-3 text-lg">
                    <button
                      type="button"
                      className="  text-system-blue transition-colors hover:text-blue-400 "
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className=" text-system-blue transition-colors hover:text-red-500"
                      onClick={() =>
                        toast.promise(signOut(), {
                          loading: "Sign in...",
                          success: <b>Signed out successfully!</b>,
                          error: <b>Could not sign in.</b>,
                        })
                      }
                    >
                      Sign out
                    </button>
                    <span className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-gray-300" />
                  </div>

                  {/* Dummy for space */}
                  <div className="invisible mt-5">
                    <span>Cancel</span>
                    <span>Sign out</span>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
