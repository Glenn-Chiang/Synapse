"use client";

import { InputBar } from "@/components/InputBar";
import { UserContext } from "@/lib/UserContext";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { socket } from "@/lib/socket";
import { useParams, useRouter } from "next/navigation";
import {useContext} from 'react'

export const ChannelInput = () => {
  const channelId = Number(useParams().channelId);
  const currentUser = useContext(UserContext)

  const router = useRouter();

  const handleSendMessage = (text: string) => {
    try {
      socket.emit(
        "send-message",
        { text, channelId, senderId: currentUser?.id },
        () => {
          console.log("message acknowledged");
          router.refresh();
        }
      );
    } catch (error) {
      console.log('Failed to send message:', (error as Error).message)
    }
  };

  const handleTypeMessage = () => {
    socket.emit("typing", currentUser?.id, currentUser?.username, channelId);
  };

  return (
    <InputBar handleSend={handleSendMessage} handleChange={handleTypeMessage} />
  );
};
