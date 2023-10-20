"use client";

import { SubmitButton } from "@/components/buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";

type FormFields = {
  username: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormFields>();

  const [isPending, setIsPending] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const router = useRouter()

  const onSubmit: SubmitHandler<FormFields> = async (formFields) => {
    setIsPending(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(formFields),
        headers: {
          'Content-Type': 'application/json'
        }
      }, );

      if (!res.ok) {
        const errorMessage = await res.text();
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      console.log("registered")
      router.push('/')
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1>Register</h1>
        <label htmlFor="username" className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faUserCircle} />
          Username
        </label>
        <input id="username" {...register("username")} />
        <SubmitButton isPending={isPending}>Register</SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </main>
  );
}
