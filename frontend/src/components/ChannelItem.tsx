import Link from "next/link";
import { Channel } from "@/types";
import Image from "next/image";
import { ChannelIcon } from "./ChannelIcon";
import ChannelLayout from "@/app/channels/[channelId]/layout";

function ChannelItem({ channel }: { channel: Channel }) {
  return (
    <Link
      href={`/channels/${channel.id}`}
      className="flex gap-4 items-start p-4 rounded-md bg-slate-900 hover:bg-slate-800 transition w-full"
    >
      <ChannelIcon iconUrl={channel.iconUrl} />
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <h2>{channel.name}</h2>
          <div className="text-slate-500">
            {channel.members.length} <span>members</span>
          </div>
        </div>
        <div className="line-clamp-3 text-slate-400">
          {channel.about}
        </div>
      </div>
    </Link>
  );
}

export { ChannelItem };
