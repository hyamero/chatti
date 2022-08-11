import React, {
  useContext,
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

import { IUser } from "../../types/model";
import { auth, db } from "../config/firebase";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { useRouter } from "next/router";

interface AuthContextValues {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  data: IUser;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [data, setData] = useState({} as IUser);

  const [loading, setLoading] = useState<boolean>(true);

  const { push, asPath } = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((_user) => {
      if (_user) setUser(_user);
      else setUser(null);
    });

    return unsub;
  }, []);

  /**
   * Sign in
   */

  const signIn = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    try {
      const _user = await signInWithPopup(auth, provider);
      const moreUserInfo = getAdditionalUserInfo(_user);

      if (moreUserInfo?.isNewUser) {
        const { uid, email, metadata, photoURL, displayName } = _user.user;

        const payload: IUser = {
          photoURL,
          dateJoined: metadata.creationTime,
          username: email?.split("@")[0].toLowerCase(),
          displayName,
          displayData: true,
          email,
        };

        await setDoc(doc(db, "users", uid), payload);
      }

      push("/direct/public");
    } catch (err) {
      console.log(err);
    }
  }, [push]);

  /**
   * Get user data
   */

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        setLoading(true);
        const res = await getDoc(doc(db, "users", user.uid));
        setData({ ...res.data(), id: res.id } as IUser);
      }
    };

    getUserData();

    if (user && asPath === "/") push("/direct/public");
    setLoading(false);
  }, [user, asPath, push]);

  /**
   * Sign Out
   */

  const signOut = useCallback(async () => {
    try {
      await auth.signOut();
      push("/");
    } catch (err) {
      console.log(err);
    }
  }, [push]);

  /**
   * Modal
   */

  const contextValues = useMemo(
    () => ({ user, signIn, signOut, data, loading }),
    [user, signIn, signOut, data, loading]
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const data = useContext(AuthContext);
  return { ...data };
};

export { AuthProvider, useAuth };
