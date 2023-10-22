"use client";

import { getCurrentUser } from "@/lib/auth";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import React from "react";

type InputBarProps = {
  handleSend: (text: string) => void;
};

const InputBar = ({ handleSend }: InputBarProps) => {
  const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key !== "Enter") return;
    if (!event.currentTarget.value) return; // don't send empty input
    handleSend(event.currentTarget.value);
    event.currentTarget.value = ""; // clear input after sending
  };

  const userId = getCurrentUser();
  const channelId = Number(useParams().channelId);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    socket.emit("typing", userId, channelId);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-10 bg-slate-950 py-4">
      <input
        autoFocus
        onKeyDown={handleKeydown}
        onChange={handleChange}
        className=" w-4/5 rounded-full px-4"
        placeholder="Type a message..."
      />
    </div>
  );
};

export { InputBar };
