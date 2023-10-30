"use client";

import { login } from "@/api/auth";
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

export default function Login() {
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
      await login(credentials);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <section className="flex flex-col items-center gap-10 w-full p-4">
      <h1 className="text-2xl">Welcome to Synapse</h1>

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
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex gap-2 items-center text-slate-400">
              <FontAwesomeIcon icon={faLock} />
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              className="bg-slate-900"
            />
          </div>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton isPending={isPending}>Login</SubmitButton>
      </form>

      <div>
        Don&apos;t have an account?{" "}
        <Link href={"/register"} className="text-sky-500 hover:text-sky-400">
          Register
        </Link>
      </div>
      {/* 
      <div className="text-slate-500 border-b border-slate-500 w-full text-center">
        OR
      </div>

      <a
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`}
        className="bg-slate-800 hover:bg-slate-700 transition p-2 rounded-md flex gap-2 items-center"
      >
        <Image
          src={"https://www.google.com/favicon.ico"}
          alt=""
          width={20}
          height={20}
        />
        <span>Continue with Google</span>
      </a> */}
    </section>
  );
}
