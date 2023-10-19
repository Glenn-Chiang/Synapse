import { Router } from "express";
import { prisma } from "../app";

const directMessagesRouter = Router();

// Get all DMs in a chat
directMessagesRouter.get("/chats/:chatId/messages", async (req, res) => {
  const chatId = req.params.chatId;

  const messages = await prisma.directMessage.findMany({
    where: {
      chatId,
    },
    include: {
      sender: true,
    },
  });

  res.json(messages)
});

export { directMessagesRouter };
