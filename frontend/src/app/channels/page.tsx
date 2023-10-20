import { ChannelItem } from "@/components/ChannelItem";
import { Channel } from "@/types";
import next from "next";

const getAllChannels = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/channels`, {next: {tags: ['channels']}});
  const channels: Channel[] = await res.json();
  return channels;
};

export default async function ExploreChannels() {
  const channels = await getAllChannels();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-center">Explore channels</h1>
      <ul className="flex flex-col gap-4 items-center">
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </ul>
    </main>
  );
}
