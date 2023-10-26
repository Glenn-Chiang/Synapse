import { getUser } from "@/api/users";
import { AvatarIcon } from "@/components/AvatarIcon";
import { BackButton } from "@/components/buttons";
import { EditProfileSection } from "./EditProfileSection";

export default async function Profile({
  params,
}: {
  params: { userId: string };
}) {
  const userId = Number(params.userId);
  const user = await getUser(userId);

  return (
    <main className="flex flex-col gap-4 ">
      <BackButton />
      <div className="flex gap-4 items-start justify-center">
        <AvatarIcon url={user.avatarUrl} large={true} />
        <div className="flex flex-col gap-4">
          <h1>{user.username}</h1>
          <p>{user.bio}</p>
        </div>
      </div>
      <EditProfileSection user={user}/>
    </main>
  );
}
