"use client";

import { InputBar } from "@/components/InputBar";
import { UserContext } from "@/lib/UserContext";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { socket } from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";

export const ChatInput = () => {
  const otherUserId = Number(useParams().userId);
  const currentUser = useContext(UserContext);

  const router = useRouter();

  const handleSendMessage = (text: string) => {
    socket.emit(
      "send-direct-message",
      { text, senderId: currentUser?.id, recipientId: otherUserId },
      () => {
        console.log("direct message acknowledged");
        router.refresh();
      }
    );
  };

  const handleTypeMessage = () => {
    socket.emit("typing", currentUser?.id, currentUser?.username, otherUserId);
  };

  return (
    <InputBar handleSend={handleSendMessage} handleChange={handleTypeMessage} />
  );
};
