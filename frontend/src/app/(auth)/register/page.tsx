"use client";

import { SubmitButton } from "@/components/buttons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

type FormFields = {
  username: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormFields>();

  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = async (formFields) => {
    setIsPending(true);

    try {
      const res = await fetch(`${process.env.BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(formFields),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log(error);
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
      </form>
    </main>
  );
}
