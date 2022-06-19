import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Chat } from "./Chat";
import { Conversations } from "./Conversations";
import { User } from "./User";

interface UserContextValues {
  checked: boolean;
  handleDisplayData: (id: string | undefined) => Promise<void>;
}

const UserContext = createContext<UserContextValues>({} as UserContextValues);

export const Chatti: React.FC = ({}) => {
  const { data } = useAuth();

  const [checked, setChecked] = useState<boolean>(true);

  const handleDisplayData = async (id: string | undefined) => {
    const userDoc = doc(db, "users", id as string);
    await updateDoc(userDoc, { displayData: !checked });
  };

  useEffect(() => {
    const userDoc = doc(db, "users", data.id as string);
    const snapshot = onSnapshot(userDoc, (snapshot) => {
      let _data = snapshot.data();
      setChecked(_data?.displayData);
    });

    return snapshot;
  }, [data]);

  const contextValues = { checked, handleDisplayData };

  return (
    <UserContext.Provider value={contextValues}>
      <div className="flex h-[70vh] w-[60vw]  max-w-screen-xl">
        {/* <Conversations /> */}
        <User />
        <Chat />
      </div>
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const data = useContext(UserContext);
  return { ...data };
};
