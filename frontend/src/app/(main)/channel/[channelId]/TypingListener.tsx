"use client";

import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TypingListener = ({currentRoomId}: {currentRoomId: number}) => {

  const [typingUser, setTypingUser] = useState<null | string>(null);

  useEffect(() => {
    let typingTimer: NodeJS.Timeout | undefined = undefined;
    const handleTyping = (userId: number, username: string, roomId: number) => {
      if (currentRoomId !== roomId) return; // ignore typing in other rooms

      console.log(username, "is typing")

      setTypingUser(username);
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        // if user stops typing for more than 2 seconds, we consider them to have stopped typing
        setTypingUser(null);
      }, 1500);
    };
    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, [typingUser, currentRoomId]);

  if (typingUser) {
    return (
      <div className="flex justify-center">
        <div className="fixed top-40 z-10 text-sky-500 bg-slate-950 p-2 rounded-md ">
          <span>{typingUser}</span> <span>is typing...</span>
        </div>
      </div>
    );
  }

  return null;
};

export { TypingListener };
