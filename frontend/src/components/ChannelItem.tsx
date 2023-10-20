import Link from "next/link";
import { Channel } from "@/types";
import Image from "next/image";

function ChannelItem({ channel }: { channel: Channel }) {
  return (
    <Link href={`/channels/${channel.id}`} className="flex gap-4 items-center p-4 rounded-xl bg-slate-900 w-full">
      <Image
        src={
          channel.iconUrl ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UcnHUiJ0s_BfieUWxwoLDk2Ji4xCJ30WVhE5690-7JtoCO6gOrMZpiHqHk_f6ftmSJk&usqp=CAU"
        }
        alt=""
        width={60}
        height={60}
        className="rounded-full"
      />
      <div>
        <h2>{channel.name}</h2>
        <div>{channel.members.length
        } <span>members</span></div>
      </div>
    </Link>
  );
}

export { ChannelItem };
