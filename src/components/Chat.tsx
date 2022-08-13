import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";

import {
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";

import { BsEmojiWink, BsImageFill } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiSendPlaneFill } from "react-icons/ri";

import { IMessage } from "../../types/model";
import { Messages } from "./Messages";
import UserInfo from "./Dialog/UserInfo";
import { useGlobal } from "../contexts/GlobalContext";

const messagesRef = collection(db, "messages");

export const Chat: React.FC = ({}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data } = useAuth();
  const { openUserInfo } = useGlobal();
  const [messageValue, setMessageValue] = useState<string>("");
  const [messages, setMessages] = useState([] as IMessage[]);

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(25));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setMessages(data as IMessage[]);
      },
      (err) => {
        console.log(err);
      }
    );

    return () => unsub();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { checked } = useUserContext();

  const createMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, photoURL, displayName, username } = data;

    const author = checked
      ? { name: displayName ? displayName : username, photoURL, id }
      : { name: "Anonymous", id };

    if (messageValue && messageValue.trim().length !== 0) {
      await addDoc(messagesRef, {
        messageValue,
        createdAt: Timestamp.now(),
        author,
      });

      setMessageValue("");
    }
  };

  return (
    <>
      <UserInfo />
      <div className="z-[11] flex h-screen  w-full flex-col overflow-hidden rounded-tr-lg rounded-br-lg border-l-[1.5px] border-gray-300 bg-white md:h-full">
        <div className="z-10 flex w-full justify-between rounded-tr-lg border-b-[1.5px] border-gray-300 bg-system-gray-5 px-5 pt-7  pb-3 md:px-8">
          <div>
            <span className="text-system-gray-1 ">To: </span>{" "}
            <span className=" font-medium">Public</span>
          </div>
          <button
            type="button"
            onClick={() => openUserInfo()}
            className="cursor-pointer text-system-blue"
          >
            Profile
          </button>
        </div>
        <div className="scroll-container h-full w-full overflow-x-hidden overflow-y-scroll scroll-smooth py-3">
          <p className="my-10 text-center text-system-gray-1">
            Maximum of 25 messages are shown.
          </p>
          <Messages messages={messages} />
          <span ref={scrollRef}></span>
        </div>
        {/* Message Input */}
        <div className="flex w-full items-center justify-between space-x-3 rounded-br-lg border-t-[1.5px] border-gray-300 bg-system-gray-6 p-5">
          <div className="icons flex items-center space-x-3 text-system-gray-dark-1">
            <AiFillPlusCircle className="cursor-pointer text-[1.7rem]" />
            <BsImageFill className="cursor-pointer text-2xl" />
          </div>
          <form
            onSubmit={(e) => createMessage(e)}
            className="relative flex w-full"
          >
            <input
              type="text"
              maxLength={355}
              placeholder="Aa"
              className="w-full rounded-full border-2 border-system-gray-3 py-1 pl-5 pr-11 text-xl outline-none"
              onChange={(e) => setMessageValue(e.target.value)}
              value={messageValue}
            />
            <button className="absolute top-1/4 right-5 cursor-pointer text-xl text-system-blue">
              <RiSendPlaneFill />
            </button>
          </form>
          <BsEmojiWink className="cursor-pointer text-4xl text-system-gray-dark-2 md:text-3xl" />
        </div>
      </div>
    </>
  );
};
