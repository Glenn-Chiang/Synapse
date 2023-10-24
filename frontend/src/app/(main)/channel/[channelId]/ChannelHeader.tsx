"use client";

import { ChannelIcon } from "@/components/ChannelIcon";
import { LeaveChannelModal } from "@/components/LeaveChannelModal";
import { ActionButton, BackButton } from "@/components/buttons";
import { Channel } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

export const ChannelHeader = ({ channel }: { channel: Channel }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <header className="fixed top-16 left-0 w-full flex justify-between p-2 items-center border-b border-slate-500 z-10 bg-slate-950 ">
      <BackButton />
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
      <ActionButton onClick={() => setMenuIsOpen((prev) => !prev)} />
      {menuIsOpen && <ActionMenu />}
    </header>
  );
};

const ActionMenu = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="absolute right-2 -bottom-8 z-20 bg-slate-900 rounded-md">
      <button
        onClick={() => setModalIsOpen(true)}
        className="p-2 hover:bg-slate-800 rounded-md"
      >
        Leave channel
      </button>
      {modalIsOpen && <LeaveChannelModal close={() => setModalIsOpen(false)} />}
    </div>
  );
};
