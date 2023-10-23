"use client";

import { InputBar } from "@/components/InputBar";
import { getCurrentUser } from "@/lib/auth";
import { socket } from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";

export const ChatInput = () => {
  const otherUserId = Number(useParams().userId)
  const currentUserId = getCurrentUser()

  const router = useRouter()

  const handleSendMessage = (text: string) => {
    socket.emit(
      "send-direct-message",
      { text, senderId: currentUserId, recipientId: otherUserId },
      () => {
        console.log("direct message acknowledged");
        router.refresh()
      }
    );
  };

  const handleTypeMessage = () => {
    // socket.emit('typing')
  };

  return (
    <InputBar handleSend={handleSendMessage} handleChange={handleTypeMessage} />
  );
};
