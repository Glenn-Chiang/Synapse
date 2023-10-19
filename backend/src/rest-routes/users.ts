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
      id: userId,
    },
  });
  res.json(user);
});

export { usersRouter };
