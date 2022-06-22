import {
  doc,
  DocumentSnapshot,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";

interface UserContextValues {
  checked: boolean;
  handleDisplayData: (id: string | undefined) => Promise<void>;
}

const UserContext = createContext<UserContextValues>({} as UserContextValues);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useAuth();

  const [checked, setChecked] = useState<boolean>(true);

  const handleDisplayData = async (id: string | undefined) => {
    const userDoc = doc(db, "users", id as string);
    await updateDoc(userDoc, { displayData: !checked });
  };

  useEffect(() => {
    try {
      const userDoc = doc(db, `users/${data.id as string}`);
      const snapshot = onSnapshot(userDoc, (snapshot: DocumentSnapshot) => {
        let _data = snapshot.data();
        setChecked(_data?.displayData);
      });

      return snapshot;
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  const contextValues = { checked, handleDisplayData };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const data = useContext(UserContext);
  return { ...data };
};

export default UserProvider;
