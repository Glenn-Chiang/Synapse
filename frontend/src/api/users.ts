import { cookies } from "next/headers";
import { User } from "../lib/types";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getUser = async (userId: number) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    headers: { Cookie: cookies().toString() },
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const user: User = await res.json();
  return user;
};

export { getUser };
