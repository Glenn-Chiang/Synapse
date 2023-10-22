import Link from "next/link";
import { Channel } from "@/types";
import Image from "next/image";
import { ChannelIcon } from "./ChannelIcon";

function ChannelItem({ channel }: { channel: Channel }) {
  return (
    <Link
      href={`/channels/${channel.id}`}
      className="flex gap-4 items-center p-4 rounded-md bg-slate-900 hover:bg-slate-800 transition w-full"
    >
      <ChannelIcon iconUrl={channel.iconUrl} />
      <div>
        <h2>{channel.name}</h2>
        <div className="text-slate-500">
          {channel.members.length} <span>members</span>
        </div>
      </div>
    </Link>
  );
}

export { ChannelItem };
