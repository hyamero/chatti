import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Chat } from "../../src/components/Chat";
import { User } from "../../src/components/User";
import { db } from "../../src/config/firebase";
import { useAuth } from "../../src/contexts/AuthContext";
import UserProvider from "../../src/contexts/UserContext";

const Public: React.FC = ({}) => {
  return (
    <UserProvider>
      <div className="grid h-screen place-items-center">
        <div className="m-auto flex h-screen max-h-[1080px] w-screen max-w-screen-xl md:h-[90vh] md:w-[90vw] lg:h-[85vh] lg:w-[85vw] xl:w-[70vw] 2xl:w-[65vw]">
          {/* <Conversations /> */}
          <User />
          <Chat />
        </div>
      </div>
    </UserProvider>
  );
};

export default Public;
