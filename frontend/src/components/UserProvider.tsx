"use client"

import { UserContext } from "@/lib/UserContext";
import { User } from "@/lib/types";

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
