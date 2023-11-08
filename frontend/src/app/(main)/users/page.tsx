import { getAllUsers } from "@/api/users";
import { AvatarIcon } from "@/components/AvatarIcon";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { User } from "@/lib/types";
import { faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Users() {
  const users = await getAllUsers();
  return (
    <main className="flex flex-col gap-4 items-center">
      <h1 className="flex justify-center items-center gap-2 h-16 fixed z-10 bg-slate-950 w-full">
        Users
        <FontAwesomeIcon icon={faUsers}/>
      </h1>
      <ul className="mt-16 flex flex-col gap-4 items-center sm:w-1/2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
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
