import { getUsers } from "@/api/users";
import { AvatarIcon } from "@/components/AvatarIcon";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { User } from "@/lib/types";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Searchbar } from "./Searchbar";

export default async function Users({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm = searchParams.search;
  const users = await getUsers(searchTerm);
  return (
    <main className="flex flex-col gap-4 m-auto w-full">
      <div className="flex flex-col items-center justify-center gap-2 h-32 fixed z-10 bg-slate-950 left-0 w-screen">
        <h1 className="flex justify-center items-center gap-2">
          Users
          <FontAwesomeIcon icon={faUsers} />
        </h1>
        <Searchbar />
      </div>
      <div className="mt-32 flex justify-center">
        {users.length > 0 ? (
          <ul className="flex flex-col gap-4 w-full">
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </ul>
        ) : (
          <div className="flex justify-center text-slate-500">No users with username matching &quot;{searchTerm}&quot;</div>
        )}
      </div>
    </main>
  );
}

const UserItem = ({ user }: { user: User }) => {
  const currentUser = getCurrentUser();
  const isSelf = currentUser.id === user.id;
  return (
    <Link
      href={`/chat/${user.id}`}
      className="flex gap-4 items-start p-4 rounded-md bg-slate-900 hover:bg-slate-800 transition w-full"
    >
      <AvatarIcon url={user.avatarUrl} isSelf={isSelf} />
      <div>{user.username}</div>
    </Link>
  );
};
