import { Router } from "express";
import { prisma } from "../app.js";

const chatsRouter = Router();

const includedData = {
      messages: {
        include: {
          sender: true
        }
      },
      member1: true,
      member2: true
    }

// Get all chats involving a user
chatsRouter.get("/users/:userId/chats", async (req, res) => {
  const userId = Number(req.params.userId);

  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ member1Id: userId }, { member2Id: userId }],
    }, include: includedData
  });

  res.json(chats);
});

// Get a chat by its memberIds
chatsRouter.get("/chats", async (req, res) => {
  if (
    !req.query.member1Id ||
    !req.query.member2Id ||
    typeof req.query.member1Id !== "string" ||
    typeof req.query.member2Id !== "string"
  ) {
    return res.status(400).json("invalid query params");
  }

  const member1Id = Number(req.query.member1Id);
  const member2Id = Number(req.query.member2Id);

  const chat = await prisma.chat.findUnique({
    where: {
      member1Id_member2Id: {
        member1Id: Math.min(member1Id, member2Id),
        member2Id: Math.max(member1Id, member2Id),
      },
    },
    include: includedData
  });

  res.json(chat);
});

export { chatsRouter };
