import React from "react";
import { Chat } from "./Chat";
import { Conversations } from "./Conversations";

interface ChatProps {}

export const Chatti: React.FC<ChatProps> = ({}) => {
  return (
    <div className="flex">
      <Conversations />
      <Chat />
    </div>
  );
};
