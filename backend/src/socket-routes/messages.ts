import { Socket } from "socket.io";
import { prisma } from "../app";

interface MessageData {
  text: string;
  channelId: number;
  senderId: number;
}

type MessageCallback = () => void;

export const registerMessageHandlers = (socket: Socket) => {
  const handleCreate = async (
    { text, channelId, senderId }: MessageData,
    messageCallback: MessageCallback
  ) => {
    const message = await prisma.message.create({
      data: {
        text,
        channelId,
        senderId,
      },
    });
    console.log(message);

    messageCallback(); // Send acknowledgement to the client who emitted the event

    socket.to(channelId.toString()).emit("message", channelId); // Emit event to clients in the same room as sender
    console.log("Message emitted to channel:", channelId);
  };
  socket.on("send-message", handleCreate);

  // User is typing
  socket.on("typing", async (userId: number, channelId: number) => {
    console.log(`User ${userId} is typing in channel ${channelId}`);
    socket.to(channelId.toString()).emit("typing", userId, channelId);
  });
};
