import { ChannelIcon } from "@/components/ChannelIcon";
import { Channel } from "@/types";
import { faArrowLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getChannel = async (channelId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/channels/${channelId}`
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

  return (
    <main>
      <header className="flex justify-between bg-slate-900 p-2 items-center rounded-md">
        <button className="rounded-full hover:bg-slate-800 w-10 h-10">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="flex gap-4 items-center">
          <ChannelIcon iconUrl={channel.iconUrl}/>
          <div className="flex flex-col items-center">
            <h1>{channel.name}</h1>
            <div className="text-slate-500">{channel.members.length} members</div>
          </div>
        </div>
        <button className="rounded-full hover:bg-slate-800 w-10 h-10">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </header>
    </main>
  );
}