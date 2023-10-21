'use client'

import { Message } from "@/types";
import { useEffect, useRef } from "react";

const MessageItem = ({ message }: { message: Message }) => {
  const messageRef = useRef<HTMLElement>(null)
  useEffect(() => {
    messageRef.current?.scrollIntoView()
  })
  return <article ref={messageRef}>{message.text}</article>;
};

export {MessageItem}