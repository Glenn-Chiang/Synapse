"use client";

import { UserContext } from "@/lib/UserContext";
import { formatDate } from "@/lib/formatDate";
import { Channel } from "@/lib/types";
import Link from "next/link";
import { useContext } from "react";
import { ChannelIcon } from "../../../../components/ChannelIcon";

const ChannelPreview = ({ channel }: { channel: Channel }) => {
  const currentUserId = useContext(UserContext)?.id;
  const newestMessage = channel.messages[channel.messages.length - 1];
  return (
    <Link
      href={`/channel/${channel.id}`}
      className="flex gap-4 items-start p-4 rounded-md bg-slate-900 hover:bg-slate-800 transition w-full"
    >
      <ChannelIcon iconUrl={channel.iconUrl} />
      <div className="w-full">
        <div className="flex justify-between">
          <h2>{channel.name}</h2>
          {newestMessage && (
            <span className="text-slate-500">
              {formatDate(newestMessage.timestamp, true)}
            </span>
          )}
        </div>
        {newestMessage && (
          <div className="line-clamp-2 py-2">
            <span className="text-sky-500">
              {newestMessage.senderId === currentUserId
                ? "You"
                : newestMessage.sender.username}
              :{" "}
            </span>
            <span className="text-slate-500">{newestMessage.text}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export { ChannelPreview };
