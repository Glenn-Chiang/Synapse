"use client";

import { InputBar } from "@/components/InputBar";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { socket } from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";

export const ChannelInput = () => {
  const channelId = Number(useParams().channelId);
  const currentUserId = getCurrentUser();

  const router = useRouter();

  const handleSendMessage = (text: string) => {
    socket.emit(
      "send-message",
      { text, channelId, senderId: currentUserId },
      () => {
        console.log("message acknowledged");
        router.refresh();
      }
    );
  };

  const handleTypeMessage = () => {
    socket.emit("typing", currentUserId, channelId);
  };

  return (
    <InputBar handleSend={handleSendMessage} handleChange={handleTypeMessage} />
  );
};
