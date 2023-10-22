import { ChannelHeader } from "./ChannelHeader";
import { getChannel } from "@/api/channels";

export default async function ChannelLayout({
  params,
  children,
}: {
  params: { channelId: string };
  children: React.ReactNode;
  info: React.ReactNode;
}) {
  const channelId = Number(params.channelId);
  const channel = await getChannel(channelId);

  return (
    <main className="">
      <ChannelHeader channel={channel} />
      <div className="mt-16">
        {children}
      </div>
    </main>
  );
}

