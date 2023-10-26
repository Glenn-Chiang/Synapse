"use client";

import { editProfile } from "@/api/users";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Modal } from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { UserContext } from "@/lib/UserContext";
import { User } from "@/lib/types";
import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { isPending } from '@reduxjs/toolkit';

export const EditProfileSection = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <section>
      <button
        onClick={() => setModalIsVisible(true)}
        className="text-sky-500 hover:bg-slate-900 py-2 px-4 rounded-md"
      >
        Edit
      </button>
      {modalIsVisible && <EditProfileModal close={() => setModalIsVisible(false)}/>}
    </section>
  );
};

type FormFields = {
  username: string;
  bio: string;
  avatarUrl: string;
};

const EditProfileModal = ({close}: {close: () => void}) => {
  const currentUser = useContext(UserContext) as User;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const [isPending, setIsPending] = useState(false)

  const onSubmit: SubmitHandler<FormFields> = async (formFields) => {
    setIsPending(true)
    await editProfile(currentUser.id, formFields)
    close()
  };

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-2"
      >
        <h2 className="text-center text-sky-500">Edit your profile</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register("username", {
              required: "Username is required",
              maxLength: {
                value: 25,
                message: "Username cannot be longer than 25 characters",
              },
            })}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bio">Bio</label>
          <input
            id="bio"
            {...register("bio", {
              maxLength: {
                value: 500,
                message: "Bio cannot be longer than 500 characters",
              },
            })}
          />
          {errors.bio && <ErrorMessage>{errors.bio.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="avatarUrl">Avatar URL</label>
          <input id="avatarUrl" {...register("avatarUrl")} />
        </div>
        <div className="flex gap-4">
          <SubmitButton>Save</SubmitButton>
          <CancelButton onClick={close}/>
        </div>
      </form>
    </Modal>
  );
};
