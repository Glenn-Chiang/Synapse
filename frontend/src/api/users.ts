"use server";

import { cookies } from "next/headers";
import { User } from "../lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getUsers = async (searchTerm: string | string[] | undefined) => {
  const res = await fetch(`${BASE_URL}/users?search=${searchTerm}`, {
    headers: { Cookie: cookies().toString()}
  })
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  const users: User[] = await res.json()
  return users
}

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

const editProfile = async (
  userId: number,
  data: { username: string; bio: string; avatarUrl: string }
) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/profile`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  revalidatePath("/");
};

export { getUsers, getUser, editProfile };
