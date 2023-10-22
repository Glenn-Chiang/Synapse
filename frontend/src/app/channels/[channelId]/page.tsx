import { getChannel } from "@/api/channels";
import { MessageItem } from "@/components/MessageItem";
import { getCurrentUser } from "@/lib/auth";
import { socket } from "@/lib/socket";
import { Message } from "@/types";
import { revalidatePath } from "next/cache";
import { InputBar } from "./InputBar";
import { JoinChannel } from "./JoinChannel";

export default async function ChannelMain({
  params,
}: {
  params: { channelId: string };
}) {
  const channelId = Number(params.channelId);
  const channel = await getChannel(channelId);
  const currentUserId = getCurrentUser();
  const userIsMember = !!channel.members.find(member => member.userId === currentUserId)

  const handleSendMessage = async (text: string) => {
    "use server"
    socket.emit("send-message", { text, channelId, senderId: currentUserId }, () => {
      console.log("message acknowledged")
    });
  };

  if (!userIsMember) {
    return (
      <JoinChannel/>
    )
  }

  return (
    <section>
      <Messages messages={channel.messages} />
      <InputBar handleSend={handleSendMessage} />
    </section>
  );
}

const Messages = ({ messages }: { messages: Message[] }) => {
  return (
    <ul className="py-4 mt-16 mb-10 flex flex-col gap-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
};
