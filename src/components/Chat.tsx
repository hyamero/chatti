import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

import { AiFillPlusCircle } from "react-icons/ai";
import { BsEmojiWink, BsImageFill } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";

interface ConversationProps {}

export const Chat: React.FC<ConversationProps> = ({}) => {
  const { data } = useAuth();
  const messagesRef = collection(db, "messages");
  const [messageValue, setMessageValue] = useState("");

  const createMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, photoURL, username } = data;

    if (messageValue)
      await addDoc(messagesRef, {
        messageValue,
        createdAt: Timestamp.now(),
        author: { name: username, photoURL, id },
      });

    setMessageValue("");
  };

  // const [messages] = useCollectionData();

  return (
    <div className="relative h-full w-full rounded-tr-lg rounded-br-lg bg-white">
      <div className="flex justify-between rounded-tr-lg bg-system-gray-5 px-8 pt-7 pb-3">
        <div>
          <span className="text-system-gray-2 ">To: </span>{" "}
          <span className="font-medium">Eliza Block</span>
        </div>
        <span className="cursor-pointer text-[#00A9F6]">Details</span>
      </div>
      <User />
      <div className="absolute left-0 bottom-0 flex w-full items-center justify-between space-x-3 rounded-br-lg bg-system-gray-6 p-5">
        <div className="icons flex items-center space-x-3 text-system-gray-dark-1">
          <AiFillPlusCircle className="cursor-pointer text-[1.7rem]" />
          <BsImageFill className="cursor-pointer text-2xl" />
        </div>
        <form
          onSubmit={(e) => {
            createMessage(e);
          }}
          className="relative flex w-full"
        >
          <input
            type="text"
            placeholder="Aa"
            className="w-full rounded-full border-2 border-system-gray-3 py-1 pl-5 pr-11 text-xl outline-none"
            onChange={(e) => setMessageValue(e.target.value)}
            value={messageValue}
          />
          <button className="absolute top-1/4 right-5 cursor-pointer text-xl text-system-blue">
            <RiSendPlaneFill />
          </button>
        </form>
        <BsEmojiWink className="cursor-pointer text-3xl text-system-gray-dark-2" />
      </div>
    </div>
  );
};

const User: React.FC = () => {
  const { signOut, data } = useAuth();

  return (
    <div className="mt-20 w-full text-center">
      <h1>Hello, Firebase Auth</h1>
      <h2>Welcome, {data.username} </h2>
      <img
        src={data.photoURL as string}
        alt="user image"
        className="mx-auto rounded-full"
      />
      <button
        onClick={() => {
          signOut();
        }}
        className="mt-3 rounded bg-system-gray-5 p-3 text-black"
      >
        Sign Out
      </button>
    </div>
  );
};
