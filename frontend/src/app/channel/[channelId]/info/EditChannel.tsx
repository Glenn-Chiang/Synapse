"use client";

import { editChannel } from "@/api/channels";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Modal } from "@/components/Modal";
import { SubmitButton } from "@/components/buttons";
import { Channel } from "@/types";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const EditChannel = ({ channel }: { channel: Channel }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-sky-500 rounded-full w-10 h-10  absolute top-0 right-0 hover:bg-sky-400"
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      {modalIsOpen && (
        <EditChannelModal
          channel={channel}
          close={() => setModalIsOpen(false)}
        />
      )}
    </>
  );
};

interface FormFields {
  about: string;
  iconUrl: string;
}

const EditChannelModal = ({
  close,
  channel,
}: {
  close: () => void;
  channel: Channel;
}) => {
  const { register, handleSubmit } = useForm<FormFields>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter()

  const onSubmit: SubmitHandler<FormFields> = async (formFields) => {
    try {
      const { about, iconUrl } = formFields;
      setIsPending(true);
      await editChannel(channel.id, about, iconUrl);
      router.refresh()
      close();
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Modal>
      <h2>Edit channel</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>About</label>
          <input
            {...register("about", {
              maxLength: {
                value: 500,
                message: "Channel about cannot be longer than 500 characters",
              },
            })}
            className="bg-slate-950"
            defaultValue={channel.about}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Icon URL</label>
          <input
            {...register("iconUrl")}
            className="bg-slate-950"
            defaultValue={channel.iconUrl}
          />
        </div>
        <div className="flex gap-4">
          <SubmitButton isPending={isPending}>Save</SubmitButton>
          <button onClick={close} className="text-slate-500 hover:text-sky-500">
            Cancel
          </button>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </Modal>
  );
};

export { EditChannel };
