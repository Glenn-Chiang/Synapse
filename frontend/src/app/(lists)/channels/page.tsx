import { getChannels } from "@/api/channels";
import { ChannelPreview } from "@/components/ChannelPreview";
import { getCurrentUser } from '@/lib/auth';
import Link from "next/link";
export const revalidate = 0;


export default async function MyChannels() {
  const userId = getCurrentUser();
  const channels = await getChannels(userId);

  return (
    <main>
      <div className="py-2 flex gap-4 items-center font-medium">
        <Link
          href={"/channels/create"}
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
