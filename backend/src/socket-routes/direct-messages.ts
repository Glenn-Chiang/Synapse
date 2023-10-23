import { prisma } from "../app";
import { Socket } from "socket.io";

type DirectMessageData = {
  text: string;
  senderId: number;
  recipientId: number;
};

type EventCallback = () => void;

export const registerDirectMessageHandlers = (socket: Socket) => {
  const handleSend = async (
    { text, senderId, recipientId }: DirectMessageData,
    messageCallback: EventCallback
  ) => {
    // Create chat between users if they have not sent any direct messages to each other before
    const chat = await prisma.chat.upsert({
      where: {
        member1Id_member2Id: {
          member1Id: Math.min(senderId, recipientId),
          member2Id: Math.max(senderId, recipientId),
        },
      },
      update: {},
      create: {
        member1Id: Math.min(senderId, recipientId),
        member2Id: Math.max(senderId, recipientId),
      },
    });

    // Create message
    const message = await prisma.directMessage.create({
      data: {
        text,
        senderId,
        chatId: chat.id,
      },
    });

    console.log(message);
    messageCallback();
    
    socket.to(recipientId.toString()).emit("direct-message")
  };

  socket.on("send-direct-message", handleSend);
};
