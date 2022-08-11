import React from "react";
import { Chat } from "../../src/components/Chat";
import { User } from "../../src/components/User";
import { GlobalContextProvider } from "../../src/contexts/GlobalContext";
import UserProvider from "../../src/contexts/UserContext";

const Public: React.FC = () => {
  return (
    <GlobalContextProvider>
      <div className="grid h-full place-items-center">
        <div className="relative m-auto flex  max-h-[1080px] w-screen max-w-screen-xl md:top-5 md:h-[90vh] md:w-[90vw] lg:h-[85vh] lg:w-[85vw] xl:w-[70vw] 2xl:w-[65vw]">
          {/* <Conversations /> */}
          <UserProvider>
            <User />
            <Chat />
          </UserProvider>
        </div>
      </div>
    </GlobalContextProvider>
  );
};

export default Public;
