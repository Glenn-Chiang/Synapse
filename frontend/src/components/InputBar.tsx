"use client";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { socket } from "@/lib/socket";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import React from "react";

type InputBarProps = {
  handleSend: (text: string) => void;
  handleChange: () => void;
};

const InputBar = ({ handleSend, handleChange }: InputBarProps) => {
  const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key !== "Enter") return;
    if (!event.currentTarget.value) return; // don't send empty input
    handleSend(event.currentTarget.value);
    event.currentTarget.value = ""; // clear input after sending
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-10 bg-slate-950 py-4 gap-2">
      <input
        autoFocus
        onKeyDown={handleKeydown}
        onChange={() => handleChange()}
        className=" w-4/5 rounded-full px-4 "
        placeholder="Type a message..."
      />
      {/* <button className="bg-sky-500 w-10 h-10 rounded-full">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button> */}
    </div>
  );
};

export { InputBar };
