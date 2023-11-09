import { Router } from "express";
import { prisma } from "../app.js";
import bcrypt from "bcrypt";

const usersRouter = Router();

// Get users matching search term
usersRouter.get("/users", async (req, res) => {
  const searchTerm = req.query.search;

  // Return all users if no search term is given
  if (!searchTerm || searchTerm === "undefined") {
    const users = await prisma.user.findMany({});
    console.log('users:', users)
    return res.json(users);
  }

  if (typeof searchTerm !== "string") {
    return res.status(400).send("invalid search term");
  }

  const users = await prisma.user.findMany({
    where: {
      username: {
        startsWith: searchTerm,
        mode: 'insensitive' // case-insensitive 
      },
    },
  });
  return res.json(users);
});

// Get one user
usersRouter.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
  res.json(user);
});

// Edit user profile
usersRouter.patch("/users/:userId/profile", async (req, res) => {
  const { username, bio, avatarUrl } = req.body;
  console.log("request body", req.body);

  if (!username || typeof username !== "string" || username.length > 25) {
    return res.status(400).send("invalid username");
  }
  if (typeof bio !== "string" || bio.length > 500) {
    return res.status(400).send("invalid bio");
  }
  if (typeof avatarUrl !== "string") {
    return res.status(400).send("invalid avatarUrl");
  }

  const userId = Number(req.params.userId);
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
      bio,
      avatarUrl,
    },
  });

  res.json(updatedUser);
});

export { usersRouter };
