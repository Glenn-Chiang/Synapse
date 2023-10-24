"use client";

import { User } from "@/lib/types";
import { createContext } from "react";

export const UserContext = createContext<null | User>(null);
