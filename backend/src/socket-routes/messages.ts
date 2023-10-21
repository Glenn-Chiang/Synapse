import {Socket} from 'socket.io'
import { prisma } from '../app'

interface MessageData {
  text: string,
  channelId: number,
  senderId: number
}

type MessageCallback = (channelId: number) => void

export const registerMessageHandlers = (socket: Socket) => {
  const handleCreate = async ({text, channelId, senderId}: MessageData, messageCallback: MessageCallback) => {
    const message = await prisma.message.create({
      data: {
        text, channelId, senderId
      }
    })
    console.log(message)

    messageCallback(channelId) // Send acknowledgement to the client who emitted the event
    emitToClient(socket, channelId) // Emit event to clients in the same room as sender
  }

  socket.on('message:create', handleCreate)
}

// Alert the client to revalidate messages in specified channel
// Note that we don't actually need to send the message payload back to the client.
const emitToClient = async (socket: Socket, channelId: number) => {
  socket.to(channelId.toString()).emit('message', channelId)
  console.log('Message emitted to channel:', channelId)
}