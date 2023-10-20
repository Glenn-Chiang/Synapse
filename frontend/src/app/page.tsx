import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import { Channel } from "../types";
import Link from "next/link";

const getChannels = async (userId: string): Promise<Channel[]> => {
  const res = await fetch(`${process.env.BASE_URL}/users/${userId}/channels`);
  const channels: Channel[] = await res.json();
  return channels;
};

export default async function Home() {
  const userId = getCurrentUser();
  const channels = await getChannels(userId);

  return (
    <main>
      <h1>Channels</h1>
      {channels.length > 0 ? (
        <ul className="py-4 flex flex-col gap-4">
          {channels.map((channel) => (
            <ChannelItem key={channel.id} channel={channel} />
          ))}
        </ul>
      ) : (
        <div className="py-4">You haven&apos;t joined any channels</div>
      )}
    </main>
  );
}

function ChannelItem({ channel }: { channel: Channel }) {
  return (
    <Link href={`/channels/${channel.id}`}>
      <h2>{channel.name}</h2>
    </Link>
  );
}
