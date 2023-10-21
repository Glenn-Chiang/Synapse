'use client'

import { socket } from "@/lib/socket"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SocketProvider = () => {
  const router = useRouter()

  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
      console.log('Socket connected')
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

export {SocketProvider}