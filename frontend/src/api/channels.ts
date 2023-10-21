import { Channel } from "@/types";

const getChannel = async (channelId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/channels/${channelId}`,
    { next: { tags: [`channels/${channelId}`] } }
  );
  const channel: Channel = await res.json();
  return channel;
};

export {getChannel}