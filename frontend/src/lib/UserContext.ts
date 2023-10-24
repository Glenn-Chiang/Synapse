"use client"

import { User } from "@/types"
import { createContext } from "react"

export const UserContext = createContext<null|User>(null)