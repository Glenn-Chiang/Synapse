"use server";

import { cookies } from "next/headers";
import { User } from "../lib/types";
import { revalidatePath } from "next/cache";
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

// Register
const createUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  console.log("Registered");
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

export { getUser, createUser, editProfile };
