"use client";

import { createChannel } from "@/api/channels";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormFields = {
  name: string;
  about: string;
  iconUrl: string;
};
export default function CreateChannelPage() {
  const { register, handleSubmit } = useForm<FormFields>();

  const [isPending, setIsPending] = useState(false);

  const [error, setError] = useState<null | string>(null);

  const onSubmit: SubmitHandler<FormFields> = async (formFields) => {
    setIsPending(true);
    try {
      await createChannel(formFields);
      console.log("Channel created");
      router.push("/");
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    }
    setIsPending(false);
  };

  const router = useRouter();

  return (
    <section className="flex flex-col gap-4 p-4 relative sm:w-2/3 m-auto lg:w-1/2 bg-slate-900 rounded-md ">
      <div className="flex justify-between">
        <h1 className="text-sky-500 ">Create a channel</h1>
        <button
          onClick={() => router.back()}
          className="rounded-full hover:bg-slate-900 w-10 h-10 -mr-2 -mt-2"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sky-500 " htmlFor="name">
            Name
          </label>
          <input
            id="name"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 25,
                message: "Channel name cannot be longer than 25 characters",
              },
            })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sky-500 " htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            {...register("about", {
              required: true,
              maxLength: {
                value: 500,
                message: "Channel about cannot be longer than 500 characters",
              },
            })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-sky-500 " htmlFor="icon">
            Icon URL
          </label>
          <input id="icon" {...register("iconUrl")} />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="flex gap-4 ">
          <SubmitButton isPending={isPending}>Create</SubmitButton>
          <CancelButton onClick={() => router.back()} />
        </div>
      </form>
    </section>
  );
}
