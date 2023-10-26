"use client";

import { UserContext } from "@/lib/UserContext";
import { formatDate } from "@/lib/formatDate";
import { Message } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useContext } from "react";
import { AvatarIcon } from "./AvatarIcon";

const MessageItem = ({ message }: { message: Message }) => {
  const currentUser = useContext(UserContext);
  const messageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, []);

  return (
    <article ref={messageRef} className="flex gap-2 items-start p-2 max-w-full">
      <AvatarIcon
        url={message.sender.avatarUrl}
        isSelf={currentUser?.id === message.senderId}
      />
      <div className="max-w-full">
        <div className="flex gap-2 items-center">
          <span className="text-sky-500">{message.sender.username}</span>
          <span className="text-slate-500">
            {formatDate(message.timestamp)}
          </span>
        </div>
        <div className="break-words py-2">{message.text}</div>
      </div>
    </article>
  );
};

export { MessageItem };
