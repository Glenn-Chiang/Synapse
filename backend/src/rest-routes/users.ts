import { Router } from "express";
import { prisma } from "../app.js";
import bcrypt from "bcrypt";

const usersRouter = Router();

// Get all users
usersRouter.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({});
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

// Register user with username and password
usersRouter.post("/users", async (req, res) => {
  const { username, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).send("invalid username");
  }
  if (!password || typeof password !== "string") {
    // todo: check for password strength?
    return res.status(400).send("invalid password");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
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
