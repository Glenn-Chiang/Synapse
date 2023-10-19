import { Router } from "express";
import { prisma } from "../app";

const directMessagesRouter = Router();

// Get all DMs in a chat by chatId
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

// Get all DMs in a chat by memberIds
// directMessagesRouter.get('/direct-messages', async (req, res) => {
//   if (!req.query.member1 || !req.query.member2) {
//     return res.status(400).json('missing query params')
//   }

//   const member1 = req.query.member1
//   const member2 = req.query.member2

//   const messages = await prisma.directMessage.findMany({
//     where: {
//       chatId: {

//       }
//     }
//   })
// })

export { directMessagesRouter };
