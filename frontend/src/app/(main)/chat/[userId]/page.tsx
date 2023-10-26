import { getChat } from "@/api/chats";
import { getUser } from "@/api/users";
import { TypingListener } from "../../channel/[channelId]/TypingListener";
import { AvatarIcon } from "@/components/AvatarIcon";
import { MessagesList } from "@/components/MessagesList";
import { ActionButton, BackButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ChatInput } from "./ChatInput";
import { DirectMessage } from "@/components/DirectMessage";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const selfId = getCurrentUser().id;
  const otherId = Number(params.userId);

  const otherUser = await getUser(otherId); // The user whom the current user is chatting with
  const chat = await getChat(selfId, otherId);

  return (
    <main>
      <header className="fixed top-16 left-0 w-full flex justify-between p-2 items-center border-b border-slate-500 bg-slate-950 ">
        <BackButton />
        <div className="flex gap-4 items-center">
          <AvatarIcon url={otherUser.avatarUrl} />
          <h1>{otherUser.username}</h1>
        </div>
        <ActionButton />
      </header>
      <section className="mt-32">
        {chat ? (
          <ul className="py-4 mb-16 flex flex-col gap-4">
            {chat.messages.map((message) => (
              <DirectMessage key={message.id} message={message} />
            ))}
          </ul>
        ) : (
          <div className="fixed top-1/2 inset-x-0 flex justify-center">
            Type a message and start chatting!
          </div>
        )}
        <ChatInput />
        <TypingListener currentRoomId={otherId} />
      </section>
    </main>
  );
}
