import { Socket } from "socket.io"
import { prisma } from "../app"

// Connect client to all channels which the associated user is a member of
export const connectToChannels = async (socket: Socket) => {
  // const userId = socket.data.userId as number
  const userId = 1
  const channels = await prisma.channel.findMany({
    where: {
      members: {
        some: {
          userId
        }
      }
    }
  })

  channels.forEach((channel) => {
    socket.join(channel.id.toString())
    console.log('Client connected to channel:', channel.id)
  })
}