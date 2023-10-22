import { getChannel, getChannelMembers } from "@/api/channels";
import Link from "next/link";
import { User } from "../../../../types";
import Image from "next/image";

export default async function ChannelInfo({
  params,
}: {
  params: { channelId: string };
}) {
  const channelId = Number(params.channelId);
  const channel = await getChannel(channelId);
  const members = await getChannelMembers(channelId);

  return (
    <section>
      <div className="flex gap-4">
        <div>
          <Image
            src={
              channel.iconUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UcnHUiJ0s_BfieUWxwoLDk2Ji4xCJ30WVhE5690-7JtoCO6gOrMZpiHqHk_f6ftmSJk&usqp=CAU"
            }
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sky-500">Name</h2>
          <p>{channel.name}</p>
          <h2 className="text-sky-500">About</h2>
          <p>{channel.about}</p>
          <div className="text-slate-500">
            Created on{" "}
            <span>{new Date(channel.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <h2 className="text-sky-500">Members <span>({channel.members.length})</span></h2>
      <ul>
        {members.map((member) => (
          <UserItem key={member.id} user={member} />
        ))}
      </ul>
    </section>
  );
}

const UserItem = ({ user }: { user: User }) => {
  return <Link href={`/users/${user.id}`}>{user.username}</Link>;
};
