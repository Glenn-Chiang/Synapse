"use client";

import { Message } from "@/types";
import Image from "next/image";
import { useEffect, useRef } from "react";

const MessageItem = ({ message }: { message: Message }) => {
  const messageRef = useRef<HTMLElement>(null);
  useEffect(() => {
    messageRef.current?.scrollIntoView();
  });
  return (
    <article ref={messageRef} className="flex gap-2 items-start p-2">
      <AvatarIcon url={message.sender.avatarUrl} />
      <div>
        <div className="flex gap-2 items-center">
          <span className="text-sky-500">{message.sender.username}</span>
          <span className="text-slate-500">{new Date(message.timestamp).toLocaleString()}</span>
        </div>
        {message.text}
      </div>
    </article>
  );
};

export { MessageItem };

const AvatarIcon = ({ url }: { url: string | undefined }) => {
  return (
    <Image
      className="rounded-full"
      src={
        url ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UcnHUiJ0s_BfieUWxwoLDk2Ji4xCJ30WVhE5690-7JtoCO6gOrMZpiHqHk_f6ftmSJk&usqp=CAU"
      }
      alt=""
      width={40}
      height={40}
    />
  );
};
