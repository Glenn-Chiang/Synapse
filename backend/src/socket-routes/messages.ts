import { Socket } from "socket.io";
import { prisma } from "../app";

type MessageData = {
  text: string;
  channelId: number;
  senderId: number;
};

type EventCallback = () => void;


export const registerMessageHandlers = (socket: Socket) => {
  const handleSend = async (
    { text, channelId, senderId }: MessageData,
    messageCallback: EventCallback
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
  socket.on("send-message", handleSend);

  // User is typing
  socket.on("typing", async (userId: number, roomId: number) => {
    console.log(`User ${userId} is typing in room ${roomId}`);
    socket.to(roomId.toString()).emit("typing", userId, roomId); // Room could either be a channel or a user
  });
};
