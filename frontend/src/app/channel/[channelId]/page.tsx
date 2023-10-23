import { getChannel } from "@/api/channels";
import { MessagesList } from "@/components/MessagesList";
import { getCurrentUser } from "@/lib/auth";
import { socket } from "@/lib/socket";
import { InputBar } from "../../../components/InputBar";
import { JoinChannel } from "./JoinChannel";
import { TypingListener } from "./TypingListener";
import { ChannelInput } from "./ChannelInput";

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

  if (!userIsMember) {
    return <JoinChannel />;
  }

  return (
    <section>
      <MessagesList messages={channel.messages} />
      <ChannelInput/>
      <TypingListener />
    </section>
  );
}


