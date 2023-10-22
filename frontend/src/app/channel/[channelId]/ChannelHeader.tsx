"use client";

import { ChannelIcon } from "@/components/ChannelIcon";
import { Channel } from "@/types";
import { faArrowLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChannelHeader = ({ channel }: { channel: Channel }) => {
  const router = useRouter();

  return (
    <header className="fixed top-16 left-0 w-full flex justify-between p-2 items-center border-b border-slate-500 z-10 bg-slate-950 ">
      <button
        onClick={() => router.back()}
        className="rounded-full hover:bg-slate-800 w-10 h-10 flex justify-center items-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <Link
        href={`/channel/${channel.id}/info`}
        className="flex gap-4 items-center"
      >
        <ChannelIcon iconUrl={channel.iconUrl} />
        <div className="flex flex-col items-center">
          <h1>{channel.name}</h1>
          <div className="text-slate-500">{channel.members.length} members</div>
        </div>
      </Link>
      <button className="rounded-full hover:bg-slate-800 w-10 h-10">
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
    </header>
  );
};

export { ChannelHeader };
