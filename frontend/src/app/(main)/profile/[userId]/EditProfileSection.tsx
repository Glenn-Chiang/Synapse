"use client";

import { editProfile } from "@/api/users";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Modal } from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { User } from "@/lib/types";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const EditProfileSection = ({ user }: { user: User }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <section className="absolute right-2 top-2">
      <button
        onClick={() => setModalIsVisible(true)}
        className="text-sky-500 bg-slate-900 hover:bg-sky-950 p-2 rounded-md flex gap-1 items-center"
      >
        <FontAwesomeIcon icon={faUserEdit} />
        Edit
      </button>
      {modalIsVisible && (
        <EditProfileModal user={user} close={() => setModalIsVisible(false)} />
      )}
    </section>
  );
};

type FormFields = {
  username: string;
  bio: string;
  avatarUrl: string;
};

const EditProfileModal = ({
  close,
  user,
}: {
  close: () => void;
  user: User;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const onSubmit: SubmitHandler<FormFields> = async (formFields) => {
    try {
      setIsPending(true);
      await editProfile(user.id, formFields);
      close();
    } catch (error) {
      setError((error as Error).message);
    }
    setIsPending(false);
  };

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-2"
      >
        <h2 className="justify-center text-sky-500 flex gap-2 items-center">
          <FontAwesomeIcon icon={faUserEdit} />
          Edit your profile
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-sky-500 font-medium" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            {...register("username", {
              required: "Username is required",
              maxLength: {
                value: 25,
                message: "Username cannot be longer than 25 characters",
              },
            })}
            defaultValue={user.username}
          />
          {errors.username && (
            <ErrorMessage>{errors.username.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sky-500 font-medium" htmlFor="bio">
            Bio
          </label>
          <input
            id="bio"
            {...register("bio", {
              maxLength: {
                value: 500,
                message: "Bio cannot be longer than 500 characters",
              },
            })}
            defaultValue={user.bio}
          />
          {errors.bio && <ErrorMessage>{errors.bio.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sky-500 font-medium" htmlFor="avatarUrl">
            Avatar URL
          </label>
          <input
            id="avatarUrl"
            {...register("avatarUrl")}
            defaultValue={user.avatarUrl}
          />
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex gap-4">
          <SubmitButton isPending={isPending}>Save</SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
};
