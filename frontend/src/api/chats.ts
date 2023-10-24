import { Chat } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getChats = async (userId: number) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/chats`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const chats: Chat[] = await res.json();
  return chats;
};

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
