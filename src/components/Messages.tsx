import Image from "next/image";
import React from "react";
import { IUser } from "../../types/model";
import { useAuth } from "../contexts/AuthContext";
import { IMessage } from "../../types/model";

interface MessagesProps {
  messages: IMessage[];
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const { data } = useAuth();
  return (
    <div className="flex flex-col px-6">
      {messages
        .map((message: IMessage) => (
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
      {!sent && (
        <>
          {message.author.photoURL ? (
            <div className="relative bottom-[0.1rem]">
              <Image
                width={35}
                height={35}
                layout="fixed"
                src={message.author.photoURL as string}
                alt="user image"
                className="z-10 rounded-full"
              />
            </div>
          ) : (
            <span className="relative bottom-2 z-10 inline-block h-[35px] w-[35px] rounded-full bg-system-gray-5"></span>
          )}
        </>
      )}
      <div className={`${sent ? "self-end" : "self-start"}`}>
        <label
          className={`block ${
            sent ? "hidden" : "relative left-3 text-xs text-system-gray-2"
          }`}
        >
          {message.author.name}
        </label>
        <p className={`p inline-block ${sent ? "send" : "receive"}`}>
          {message.messageValue}
        </p>
      </div>
    </div>
  );
};
