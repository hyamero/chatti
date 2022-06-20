import React from "react";
import { BsPencilSquare, BsSearch } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import Image from "next/image";
import { useUserContext } from "./Chatti";

interface UserProps {}

export const User: React.FC<UserProps> = ({}) => {
  const { signOut, data } = useAuth();

  const displayName = data.displayName ? data.displayName : data.username;

  const { checked, handleDisplayData } = useUserContext();

  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between overflow-y-auto rounded-tl-lg rounded-bl-lg bg-white/70 px-4 pb-5 backdrop-blur-xl md:static md:w-[70%] lg:w-[60%]">
      <div className="flex items-center justify-between pt-4">
        <ul className="flex space-x-2">
          <li className="h-3 w-3 cursor-pointer rounded-full border border-black/10  bg-red-400"></li>
          <li className="h-3 w-3 cursor-pointer rounded-full border border-black/10 bg-yellow-400"></li>
          <li className="h-3 w-3 cursor-pointer rounded-full border border-black/10 bg-green-400"></li>
        </ul>
        <BsPencilSquare className="pointer-cursor cursor-pointer text-xl text-system-gray-dark-2" />
      </div>

      <div className="flex h-full flex-col space-y-5">
        <form className="relative mt-5 flex">
          <BsSearch className="absolute left-3 top-1/4 text-[#827478]" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md bg-white/50 py-2 pl-8 pr-5 outline-none placeholder:text-[#827478]"
          />
        </form>

        <div className="rounded-lg bg-white/75 py-5 text-center">
          <Image
            width={120}
            height={120}
            src={data.photoURL as string}
            alt="user image"
            className="z-10 rounded-full border border-system-gray-1 p-4"
          />
          <button className="mx-auto block text-[#00A9F6]">Edit</button>
        </div>

        <div>
          <p className="rounded-t-lg bg-white/75 py-2 px-4 font-medium capitalize">
            {displayName}
          </p>
          <hr className="h-[2px]" />
          <p className="rounded-b-lg bg-white/75 py-2 px-4 lowercase text-system-gray-dark-2">
            {data.email}
          </p>
        </div>

        <div>
          <div className="bg flex items-center justify-between  rounded-t-lg bg-white/75 py-2 px-4">
            <p>Name and Photo Sharing</p>
            <label className="switch">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => {
                  handleDisplayData(data.id);
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
      </div>
      <button
        type="button"
        onClick={() => {
          signOut();
        }}
        className="mt-5 w-full self-end rounded bg-system-blue p-3 font-medium text-white"
      >
        Sign Out
      </button>
    </div>
  );
};
