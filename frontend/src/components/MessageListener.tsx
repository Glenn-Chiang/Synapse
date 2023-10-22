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
    const handleMessage = (channelId: number) => {
      console.log('Message received in channel:', channelId)
      
      router.refresh()  
    }

    socket.on('message', handleMessage)

    return () => {
      socket.off('message', handleMessage)
    }
  }, [router])
  return (
    <></>
  )
}

export {MessageListener}