import { getChat } from "@/api/chats";
import { getUser } from "@/api/users";
import { AvatarIcon } from "@/components/AvatarIcon";
import { InputBar } from "@/components/InputBar";
import { ActionButton, BackButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/auth";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const selfId = getCurrentUser();
  const otherId = Number(params.userId);

  const otherUser = await getUser(otherId); // The user whom the current user is chatting with
  const chat = await getChat(selfId, otherId);

  const handleSendMessage = async () => {
    "use server";
  };

  const handleTypeMessage = async () => {
    "use server";
  };

  return (
    <main>
      <header className="fixed top-16 left-0 w-full flex justify-between p-2 items-center border-b border-slate-500 z-10 bg-slate-950 ">
        <BackButton />
        <div className="flex gap-4 items-center">
          <AvatarIcon url={otherUser.avatarUrl} />
          <h1>{otherUser.username}</h1>
        </div>
        <ActionButton />
      </header>
      {!chat && (
        <div className="fixed top-1/2 inset-x-0 flex justify-center">
          Type a message and start chatting!
        </div>
      )}
      <InputBar
        handleSend={handleSendMessage}
        handleChange={handleTypeMessage}
      />
    </main>
  );
}
