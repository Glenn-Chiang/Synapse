import { getChannel } from "@/api/channels";
import { MessageItem } from "@/components/MessageItem";
import { getCurrentUser } from "@/lib/auth";
import { socket } from "@/lib/socket";
import { Message } from "@/types";
import { revalidatePath } from "next/cache";
import { InputBar } from "../../../components/InputBar";
import { JoinChannel } from "./JoinChannel";
import { TypingListener } from "./TypingListener";
import { MessagesList } from "@/components/MessagesList";

export default async function ChannelMain({
  params,
}: {
  params: { channelId: string };
}) {
  const channelId = Number(params.channelId);
  const channel = await getChannel(channelId);
  const currentUserId = getCurrentUser();
  const userIsMember = !!channel.members.find(
    (member) => member.userId === currentUserId
  );

  const handleSendMessage = async (text: string) => {
    "use server";
    socket.emit(
      "send-message",
      { text, channelId, senderId: currentUserId },
      () => {
        console.log("message acknowledged");
      }
    );
  };

  const handleTypeMessage = async () => {
    "use server";
    socket.emit("typing", currentUserId, channelId);
  };

  if (!userIsMember) {
    return <JoinChannel />;
  }

  return (
    <section>
      <MessagesList messages={channel.messages} />
      <InputBar
        handleSend={handleSendMessage}
        handleChange={handleTypeMessage}
      />
      <TypingListener />
    </section>
  );
}


