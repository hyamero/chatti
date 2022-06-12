import React from "react";
import { Chat } from "./Chat";
import { Conversations } from "./Conversations";

interface ChatProps {}

export const Chatti: React.FC<ChatProps> = ({}) => {
  return (
    <div className="flex h-[70vh] w-[60vw]  max-w-screen-xl">
      <Conversations />
      <Chat />
    </div>
  );
};
