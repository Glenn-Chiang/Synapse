import { User } from "@/lib/types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getCurrentUser = () => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");
  // console.log(userCookie);

  // TODO: how to properly handle this?
  if (!userCookie) {
    redirect('/login')
    // throw new Error("missing user cookie");
  }

  const currentUser: User = JSON.parse(userCookie.value);
  return currentUser;
};

export { getCurrentUser };

