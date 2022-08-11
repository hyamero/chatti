import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useGlobal } from "../contexts/GlobalContext";
import Modal from "./Modal";

export const SignOut = () => {
  const { openModal, closeModal } = useGlobal();
  const { signOut } = useAuth();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          openModal();
        }}
        className="rounded bg-system-blue p-3 font-medium text-white"
      >
        Sign Out
      </button>

      <Modal title="Sign out?" description="Are you sure you want to sign out?">
        <div className=" absolute bottom-0 left-0 flex w-full justify-around border-t border-t-gray-300 pt-2 pb-3 text-lg">
          <button
            type="button"
            className="text-system-blue transition-colors hover:text-blue-400 "
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
      </Modal>
    </>
  );
};
