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
  return (
    <>
      <label
        className={`${
          message.author.id === userData.id
            ? "hidden"
            : "relative left-3 text-sm text-system-gray-2"
        }`}
      >
        {message.author.name}
      </label>
      <p
        className={`p ${
          message.author.id === userData.id ? "send" : "receive"
        }`}
      >
        {message.messageValue}
      </p>
    </>
  );
};
