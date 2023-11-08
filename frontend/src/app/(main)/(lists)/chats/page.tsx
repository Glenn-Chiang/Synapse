import { getChats } from "@/api/chats";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ChatPreview } from "./ChatPreview";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default async function MyChats() {
  const currentUserId = getCurrentUser().id;
  const chats = await getChats(currentUserId);

  return (
    <main>
      <div className="py-2">
        <Link href={"/users"} className="text-sky-500 hover:text-sky-400 flex gap-2 items-center">
          Find users
          <FontAwesomeIcon icon={faSearch}/>
        </Link>
      </div>
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

