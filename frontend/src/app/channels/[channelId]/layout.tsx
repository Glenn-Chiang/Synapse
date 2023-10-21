import { ChannelIcon } from "@/components/ChannelIcon";
import { Channel } from "@/types";
import { faArrowLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getChannel } from "@/api/channels";
import Link from "next/link";

export default async function ChannelLayout({
  params,
  children,
  info,
}: {
  params: { channelId: string };
  children: React.ReactNode;
  info: React.ReactNode;
}) {
  const channelId = Number(params.channelId);
  const channel = await getChannel(channelId);

  return (
    <main className="">
      <ChannelHeader channel={channel} />
      <div className="top-16">
        {info}
        {children}
      </div>
    </main>
  );
}

const ChannelHeader = ({ channel }: { channel: Channel }) => {
  return (
    <header className="fixed top-16 left-0 w-full flex justify-between p-2 items-center border-b border-slate-500 z-10 bg-slate-950 opacity-95">
      <Link
        href={"/"}
        className="rounded-full hover:bg-slate-800 w-10 h-10 flex justify-center items-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
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
