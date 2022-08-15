import React from "react";
import UserProvider from "../../src/contexts/UserContext";

import { Chat } from "../../src/components/Chat";
import { User } from "../../src/components/User";
import { Conversations } from "../../src/components/Conversations";

import { BsPencilSquare } from "react-icons/bs";

const Public = () => {
  return (
    <div className="grid h-full place-items-center">
      <div className="relative m-auto flex max-h-[1080px] w-screen max-w-screen-xl md:h-[90vh] md:w-[90vw] lg:h-[85vh] lg:w-[85vw] xl:w-[70vw] 2xl:w-[65vw]">
        {/* <Conversations /> */}
        <UserProvider>
          <User
            showSearch={true}
            tlButton={
              <BsPencilSquare className="pointer-cursor cursor-pointer text-xl text-system-gray-dark-2" />
            }
            parentClass="absolute left-0 top-0 flex h-full w-full flex-col justify-between rounded-tl-lg rounded-bl-lg bg-white/70 backdrop-blur-xl md:static md:w-[70%] lg:w-[60%]"
          />
          <Chat />
        </UserProvider>
      </div>
    </div>
  );
};

export default Public;
