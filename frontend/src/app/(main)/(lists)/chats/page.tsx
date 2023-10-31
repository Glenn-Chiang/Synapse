import { getChats } from "@/api/chats";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ChatPreview } from "./ChatPreview";

export default async function MyChats() {
  const currentUserId = getCurrentUser().id;
  const chats = await getChats(currentUserId);

  return (
    <main>
      {chats.length > 0 ? (
        <ul className="py-2 flex flex-col gap-4">
          {chats.map((chat) => (
            <ChatPreview key={chat.id} chat={chat} />
          ))}
        </ul>
      ) : (
        <div className="py-2 text-slate-500">You don&apos;t have any chats</div>
      )}
    </main>
  );
}

