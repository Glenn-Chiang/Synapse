import { getUser } from "@/api/users";
import { AvatarIcon } from "@/components/AvatarIcon";
import { BackButton } from "@/components/buttons";
import { EditProfileSection } from "./EditProfileSection";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function Profile({
  params,
}: {
  params: { userId: string };
}) {
  const userId = Number(params.userId);
  const user = await getUser(userId);
  const currentUser = getCurrentUser();
  const isOwnProfile = user.id === currentUser.id;

  return (
    <main className="flex flex-col items-center justify-center gap-4 sm:w-1/2 m-auto ">
      <div className="flex w-full -ml-4">
        <BackButton />
      </div>
      <div className="flex gap-4 items-start  bg-slate-900 rounded-md p-4 ">
        <AvatarIcon url={user.avatarUrl} large={true} isSelf={isOwnProfile}/>
        <div className="flex flex-col gap-4 ">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 ">
              <span className="text-sky-500">Username</span>
              <h1>{user.username}</h1>
            </div>
            {isOwnProfile && <EditProfileSection user={user} />}
          </div>
          <div className="flex flex-col gap-2 ">
            <span className="text-sky-500">Bio</span>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
