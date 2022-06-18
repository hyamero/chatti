import Image from "next/image";
import React from "react";
import { IUser } from "../../types/model";
import { useAuth } from "../contexts/AuthContext";

interface MessagesProps {
  messages: any;
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const { data } = useAuth();
  return (
    <div className="flex flex-col px-6">
      {messages
        .map((message: any) => (
          <Message key={message.id} message={message} userData={data} />
        ))
        .reverse()}
    </div>
  );
};

interface MessageProps {
  message: any;
  userData: IUser;
}

const Message: React.FC<MessageProps> = ({ message, userData }) => {
  const sent = message.author.id === userData.id;

  return (
    <div
      className={`${
        !sent ? "flex items-end space-x-2 self-start" : "self-end"
      }`}
    >
      <div className={`${sent && "hidden"}`}>
        <Image
          width={35}
          height={35}
          layout="fixed"
          src={message.author.photoURL as string}
          alt="user image"
          className="z-10 rounded-full"
        />
      </div>
      <div className={`${sent ? "self-end" : "self-start"}`}>
        <label
          className={`${
            sent ? "hidden" : "relative left-3 text-sm text-system-gray-2"
          }`}
        >
          {message.author.name}
        </label>
        <p className={`p ${sent ? "send" : "receive"}`}>
          {message.messageValue}
        </p>
      </div>
    </div>
  );
};
