"use client";

import { registerUser } from "@/api/auth";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SubmitButton } from "@/components/buttons";
import { faLock, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  username: string;
  password: string;
};

export default function Register() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (credentials) => {
    setIsPending(true);
    try {
      await registerUser(credentials);
    } catch (error) {
      setError((error as Error).message);
    }
    setIsPending(false)
  };

  return (
    <section className="flex flex-col items-center gap-10 w-full p-4">
      <h1 className="text-2xl">Create an account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full md:w-1/2"
      >
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <label className="flex gap-2 items-center text-slate-400">
              <FontAwesomeIcon icon={faUserCircle} />
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              className="bg-slate-900"
            />
            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex gap-2 items-center text-slate-400">
              <FontAwesomeIcon icon={faLock} />
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="bg-slate-900"
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton isPending={isPending}>Register</SubmitButton>
      </form>

      <div>
        Already have an account?{" "}
        <Link href={"/login"} className="text-sky-500 hover:text-sky-400">
          Login
        </Link>
      </div>
    </section>
  );
}
