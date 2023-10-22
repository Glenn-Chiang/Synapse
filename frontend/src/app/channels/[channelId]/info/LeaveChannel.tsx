"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { SubmitButton } from "@/components/buttons";
import { socket } from "@/lib/socket";
import { getCurrentUser } from "@/lib/auth";
import { useParams, useRouter } from "next/navigation";

const LeaveChannel = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <section>
      <button
        onClick={() => setModalIsOpen(true)}
        className="flex gap-2 items-center justify-center bg-slate-900 hover:bg-slate-800 w-40 p-2 rounded-md"
      >
        <FontAwesomeIcon icon={faSignOut} />
        Leave channel
      </button>
      {modalIsOpen && <LeaveChannelModal close={() => setModalIsOpen(false)} />}
    </section>
  );
};

const LeaveChannelModal = ({ close }: { close: () => void }) => {
  const userId = getCurrentUser();
  const channelId = Number(useParams().channelId);
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const handleLeaveChannel = () => {
    setIsPending(true);
    socket.emit("leave-channel", userId, channelId, () => {
      router.refresh();
      router.push('/')
    });
  };

  return (
    <Modal>
      <h2>Are you sure you want to leave this channel?</h2>
      <div className="flex gap-4">
        <SubmitButton isPending={isPending} onClick={handleLeaveChannel}>
          Confirm
        </SubmitButton>
        <button onClick={close} className="text-slate-500 hover:text-sky-500">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-20 fixed top-0 left-0 w-screen h-screen bg-slate-950 bg-opacity-80 justify-center items-center flex">
      <div className="bg-slate-900 bg-opacity-100 p-4 rounded-md flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

export { LeaveChannel };
