"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { SubmitButton } from "@/components/buttons";
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

  const [error, setError] = useState(null);

  const onSubmit: SubmitHandler<FormFields> = async (formFields) => {
    setIsPending(true);
    try {
      const res = await fetch(`${process.env}/channels`, {
        method: "POST",
        body: JSON.stringify(formFields),
      });

      if (!res.ok) {
        const errorMessage = await res.text()
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.log(error);
    }
    setIsPending(false);
  };

  const router = useRouter();
  return (
    <section className="flex flex-col gap-4 relative">
      <h1>Create a channel</h1>
      <button className="absolute top-1 right-1" onClick={() => router.back()}>
        <FontAwesomeIcon icon={faX} />
      </button>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input id="name" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="about">About</label>
          <textarea id="about" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="icon">Icon URL</label>
          <input id="icon" />
        </div>
        <SubmitButton isPending={isPending}>Create</SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </section>
  );
}
