"use server"

import { revalidatePath } from "next/cache"

export const revalidateMessages = async () => {
  console.log('revalidating in server action')
  revalidatePath('/')
}