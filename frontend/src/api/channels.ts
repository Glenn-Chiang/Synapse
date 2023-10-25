"use server";

import { Channel } from "@/lib/types";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getChannels = async (userId: number): Promise<Channel[]> => {
  const res = await fetch(`${BASE_URL}/users/${userId}/channels`, {
    cache: "no-store",
    headers: { Cookie: cookies().toString() },
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const channels: Channel[] = await res.json();
  return channels;
};

const getChannel = async (channelId: number) => {
  const res = await fetch(`${BASE_URL}/channels/${channelId}`, {
    cache: "no-store",
    headers: { Cookie: cookies().toString() },
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const channel: Channel = await res.json();
  return channel;
};

const createChannel = async (formFields: {
  name: string;
  about: string;
  iconUrl: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/channels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(formFields),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return;
};

const editChannel = async (
  channelId: number,
  about: string,
  iconUrl: string
) => {
  const res = await fetch(`${BASE_URL}/channels/${channelId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify({ about, iconUrl }),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return;
};

export { getChannels, createChannel, editChannel, getChannel };
