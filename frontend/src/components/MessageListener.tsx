'use client'

import { socket } from "@/lib/socket"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const MessageListener = () => {
  const router = useRouter()

  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }
  
    // Channel messages
    const handleMessage = (channelId: number) => {
      console.log('Message received in channel:', channelId)
      router.refresh()  
    }
    socket.on('message', handleMessage)

    // Direct messages
    const handleDirectMessage = () => {
      console.log('Direct message received')
      router.refresh()
    }
    socket.on('direct-message', handleDirectMessage)

    return () => {
      socket.off('message', handleMessage)
    }
  }, [router])
  return (
    <></>
  )
}

export {MessageListener}