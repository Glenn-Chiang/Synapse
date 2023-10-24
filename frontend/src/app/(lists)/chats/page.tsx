import { getChats } from "@/api/chats";
import { AvatarIcon } from "@/components/AvatarIcon";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { formatDate } from "@/lib/formatDate";
import { Chat } from "@/types";
import Link from "next/link";

export default async function MyChats() {
  const currentUserId = getCurrentUser();
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

const ChatPreview = ({ chat }: { chat: Chat }) => {
  const newestMessage = chat.messages[chat.messages.length - 1];
  const currentUserId = getCurrentUser();
  const otherUser =
    chat.member1.id === currentUserId ? chat.member2 : chat.member1;
  return (
    <Link
      href={`/chat/${otherUser.id}`}
      className="flex gap-4 items-start p-4 rounded-md bg-slate-900 hover:bg-slate-800 transition w-full"
    >
      <AvatarIcon url={otherUser.avatarUrl} />
      <div className="w-full">
        <div className="flex justify-between">
          <h2>{otherUser.username}</h2>
          {newestMessage && (
            <span className="text-slate-500">
              {formatDate(newestMessage.timestamp, true)}
            </span>
          )}
        </div>
        {newestMessage && (
          <div className="line-clamp-2 py-2">
            <span className="text-sky-500">
              {newestMessage.senderId === currentUserId
                ? "You"
                : newestMessage.sender.username}
              :{" "}
            </span>
            <span className="text-slate-500">{newestMessage.text}</span>
          </div>
        )}
      </div>
    </Link>
  );
};
