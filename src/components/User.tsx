import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { BsPencilSquare, BsSearch } from "react-icons/bs";

import { SignOut } from "./SignOut";
import { useAuth } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import { useGlobal } from "../contexts/GlobalContext";

interface UserProps {
  parentClass: string;
  showSearch: boolean;
}

export const User: React.FC<UserProps> = ({ parentClass, showSearch }) => {
  const { data } = useAuth();
  const { checked, handleDisplayData } = useUserContext();
  const { closeUserInfo } = useGlobal();

  const displayName = data.displayName ? data.displayName : data.username;
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  return (
    <div className={parentClass}>
      <div className="flex items-center justify-between p-4">
        <ul className="flex space-x-2 [&>li]:h-3 [&>li]:w-3 [&>li]:cursor-pointer [&>li]:rounded-full [&>li]:border [&>li]:border-black/10">
          <li className="bg-red-400"></li>
          <li className="bg-yellow-400"></li>
          <li className="bg-green-400"></li>
        </ul>
        {/* <BsPencilSquare className="pointer-cursor cursor-pointer text-xl text-system-gray-dark-2" /> */}
        <button
          type="button"
          onClick={() => closeUserInfo()}
          className="cursor-pointer text-system-blue"
        >
          Close
        </button>
      </div>

      <div className="relative flex h-full flex-col space-y-5 overflow-y-auto px-4 pb-5">
        {showSearch && (
          <form className="relative mt-5 flex">
            <BsSearch className="absolute left-3 top-1/3 text-[#827478]" />
            <input
              maxLength={70}
              type="search"
              placeholder="Search"
              className="w-full rounded-md bg-white/50 py-2 pl-8 pr-5 outline-none placeholder:text-[#827478]"
            />
          </form>
        )}

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
        <SignOut />
      </div>
    </div>
  );
};
