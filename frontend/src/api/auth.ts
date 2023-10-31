"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    return { status: res.status, message: errorMessage };
  }

  const payload = await res.json();
  console.log(payload);
  cookies().set("token", payload.token);
  cookies().set("user", JSON.stringify(payload.user));
  return { status: 200, message: "success" };
};

// Register
export const registerUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    return { status: res.status, message: errorMessage };
  }

  return { status: 200, message: "success" };
};

export const logout = () => {
  cookies().delete("token");
  cookies().delete("user");
  redirect("/login");
};
