import { Socket } from "socket.io";
import { prisma } from "../app";

// Connect client to all channels which the associated user is a member of
export const connectToChannels = async (socket: Socket) => {
  // const userId = socket.data.userId as number
  const userId = 1;
  const channels = await prisma.channel.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  });

  channels.forEach((channel) => {
    socket.join(channel.id.toString());
    console.log("Client connected to channel:", channel.id);
  });
};

export const registerChannelHandlers = (socket: Socket) => {
  const handleJoin = async (
    userId: number,
    channelId: number,
    callback: () => void
  ) => {
    await prisma.userChannel.create({
      data: {
        userId,
        channelId,
      },
    });

    console.log(`User ${userId} has joined channel ${channelId}`)
    callback()
  };

  const handleLeave = async (
    userId: number,
    channelId: number,
    callback: () => void
  ) => {
    await prisma.userChannel.delete({
      where: {
        userId_channelId: {
          userId, channelId
        }
      }
    })

    console.log(`User ${userId} has left channel ${channelId}`)
    callback()
  }

  socket.on("join-channel", handleJoin);
  socket.on("leave-channel", handleLeave);
};
