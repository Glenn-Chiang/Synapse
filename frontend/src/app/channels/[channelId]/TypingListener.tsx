"use client";

import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

const TypingListener = () => {
  const [typingUser, setTypingUser] = useState<null | string>(null);

  useEffect(() => {
    const handleTyping = (userId: number, channelId: number) => {
      console.log(`User ${userId} is typing in channel ${channelId}`);
    };
    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, []);

  return <></>;
};

export { TypingListener };
