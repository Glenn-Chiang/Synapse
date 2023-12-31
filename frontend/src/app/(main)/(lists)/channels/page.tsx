import { getChannels } from "@/api/channels";
import { ChannelPreview } from "./ChannelPreview";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Link from "next/link";

export default async function MyChannels() {
  const userId = getCurrentUser().id;
  const channels = await getChannels(userId);

  return (
    <main>
      <div className="py-2 flex gap-4 items-center font-medium">
        <Link
          href={"/channel/create"}
          className="bg-sky-500 p-2 text-white rounded-md shadow hover:shadow-sky-500 hover:shadow"
        >
          Create channel
        </Link>
        <Link href={"/browse"} className="text-sky-500 hover:text-sky-400">
          Browse channels
        </Link>
      </div>
      {channels.length > 0 ? (
        <ul className="py-2 flex flex-col gap-4">
          {channels.map((channel) => (
            <ChannelPreview key={channel.id} channel={channel} />
          ))}
        </ul>
      ) : (
        <div className="py-2 text-slate-500">
          You haven&apos;t joined any channels
        </div>
      )}
    </main>
  );
}
