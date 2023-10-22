"use client";

import { SubmitButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/auth";
import { socket } from "@/lib/socket";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

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
  const currentUserId = getCurrentUser();
  const channelId = Number(useParams().channelId);
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const handleLeaveChannel = async () => {
    setIsPending(true);
    socket.emit("leave-channel", currentUserId, channelId, () => {
      router.push('/')
      router.refresh()
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

