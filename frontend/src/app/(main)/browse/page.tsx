import { getAllChannels } from "@/api/channels";
import { ChannelItem } from "@/components/ChannelItem";

export default async function ExploreChannels() {
  const channels = await getAllChannels();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-center">Browse channels</h1>
      <ul className="flex flex-col gap-4 items-center">
        {channels.map((channel) => (
          <ChannelItem key={channel.id} channel={channel} />
        ))}
      </ul>
    </main>
  );
}
