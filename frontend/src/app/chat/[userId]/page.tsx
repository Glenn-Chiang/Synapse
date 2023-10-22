import { getChat } from "@/api/chats"
import { getCurrentUser } from "@/lib/auth"

export default async function ChatPage({params}: {params: {userId: string}}) {
  const member1Id = getCurrentUser()
  const member2Id = Number(params.userId)
  const chat = await getChat(member1Id, member2Id)

  if (!chat) {
    return (
      <div>Type a message and start chatting!</div>
    )
  }

  return (
    <main>

    </main>
  )
}