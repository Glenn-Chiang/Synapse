import { ChannelIcon } from "@/components/ChannelIcon";
import { Channel } from "@/types";
import { faArrowLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputBar } from "./InputBar";
import { sendMessage } from "@/app/actions/messages";
import { getCurrentUser } from "@/lib/auth";
import { Message } from "../../../types";
import { MessageItem } from "@/components/MessageItem";

const getChannel = async (channelId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/channels/${channelId}`,
    { next: { tags: [`channels/${channelId}`] } }
  );
  const channel: Channel = await res.json();
  return channel;
};

export default async function ChannelPage({
  params,
}: {
  params: { channelId: string };
}) {
  const channelId = Number(params.channelId);
  const channel = await getChannel(channelId);
  const currentUserId = getCurrentUser();

  const handleSendMessage = async (text: string) => {
    "use server";
    await sendMessage(text, channelId, currentUserId);
  };

  return (
    <main className="">
      <ChannelHeader channel={channel} />
      <Messages messages={channel.messages} />
      <InputBar handleSend={handleSendMessage} />
    </main>
  );
}

const Messages = ({ messages }: { messages: Message[] }) => {
  return (
    <ul className="py-4 mt-16 mb-10">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ul>
  );
};

const ChannelHeader = ({ channel }: { channel: Channel }) => {
  return (
    <header className="fixed top-16 left-0 w-full flex justify-between p-2 items-center border-b border-slate-500 z-10 bg-slate-950">
      <button className="rounded-full hover:bg-slate-800 w-10 h-10">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flex gap-4 items-center">
        <ChannelIcon iconUrl={channel.iconUrl} />
        <div className="flex flex-col items-center">
          <h1>{channel.name}</h1>
          <div className="text-slate-500">{channel.members.length} members</div>
        </div>
      </div>
      <button className="rounded-full hover:bg-slate-800 w-10 h-10">
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
    </header>
  );
};
