'use server'

import { socket } from "@/lib/socket"
import { revalidatePath, revalidateTag } from "next/cache"

const sendMessage = async (text: string, channelId: number, senderId: number) => {
  socket.emit('message:create', {text, channelId, senderId}, () => {
    revalidateTag(`channels/${channelId}`)
  })
}



export {sendMessage}