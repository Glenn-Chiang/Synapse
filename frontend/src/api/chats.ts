import { Chat } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getChat = async (member1Id: number, member2Id: number) => {
  const res = await fetch(
    `${BASE_URL}/chats?member1Id=${member1Id}&member2Id=${member2Id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const chat: Chat | null = await res.json();
  return chat;
};
