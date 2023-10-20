import { Router } from "express";
import { prisma } from "../app";

const channelsRouter = Router();

// Get all channels
channelsRouter.get("/channels", async (req, res) => {
  const channels = await prisma.channel.findMany({
    include: {
      members: true,
    },
  });
  return res.json(channels);
});

// Get user channels
channelsRouter.get("/users/:userId/channels", async (req, res) => {
  const userId = req.params.userId;

  const channels = await prisma.channel.findMany({
    where: {
      members: {
        some: {
          userId
        },
      },
    },
    include: {
      members: true,
    },
  });

  return res.json(channels);
});

// Create new channel
channelsRouter.post("/channels", async (req, res) => {
  const { name, about, iconUrl } = req.body;

  if (!name || typeof name !== "string" || name.length > 25) {
    return res.status(400).send("invalid name");
  }

  if (!about || typeof about !== "string" || about.length > 500) {
    return res.status(400).send("invalid about");
  }

  if (!iconUrl || typeof iconUrl !== "string") {
    return res.status(400).send("invalid iconUrl");
  }

  const userId = "1"; // todo

  const channel = await prisma.channel.create({
    data: {
      name,
      about,
      creatorId: userId,
      iconUrl,
      members: {
        create: [
          {
            user: {
              connect: {
                id: userId,
              },
            },
          },
        ],
      },
    },
  });

  console.log("Channel created");
  return res.json(channel);
});

export { channelsRouter };
