import { Router } from "express";
import { prisma } from "../app";

const messagesRouter = Router();

// Get all messages in channel
messagesRouter.get("/channels/:channelId/messages", async (req, res) => {
  const channelId = Number(req.params.channelId);

  const messages = await prisma.message.findMany({
    where: {
      channelId,
    },
    include: {
      sender: true,
    },
  });

  return res.json(messages);
});

export { messagesRouter };
