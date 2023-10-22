import { Router } from "express";
import { prisma } from "../app";

const usersRouter = Router();

// Get all users
usersRouter.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({});
  return res.json(users);
});

// Get one user
usersRouter.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await prisma.user.findMany({
    where: {
      id: Number(userId),
    },
  });
  res.json(user);
});

// Get channel members 
usersRouter.get("/channels/:channelId/members", async (req, res) => {
  const channelId = Number(req.params.channelId)
  const users = await prisma.user.findMany({
    where: {
      channels: {
        some: {
          channelId
        }
      }
    }
  })
  res.json(users)
})

// Create new user
usersRouter.post("/users", async (req, res) => {
  const { username } = req.body;
  if (!username || typeof username !== "string") {
    return res.status(400).send("invalid username");
  }
  const user = await prisma.user.create({
    data: {
      username,
    },
  });
  console.log("User created");
  res.json(user)
});

export { usersRouter };
