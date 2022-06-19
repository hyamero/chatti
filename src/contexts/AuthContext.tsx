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
import {
  doc,
  // addDoc,
  setDoc,
  getDoc,
  // getDocs,
  // collection,
} from "@firebase/firestore";

// const usersCollectionRef = collection(db, "users");

interface AuthContextValues {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  data: IUser;
  login: boolean;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [data, setData] = useState({} as IUser);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((_user) => {
      if (_user) setUser(_user);
      else setUser(null);
    });

    return unsub;
  }, []);

  const signIn = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    try {
      console.log("start loading");
      const _user = await signInWithPopup(auth, provider);
      const moreUserInfo = getAdditionalUserInfo(_user);
      console.log(auth);
      console.log(_user);
      console.log(moreUserInfo);

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
      setLogin(true);
      console.log("end loading");
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const res = await getDoc(doc(db, "users", user.uid));
        setData({ ...res.data(), id: res.id } as IUser);
        console.log(res);
        console.log("resolved");
      }
    };

    getUserData();
  }, [user]);

  const signOut = useCallback(async () => {
    try {
      await auth.signOut();
      setLogin(false);
      console.log(auth);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const contextValues = useMemo(
    () => ({ user, signIn, signOut, data, login }),
    [user, signIn, signOut, data, login]
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
