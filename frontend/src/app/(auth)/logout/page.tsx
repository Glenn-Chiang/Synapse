"use client"

import { logout } from "@/api/auth";
import { SubmitButton } from "@/components/buttons";
import { isPending } from "@reduxjs/toolkit";
import Link from "next/link";
import { useState } from 'react';

export default function Logout() {
  const [isPending, setIsPending] = useState(false)
  const handleClick = () => {
    setIsPending(true)
    logout()
  }
  return (
    <section className="flex flex-col gap-4 justify-center items-center h-screen">
      Are you sure you want to logout?
      <SubmitButton isPending={isPending} onClick={handleClick}>Logout</SubmitButton>
      <Link href={'/'} className="text-sky-500 hover:underline underline-offset-8">Back to Synapse</Link>
    </section>
  );
}
