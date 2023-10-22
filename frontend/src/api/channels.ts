"use server";

import { Channel, User } from "@/types";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getChannel = async (channelId: number) => {
  const res = await fetch(`${BASE_URL}/channels/${channelId}`, {
    next: { tags: [`channels/${channelId}`] },
  });
  const channel: Channel = await res.json();
  return channel;
};

const joinChannel = async (channelId: number, userId: number) => {
  const res = await fetch(
    `${BASE_URL}/channels/${channelId}/members?userId=${userId}`,
    {
      method: "POST",
    }
  );
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  revalidatePath("/");
};

const leaveChannel = async (channelId: number, userId: number) => {
  const res = await fetch(
    `${BASE_URL}/channels/${channelId}/members?userId=${userId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  revalidatePath("/");
};

export { getChannel, joinChannel, leaveChannel };
