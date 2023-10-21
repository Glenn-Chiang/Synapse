"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";

type InputBarProps = {
  handleSend: (text: string) => void;
};

const InputBar = ({ handleSend }: InputBarProps) => {
  const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== 'Enter') return 
    if (!event.currentTarget.value) return // don't send empty input
    handleSend(event.currentTarget.value)
    event.currentTarget.value = '' // clear input after sending
  }

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-10 bg-slate-950 py-4">
      <input
        autoFocus
        onKeyDown={handleKeydown}
        className=" w-4/5 rounded-full px-4"
        placeholder="Type a message..."
      />
    </div>
  );
};

export { InputBar };
