import { Router } from "express";
import { prisma } from "../app";

const chatsRouter = Router();

// Get all chats involving a user
chatsRouter.get("/users/:userId/chats", async (req, res) => {
  const userId = req.params.userId;

  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ member1Id: userId }, { member2Id: userId }],
    },
  });

  res.json(chats)
});

export { chatsRouter };
