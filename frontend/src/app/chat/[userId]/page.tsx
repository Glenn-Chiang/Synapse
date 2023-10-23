import { getChat } from "@/api/chats";
import { InputBar } from "@/components/InputBar";
import { ActionButton, BackButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/auth";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const member1Id = getCurrentUser();
  const member2Id = Number(params.userId);
  const chat = await getChat(member1Id, member2Id);
  const member2 = chat?.member2;

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
        {member2?.username}
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
