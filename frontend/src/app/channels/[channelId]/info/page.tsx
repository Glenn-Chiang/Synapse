import { getChannel } from "@/api/channels";
import { getCurrentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { Member } from "../../../../types";
import { EditChannel } from "./EditChannel";
import { LeaveChannel } from "./LeaveChannel";

export default async function ChannelInfo({
  params,
}: {
  params: { channelId: string };
}) {
  const channelId = Number(params.channelId);
  const channel = await getChannel(channelId);

  const currentUserId = getCurrentUser();
  const userIsMember = !!channel.members.find(
    (member) => member.userId === currentUserId
  );
  const userIsCreator = currentUserId === channel.creatorId

  return (
    <section className="flex flex-col gap-4 py-4 sm:p-4">
      <section className="flex gap-4 relative">
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
        <div className="flex flex-col gap-4">
          <h1>{channel.name}</h1>
          <p>{channel.about}</p>
          <div className="text-slate-500">
            Created on{" "}
            <span>{new Date(channel.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        {userIsCreator && <EditChannel channel={channel}/>}
      </section>

      <section>
        <h2 className="text-sky-500">
          Members <span>({channel.members.length})</span>
        </h2>
        <ul className="flex flex-col py-2">
          {channel.members.map((member) => (
            <MemberItem key={member.userId} member={member} />
          ))}
        </ul>
      </section>
      {userIsMember && <LeaveChannel />}
    </section>
  );
}

const MemberItem = ({ member }: { member: Member }) => {
  const user = member.user;
  return (
    <Link
      href={`/users/${user.id}`}
      className="flex items-center gap-2 hover:bg-slate-900 rounded-md px-2 py-4"
    >
      <Image
        src={
          user.avatarUrl ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzQ_T2DGHe-3tHk9z7fqeYzLJ2Tn9vszRmH1TOpZjxynAFhO7ciB10Nh5d-b5_yUFTC8&usqp=CAU"
        }
        alt=""
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="">
        <div>{user.username}</div>
        <div className="text-slate-500">
          joined on {new Date(member.dateJoined).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
};
