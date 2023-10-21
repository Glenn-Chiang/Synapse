'use server'

import { socket } from "@/lib/socket"
import { revalidatePath, revalidateTag } from "next/cache"

const sendMessage = async (text: string, channelId: number, senderId: number) => {
  socket.emit('message:create', {text, channelId, senderId}, revalidateMessages)
  revalidateTag(`channels/${channelId}`)
}

// Callback function which will be invoked after receiving acknowledgement from server
const revalidateMessages = (channelId: number) => {
}

export {sendMessage}