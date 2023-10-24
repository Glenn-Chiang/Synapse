import { getChannel } from "@/api/channels";
import { MessagesList } from "@/components/MessagesList";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { ChannelInput } from "./ChannelInput";
import { JoinChannel } from "./JoinChannel";
import { TypingListener } from "./TypingListener";

export default async function ChannelMain({
  params,
}: {
  params: { channelId: string };
}) {
  const channelId = Number(params.channelId);
  const channel = await getChannel(channelId);
  const currentUserId = getCurrentUser().id;
  const userIsMember = !!channel.members.find(
    (member) => member.userId === currentUserId
  );

  if (!userIsMember) {
    return <JoinChannel />;
  }

  return (
    <section>
      <MessagesList messages={channel.messages} />
      <ChannelInput />
      <TypingListener currentRoomId={channelId} />
    </section>
  );
}
