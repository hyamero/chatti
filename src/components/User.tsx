import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
import { useUserContext } from "../contexts/UserContext";
import { useGlobal } from "../contexts/GlobalContext";
import Modal from "./Modal";

interface UserProps {}

export const User: React.FC<UserProps> = ({}) => {
  const { signOut, data } = useAuth();
  const { openModal, closeModal } = useGlobal();
  const displayName = data.displayName ? data.displayName : data.username;
  const { checked, handleDisplayData } = useUserContext();
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  return (
    <aside className="absolute left-0 top-0 flex h-full w-full flex-col justify-between rounded-tl-lg rounded-bl-lg bg-white/70 backdrop-blur-xl md:static md:w-[70%] lg:w-[60%]">
      <div className="flex items-center justify-between p-4">
        <ul className="flex space-x-2">
          <li className="h-3 w-3 cursor-pointer rounded-full border border-black/10  bg-red-400"></li>
          <li className="h-3 w-3 cursor-pointer rounded-full border border-black/10 bg-yellow-400"></li>
          <li className="h-3 w-3 cursor-pointer rounded-full border border-black/10 bg-green-400"></li>
        </ul>
        <BsPencilSquare className="pointer-cursor cursor-pointer text-xl text-system-gray-dark-2" />
      </div>

      <div className="relative flex h-full flex-col space-y-5 overflow-y-auto px-4 pb-5">
        <form className="relative mt-5 flex">
          <BsSearch className="absolute left-3 top-1/3 text-[#827478]" />
          <input
            maxLength={70}
            type="search"
            placeholder="Search"
            className="w-full rounded-md bg-white/50 py-2 pl-8 pr-5 outline-none placeholder:text-[#827478]"
          />
        </form>

        <div className="rounded-lg bg-white/75 py-5 text-center">
          {data.photoURL ? (
            <Image
              width={120}
              height={120}
              src={data.photoURL as string}
              alt="user image"
              className="z-10 rounded-full border border-system-gray-1 p-4"
            />
          ) : (
            <span className="relative bottom-2 z-10 inline-block h-[120px] w-[120px] rounded-full bg-system-gray-5"></span>
          )}
          <button className="mx-auto block text-[#00A9F6]">Edit</button>
        </div>

        <div>
          <p className="rounded-t-lg bg-white/75 py-2 px-4 font-medium capitalize">
            {displayName}
          </p>
          <hr className="h-[2px]" />
          <p className="rounded-b-lg bg-white/75 py-2 px-4 lowercase text-system-gray-dark-2">
            {data.email ? data.email : "example@email.com"}
          </p>
        </div>

        <div>
          <div className="bg flex items-center justify-between  rounded-t-lg bg-white/75 py-2 px-4">
            <p>Name and Photo Sharing</p>
            <label className="switch">
              <input
                type="checkbox"
                disabled={disableBtn}
                checked={checked}
                onChange={() => {
                  handleDisplayData(data.id);

                  if (checked) toast.error("Anonymous mode disabled");
                  else toast.success("Anonymous mode enabled");

                  // Rate limiter
                  toast("You can change this setting again in a few seconds.", {
                    duration: 4000,
                  });

                  setDisableBtn(true);
                  setTimeout(() => {
                    setDisableBtn(false);
                  }, 5000);
                }}
              />
              <span className="slider"></span>
            </label>
          </div>
          <hr className="h-[2px]" />
          <p className="rounded-b-lg bg-white/75 py-2 px-4 text-sm text-system-gray-dark-2">
            Disable this setting to enter anonymous mode.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            openModal();
          }}
          className="rounded bg-system-blue p-3 font-medium text-white"
        >
          Sign Out
        </button>

        <Modal
          title="Sign out?"
          description="Are you sure you want to sign out?"
        >
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
      </div>
    </aside>
  );
};
