import React, { useState } from "react";
import { BsPencilSquare, BsSearch } from "react-icons/bs";

interface ConversationsProps {}

export const Conversations: React.FC<ConversationsProps> = ({}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="w-[60%] overflow-y-hidden rounded-tl-lg rounded-bl-lg bg-white/70 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 pt-4">
        <ul className="flex space-x-2">
          <li className="h-3 w-3 cursor-pointer rounded-full border border-black/10  bg-red-400"></li>
          <li className="h-3 w-3 cursor-pointer rounded-full border border-black/10 bg-yellow-400"></li>
          <li className="h-3 w-3 cursor-pointer rounded-full border border-black/10 bg-green-400"></li>
        </ul>
        <BsPencilSquare className="pointer-cursor cursor-pointer text-xl text-system-gray-dark-2" />
      </div>
      <form className="relative my-5 flex px-4">
        <BsSearch className="absolute left-7 top-1/4 text-[#827478]" />
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md bg-[#767680]/10 py-1 pl-8 pr-5 outline-none placeholder:text-[#827478]"
        />
      </form>
      <Convo active={active} setActive={setActive} />
    </div>
  );
};

interface ConvoProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const test = [1, 2, 3, 4];

const Convo: React.FC<ConvoProps> = ({ active, setActive }) => {
  return (
    <>
      {test.map((i) => (
        <div
          key={i}
          className={`flex cursor-pointer justify-between border-b-[2px] px-6 py-3 transition-all  ${
            active === i
              ? "border-system-blue bg-system-blue"
              : "border-system-gray-2"
          }`}
          onClick={() => setActive(i)}
        >
          <div className="user flex items-center space-x-3">
            <div className="img h-14 w-14 rounded-full bg-green-500/50"></div>
            <div className="-space-y-1">
              <p
                className={`text-base font-bold ${
                  active === i ? "font-medium text-white" : "text-black"
                }`}
              >
                Eliza Block
              </p>
              <p
                className={`text-sm ${
                  active === i
                    ? "text-system-gray-6"
                    : "text-system-gray-dark-3"
                }`}
              >
                LOL! that is insane
              </p>
            </div>
          </div>
          <div
            className={`text-sm ${
              active === i ? "text-white" : "text-system-gray-dark-3"
            }`}
          >
            9:41 AM
          </div>
        </div>
      ))}
    </>
  );
};
