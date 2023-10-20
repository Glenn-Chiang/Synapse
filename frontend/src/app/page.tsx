import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import { Channel } from "../types";
import Link from "next/link";

const getChannels = async (userId: string): Promise<Channel[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/channels`);
  const channels: Channel[] = await res.json();
  return channels;
};

export default async function Home() {
  const userId = getCurrentUser();
  const channels = await getChannels(userId);

  return (
    <main>
      <h1 className="py-2">Channels</h1>
      <div className="py-2 flex gap-4 items-center font-medium">
        <Link href={'/channels/create'} className="bg-sky-500 p-2 text-white rounded-md shadow hover:shadow-sky-500 hover:shadow">
          Create channel
        </Link>
        <Link href={'/explore-channels'} className="text-sky-500 hover:text-sky-400">
          Explore channels
        </Link>
      </div>
      {channels.length > 0 ? (
        <ul className="py-2 flex flex-col gap-4">
          {channels.map((channel) => (
            <ChannelItem key={channel.id} channel={channel} />
          ))}
        </ul>
      ) : (
        <div className="py-2">You haven&apos;t joined any channels</div>
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
