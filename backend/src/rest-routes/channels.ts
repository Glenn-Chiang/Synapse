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
  console.log(channels);
  return res.json(channels);
});

// Get user channels
channelsRouter.get("/users/:userId/channels", async (req, res) => {
  const userId = req.params.userId;
  const channels = await prisma.channel.findMany({
    where: {
      members: {
        some: {
          userId: Number(userId),
        },
      },
    },
    include: {
      members: true,
      messages: {
        include: {
          sender: true,
        },
      },
    },
  });

  return res.json(channels);
});

// Get channel by id
channelsRouter.get("/channels/:channelId", async (req, res) => {
  const channelId = Number(req.params.channelId);
  const channel = await prisma.channel.findUnique({
    where: {
      id: channelId,
    },
    include: {
      messages: {
        include: {
          sender: true,
        },
      },
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!channel) {
    return res.status(404).send("channel not found");
  }

  return res.json(channel);
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

  const userId = 1; //todo

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

channelsRouter.post(`/channels/:channelId/members`, async (req, res) => {
  const channelId = req.params.channelId;
  const userId = req.query.userId;

  if (!channelId) {
    return res.status(400).send("invalid or missing channelId");
  }
  if (!userId) {
    return res.status(400).send("userId is missing");
  }

  await prisma.userChannel.create({
    data: {
      userId: Number(userId),
      channelId: Number(channelId),
    },
  });

  console.log(`User ${userId} has joined channel ${channelId}`);
  res.status(201).send(`User ${userId} has joined channel ${channelId}`);
});

channelsRouter.delete(`/channels/:channelId/members`, async (req, res) => {
  const channelId = req.params.channelId;
  const userId = req.query.userId;

  if (!channelId) {
    return res.status(400).send("invalid or missing channelId");
  }
  if (!userId) {
    return res.status(400).send("userId is missing");
  }

  await prisma.userChannel.delete({
    where: {
      userId_channelId: {
        userId: Number(userId),
        channelId: Number(channelId),
      },
    },
  });

  console.log(`User ${userId} has left channel ${channelId}`);
  res.status(201).send(`User ${userId} has left channel ${channelId}`);
});

export { channelsRouter };
