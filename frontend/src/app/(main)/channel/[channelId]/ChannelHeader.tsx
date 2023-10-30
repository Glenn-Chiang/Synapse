"use client";

import { ChannelIcon } from "@/components/ChannelIcon";
import { LeaveChannelModal } from "@/components/LeaveChannelModal";
import { ActionButton, BackButton } from "@/components/buttons";
import { Channel } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export const ChannelHeader = ({ channel }: { channel: Channel }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const hideMenu = (event: MouseEvent) => {
    if (
      menuRef.current &&
      event.target instanceof Node &&
      !menuRef.current.contains(event.target)
    ) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    if (menuIsOpen) {
      document.addEventListener("click", hideMenu);
    } else {
      document.removeEventListener("click", hideMenu);
    }

    return () => document.removeEventListener("click", hideMenu);
  }, [menuIsOpen]);

  return (
    <header className="z-10 fixed top-16 left-0 w-full flex justify-between p-2 items-center border-b border-slate-500 bg-slate-950 ">
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
      {menuIsOpen && (
        <div
          ref={menuRef}
          className="absolute right-2 -bottom-8 z-20 bg-slate-900 rounded-md"
        >
          <ActionMenu />
        </div>
      )}
    </header>
  );
};

const ActionMenu = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="">
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
