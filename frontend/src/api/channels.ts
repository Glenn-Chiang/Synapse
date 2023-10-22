import { Channel, User } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getChannel = async (channelId: number) => {
  const res = await fetch(`${BASE_URL}/channels/${channelId}`, {
    next: { tags: [`channels/${channelId}`] },
  });
  const channel: Channel = await res.json();
  return channel;
};

const getChannelMembers = async (channelId: number) => {
  const res = await fetch(`${BASE_URL}/channels/${channelId}/members`, {
    next: { tags: [`channels/${channelId}/members`] },
  });
  const members: User[] = await res.json()
  return members
};

export { getChannel, getChannelMembers };
