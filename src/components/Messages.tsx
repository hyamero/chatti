import React from "react";
import { useAuth } from "../contexts/AuthContext";

interface MessagesProps {
  messages: any;
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const { data } = useAuth();
  return (
    <div className="space-y-3">
      {messages.map((message: any) => (
        <Message key={message.id} message={message} userData={data} />
      ))}
    </div>
  );
};

interface MessageProps {
  message: any;
  userData: any;
}

const Message: React.FC<MessageProps> = ({ message, userData }) => {
  return (
    <div
      className={`${
        message.author.id === userData.id
          ? "bg-system-blue pr-7 text-right"
          : "bg-system-gray-chat pl-7 text-left"
      }`}
    >
      <p>{message.messageValue}</p>
    </div>
  );
};
