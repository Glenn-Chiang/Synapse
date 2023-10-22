"use client";

import { SubmitButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/auth";
import { socket } from "@/lib/socket";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@/components/Modal";
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


export { LeaveChannel };

