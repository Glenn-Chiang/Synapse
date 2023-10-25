"use client";

import { UserContext } from "@/lib/UserContext";
import { formatDate } from "@/lib/formatDate";
import { Message } from "@/lib/types";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import { AvatarIcon } from "./AvatarIcon";

const DirectMessage = ({ message }: { message: Message }) => {
  const messageRef = useRef<HTMLElement>(null);
  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, []);

  const currentUser = useContext(UserContext);
  const isOwnMessage = currentUser?.id === message.senderId;

  return (
    <article
      ref={messageRef}
      className={`flex gap-2 flex-col max-w-xs ${isOwnMessage ? "items-end self-end" : "self-start"}`}
    >
      <div
        className={`break-words rounded-xl p-2 ${
          isOwnMessage ? "bg-sky-500" : "bg-slate-900"
        }`}
      >
        {message.text}
      </div>
      <span className="text-slate-500">{formatDate(message.timestamp)}</span>
    </article>
  );
};

export { DirectMessage };
